import "./header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getNewsData, selectCat } from "../../app/newsSlice";

export function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state) => state.news.country);

  return (
    <header className="header">
      <h1 className="logo">
        <img className="logo-img" src={logo} alt="logo" />
        <Link
          className="logo-text"
          to="/"
          onClick={() => {
            dispatch(selectCat(""));
            dispatch(
              getNewsData({
                category: "",
                country: country,
              })
            );
          }}
        >
          RealD
        </Link>
      </h1>
      <nav className="menu">
        <Link
          className="menu-item"
          to="/technology"
          onClick={() => {
            dispatch(selectCat("technology"));
            dispatch(
              getNewsData({
                category: "technology",
                country: country,
              })
            );
          }}
        >
          technology
        </Link>
        <Link
          className="menu-item"
          to="/business"
          onClick={() => {
            dispatch(selectCat("business"));
            dispatch(
              getNewsData({
                category: "business",
                country: country,
              })
            );
          }}
        >
          business
        </Link>
        <Link
          className="menu-item"
          to="/science"
          onClick={() => {
            dispatch(selectCat("science"));
            dispatch(
              getNewsData({
                category: "science",
                country: country,
              })
            );
          }}
        >
          science
        </Link>
        <Link
          className="menu-item"
          to="/sports"
          onClick={() => {
            dispatch(selectCat("sports"));
            dispatch(
              getNewsData({
                category: "sports",
                country: country,
              })
            );
          }}
        >
          sports
        </Link>
        <Link
          className="menu-item"
          to="/health"
          onClick={() => {
            dispatch(selectCat("health"));
            dispatch(
              getNewsData({
                category: "health",
                country: country,
              })
            );
          }}
        >
          health
        </Link>
        <Link
          className="menu-item"
          to="/entertainment"
          onClick={() => {
            dispatch(selectCat("entertainment"));
            dispatch(
              getNewsData({
                category: "entertainment",
                country: country,
              })
            );
          }}
        >
          entertainment
        </Link>
      </nav>
    </header>
  );
}

export default Header;
