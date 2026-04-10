import { useState, useEffect, useMemo, useRef } from "react";
import Papa from "papaparse";
import { ProductLayout } from "../../components/productos/ProductLayout";
import { ProductFilters } from "../../components/productos/ProductFilters";
import { ProductSearch } from "../../components/productos/ProductSearch";
import { ProductGrid } from "../../components/productos/ProductGrid";
import { Pagination } from "../../components/productos/Pagination";
import { ProductHero } from "../../components/productos/ProductHero";
import { ScrollToTopButton } from "../../components/ui/ScrollToTopButton";
import { ProductModal } from "../../components/productos/ProductModal";
import { ListFilter, X, LayoutGrid } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
// Importación masiva de imágenes de categorías
import ahumadosImg from "../../assets/imagenes_categorias/Ahumados y salazones.webp";
import carnesImg from "../../assets/imagenes_categorias/Carnes.webp";
import embutidosImg from "../../assets/imagenes_categorias/Embutidos.webp";
import encurtidosImg from "../../assets/imagenes_categorias/Encurtidos.webp";
import frutasImg from "../../assets/imagenes_categorias/Frutas.webp";
import huevosImg from "../../assets/imagenes_categorias/Huevos.webp";
import mariscosImg from "../../assets/imagenes_categorias/Mariscos, moluscos y bivalvos.webp";
import monodosisImg from "../../assets/imagenes_categorias/Monodosis.webp";
import nataImg from "../../assets/imagenes_categorias/Nata.webp";
import patatasImg from "../../assets/imagenes_categorias/Patatas.webp";
import pescadosImg from "../../assets/imagenes_categorias/Pescados.webp";
import precocinadosImg from "../../assets/imagenes_categorias/Precocinados.webp";
import preparadosVerdurasImg from "../../assets/imagenes_categorias/Preparados con verduras.webp";
import preparadosPostresImg from "../../assets/imagenes_categorias/Preparados para postres.webp";
import preparadosPizzasImg from "../../assets/imagenes_categorias/Preparados y pizzas.webp";
import perecederosImg from "../../assets/imagenes_categorias/Productos no perecederos.webp";
import quesosImg from "../../assets/imagenes_categorias/Quesos.webp";
import reposteriaImg from "../../assets/imagenes_categorias/Repostería.webp";
import salsasImg from "../../assets/imagenes_categorias/Salsas.webp";
import sinGlutenImg from "../../assets/imagenes_categorias/Sin glúten.webp";
import tematicosImg from "../../assets/imagenes_categorias/Temáticos.webp";
import verdurasImg from "../../assets/imagenes_categorias/Verduras.webp";

