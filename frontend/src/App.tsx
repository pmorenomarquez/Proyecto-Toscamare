import "./App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Inicio from "./pages/inicio/Incio";

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
    <div className="app-container">
      <Header links={linksHeader}></Header>
      <Inicio />
      <Footer links={linksFooter}></Footer>
    </div>
   
  );
}

export default App;
