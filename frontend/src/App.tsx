import "./App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Inicio from "./pages/inicio/Incio";
import AvisoLegal from "./pages/avisoLegal/AvisoLegal";
import Cookies from "./pages/cookies/Cookies";

function App() {
  const linksHeader = {
    inicio: "Inicio",
    sobreNosotros: "Sobre Nosotros",
    tiendas: "Tiendas",
    contacto: "Contacto",
  };

  const linksFooter = {
    inicio: "Inicio",
    sobreNosotros: "Sobre Nosotros",
    tiendas: "Tiendas",
    contacto: "Contacto",
    avisoLegal: "Aviso Legal",
    cookies: "Cookies",
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
