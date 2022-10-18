import "./header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"

export function Header(): JSX.Element {
  return (
    <header className="header">
      <h1 className="logo">
        <img className="logo-img" src={logo} alt="logo" />
        <Link className="logo-text" to="/">
            RealD
        </Link>
      </h1>
      <nav>
        <Link className="menu-item" to="/technology">
          technology
        </Link>
        <Link className="menu-item" to="/business">
          business
        </Link>
        <Link className="menu-item" to="/science">
          science
        </Link>
        <Link className="menu-item" to="/sports">
          sports
        </Link>
        <Link className="menu-item" to="/health">
          health
        </Link>
        <Link className="menu-item" to="/entertainment">
          entertainment
        </Link>
      </nav>
    </header>
  );
}

export default Header;
