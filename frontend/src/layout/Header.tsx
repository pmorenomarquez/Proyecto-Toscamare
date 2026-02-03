import "./Header.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "/logoToscamare/logo-simple-sin-fondo.png";


/* Definición de las props que recibe el componente Header */
interface HeaderProps {
    links: {
        inicio: string;
        sobreNosotros: string;
        tiendas: string;
        contacto: string;
    };
}

/*
Componente Header que recibe un objeto de enlaces como props y renderiza el encabezado del sitio web.
*/
function Header({ links }: HeaderProps) {

    return (
        <header className="header-menu">
            <div className="header-logo">
              <img src={logo} alt="Toscamare logo" />
            </div>

            <div className="header-nav">
        <nav>
          <ul className="header-nav-list">
            <li>
              <Link className="link" to={links.inicio}>
                Inicio
              </Link>
            </li>{" "}
            <li>
              <Link className="link" to={links.sobreNosotros}>
                Sobre Nosotros
              </Link>
            </li>{" "}
            <li>
              <Link className="link" to={links.tiendas}>
                Tiendas
              </Link>
            </li>{" "}
            <li>
              <Link className="link" to={links.contacto}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>

            <div className="header-shop">
                <button className="shop-button" onClick={() => {}}>
                    PRÓXIMAMENTE
                    <FaShoppingCart />
                </button>
            </div>
            
        </header>
    );
}

export default Header
