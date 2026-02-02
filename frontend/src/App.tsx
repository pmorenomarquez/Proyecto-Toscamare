import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Inicio from "./pages/inicio/Inicio";
import ContactoPage from "./pages/Contacto";

function App() {

  const linksHeader = {
    inicio: "Inicio",
    sobreNosotros: "Sobre Nosotros",
    tiendas: "Tiendas",
    contacto: "Contacto"
  };

  const linksFooter = {
    inicio: "Inicio",
    sobreNosotros: "Sobre Nosotros",
    tiendas: "Tiendas",
    contacto: "Contacto",
    avisoLegal: "Aviso Legal"

  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header links={linksHeader} />
        
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/contacto" element={<ContactoPage />} />
          {/* Añade más rutas según tus páginas */}
        </Routes>
        
        <Footer links={linksFooter} />
      </div>
    </BrowserRouter>
  );
}

export default App;