import AOS from "aos";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const itemsPerPage = 30;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/productos_destacados.csv");
        if (!response.ok) throw new Error("No se pudo cargar el archivo de productos");
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            const rawData = results.data as any[];
            
            // Definición de imágenes locales
            const localCategoryImages: Record<string, string> = {
              pescados: pescadosImg,
              carnes: carnesImg,
              mariscos: mariscosImg,
              precocinados: precocinadosImg,
              verduras: verdurasImg,
              "preparados con verduras": preparadosVerdurasImg,
              ahumados: ahumadosImg,
              embutidos: embutidosImg,
              encurtidos: encurtidosImg,
              "productos no perecederos": perecederosImg,
              temáticos: tematicosImg,
              "preparados y pizzas": preparadosPizzasImg,
              nata: nataImg,
              "sin gluten": sinGlutenImg,
              "sin glúten": sinGlutenImg,
              huevos: huevosImg,
              quesos: quesosImg,
              monodosis: monodosisImg,
              salsas: salsasImg,
              patatas: patatasImg,
              "preparados postres": preparadosPostresImg,
              "preparados para postres": preparadosPostresImg,
              repostería: reposteriaImg,
              frutas: frutasImg,
            };

            const categoryImages: Record<string, string> = {
              pescados: "1519708227418-c8fd9a32b7a2",
              mariscos: "1563379091339-03b21bc4a4f8",
              precocinados: "1541529086164-1dec306c83b4",
              verduras: "1546069901-ba9599a7e63c",
              frutas: "1619566639808-57ec61b58090",
              embutidos: "1607623814075-e51df1bdc822",
              carnes: "1607623814075-e51df1bdc822",
              pizzas: "1513104890138-7c749659a591",
              postres: "1484723088339-fe2a7a8f6d81",
              quesos: "1486297678162-ad2a19b05844",
              ahumados: "1485921325833-c519f76c4927",
            };

            const formattedProducts = rawData
              .map((row, index) => {
                const normalizedRow: any = {};
                Object.keys(row).forEach(key => {
                  if (!key) return; // Evitar llaves vacías
                  const normKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  normalizedRow[normKey] = row[key];
                });

                const rowName = normalizedRow.nombre || normalizedRow.name;
                const rowCat = normalizedRow.categoria || normalizedRow.category || "Otros";

                if (!rowName) return null;

                const cat = rowCat.toLowerCase();
                let finalImage = "";
                for (const key in localCategoryImages) {
                  if (cat.includes(key)) {
                    finalImage = localCategoryImages[key];
                    break;
                  }
                }

                if (!finalImage) {
                  let imageId = "1546552734-d9f7830cb826";
                  for (const key in categoryImages) {
                    if (cat.includes(key)) {
                      imageId = categoryImages[key];
                      break;
                    }
                  }
                  finalImage = `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&q=80&w=600&h=450&sig=${index % 10}`;
                }

                return {
                  id: index,
                  name: rowName,
                  category: rowCat,
                  price: 0,
                  image: finalImage,
                  description: "",
                };
              })
              .filter((p): p is Product => p !== null);

            const sortedProducts = [...formattedProducts].sort((a, b) => a.name.localeCompare(b.name, "es", { numeric: true }));
            setProducts(sortedProducts);
            setLoading(false);
            setTimeout(() => AOS.refresh(), 200);
          }
        });
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Efecto para hacer scroll suave al cambiar de página
  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.name) return false;
      
      const normalizeStr = (str: string) => 
        str.toLowerCase()
           .normalize("NFD")
           .replace(/[\u0300-\u036f]/g, "")
           .replace(/,/g, "")
           .trim();
      
      const normalizedProductCat = normalizeStr(product.category || "");
      const normalizedFilterCat = normalizeStr(category);

      const matchesCategory =
        category === "todos" ||
        normalizedProductCat === normalizedFilterCat;

      const matchesSearch = normalizeStr(product.name)
        .includes(normalizeStr(search));
        
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);


  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
  }, [filteredProducts, startIndex, itemsPerPage]);

  // --- CÁLCULOS PARA EL CONTADOR DINÁMICO ---
  const firstItemNumber = filteredProducts.length === 0 ? 0 : startIndex + 1;
  const lastItemNumber = Math.min(
    startIndex + itemsPerPage,
    filteredProducts.length,
  );

  // --- LÓGICA DE CARRITO / LOCALSTORAGE ---
  const [selectedProducts, setSelectedProducts] = useState<{name: string, quantity: number, unit: string}[]>([]);

  // Cargar carrito al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("toscamare_pedido_pendiente");
    if (saved) {
      try {
        setSelectedProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Error al cargar carrito del localStorage", e);
      }
    }
  }, []);

  // Guardar carrito al cambiar
  useEffect(() => {
    if (selectedProducts.length > 0) {
      localStorage.setItem("toscamare_pedido_pendiente", JSON.stringify(selectedProducts));
    } else {
      localStorage.removeItem("toscamare_pedido_pendiente");
    }
    // Notificar al resto de la app (Header)
    window.dispatchEvent(new Event("cart-updated"));
  }, [selectedProducts]);

  const handleUpdateCart = (productName: string, quantity: number, unit: string = "Uds") => {
    setSelectedProducts(prev => {
      const existingIndex = prev.findIndex(p => p.name === productName);
      
      if (quantity <= 0) {
        return prev.filter(p => p.name !== productName);
      }

      if (existingIndex >= 0) {
        const newProducts = [...prev];
        newProducts[existingIndex] = { name: productName, quantity, unit };
        return newProducts;
      } else {
        return [...prev, { name: productName, quantity, unit }];
      }
    });
  };

  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const staticFiltersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Mostramos el botón flotante solo si hemos bajado más de 800px 
      // (ajustable según la altura del Hero + Filtros estáticos)
      if (window.innerWidth < 1024) { // Solo en móvil
        setShowFloatingBtn(window.scrollY > 700);
      } else {
        setShowFloatingBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  return (
    <ProductLayout
      intro={<ProductHero />}
      filters={
        <div ref={staticFiltersRef} className="sticky top-32">
          <ProductFilters
            activeCategory={category}
            setCategory={handleCategoryChange}
          />
        </div>
      }
      content={
        <div className="space-y-6">
          {/* Botón Flotante de Categorías para Móvil */}
          <AnimatePresence>
            {showFloatingBtn && (
              <motion.button
                initial={{ y: 100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                exit={{ y: 100, x: "-50%", opacity: 0 }}
                onClick={() => setIsFiltersOpen(true)}
                className="lg:hidden fixed bottom-3 left-1/2 z-40 bg-[#002B61] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2.5 font-black text-xs border border-white/10 active:scale-95 transition-all"
              >
                <LayoutGrid size={16} className="text-[#D4AF37]" />
                CATEGORÍAS
              </motion.button>
            )}
          </AnimatePresence>

          {/* Drawer de Categorías para Móvil */}
          <AnimatePresence>
            {isFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFiltersOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed inset-x-0 -bottom-1 bg-white rounded-t-[2.5rem] px-6 pt-8 pb-4 z-[70] lg:hidden max-h-[72vh] flex flex-col shadow-[0_-30px_70px_rgba(0,0,0,0.3)]"
                >
                  <div className="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 opacity-50" onClick={() => setIsFiltersOpen(false)} />
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-[#002B61] flex items-center gap-3 italic">
                      <ListFilter className="text-[#D4AF37]" />
                      FILTRAR POR
                    </h3>
                    <button 
                      onClick={() => setIsFiltersOpen(false)}
                      className="p-2 bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 pb-2">
                    <ProductFilters
                      activeCategory={category}
                      setCategory={(cat) => {
                        handleCategoryChange(cat);
                        setIsFiltersOpen(false);
                      }}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <div className="flex flex-col gap-4">
            {/* CONTADOR DINÁMICO MEJORADO */}
            <div 
              className="flex items-center gap-2"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay="200"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <p className="text-xs md:text-sm font-bold text-[#002B61] uppercase tracking-widest opacity-70">
                Mostrando{" "}
                <span className="text-[#002B61]">
                  {firstItemNumber} – {lastItemNumber}
                </span>
                <span className="mx-2 text-gray-400 font-normal">de</span>
                <span className="text-[#D4AF37]">
                  {filteredProducts.length}
                </span>{" "}
                productos
              </p>
            </div>

            <ProductSearch onSearch={handleSearch} />
          </div>
        
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96"></div>
              ))}
            </div>
          ) : (
            <>
              <ProductGrid 
                products={currentItems} 
                onSelect={setSelectedProduct} 
                selectedProducts={selectedProducts}
                onUpdateCart={handleUpdateCart}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      }
    >
      {!isFiltersOpen && <ScrollToTopButton />}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </ProductLayout>
  );
}
