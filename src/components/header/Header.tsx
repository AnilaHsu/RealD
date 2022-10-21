import "./header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getNewsData, selectCat } from "../../app/newsSlice";

export function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const countryCode = useAppSelector((state) => state.news.countryCode);
  console.log(countryCode)
  
  return (
    <header className="header">
      <h1 className="logo">
        <img className="logo-img" src={logo} alt="logo" />
        RealD news
      </h1>
      <div className="sub-header">
        <nav className="menu">
          <Link
            className="menu-item"
            to="/"
            onClick={() => {
              dispatch(selectCat(""));
              dispatch(
                getNewsData({
                  category: "",
                  country: countryCode,
                })
              );
            }}
          >
            home
          </Link>
          <Link
            className="menu-item"
            to="/technology"
            onClick={() => {
              dispatch(selectCat("technology"));
              dispatch(
                getNewsData({
                  category: "technology",
                  country: countryCode,
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
                  country: countryCode,
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
                  country: countryCode,
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
                  country: countryCode,
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
                  country: countryCode,
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
                  country: countryCode,
                })
              );
            }}
          >
            entertainment
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
