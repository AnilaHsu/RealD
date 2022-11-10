import "./header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import menuIcon from "../../assets/menu.svg";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getNewsData, selectCat } from "../../app/newsSlice";
import { useState } from "react";

export function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const countryCode = useAppSelector((state) => state.news.countryCode);
  const category = useAppSelector((state) => state.news.category);

  const menuList = [
    { id: 0, name: "home" },
    { id: 1, name: "technology" },
    { id: 2, name: "business" },
    { id: 3, name: "science" },
    { id: 4, name: "sports" },
    { id: 5, name: "health" },
    { id: 6, name: "entertainment" },
  ];
  const menuItem = menuList.find((item) => item.name === category);
  const menuId = menuItem ? menuItem.id : 0;

  const [menuNum, setMenuNum] = useState<number>(menuId);
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <header className="header">
      <div className="main-header">
        <h1 className="logo">
          <img className="logo-img" src={logo} alt="logo" />
          RealD news
        </h1>
        <span onClick={() => setMobileMenu(!mobileMenu)}>
          <img className="menu-button" src={menuIcon} alt="" />
        </span>
      </div>
      <div className="sub-header">
        <nav className="menu">
          {menuList.map((item, index) => {
            return (
              <Link
                key={index}
                className={
                  menuNum === item.id ? "active menu-item" : "menu-item"
                }
                to={item.name === "home" ? "/RealDNews" : `/RealDNews/${item.name}`}
                onClick={() => {
                  setMenuNum(item.id);
                  console.log(item.id, index);
                  dispatch(selectCat(item.name === "home" ? "" : item.name));
                  dispatch(
                    getNewsData({
                      category: item.name === "home" ? "" : item.name,
                      country: countryCode,
                      page: 1,
                    })
                  );
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      {mobileMenu ? (
        <div className="mobile-header">
          <nav className="menu">
            {menuList.map((item, index) => {
              return (
                <Link
                  key={index}
                  className={
                    menuNum === item.id ? "active menu-item" : "menu-item"
                  }
                  to={item.name === "home" ? "/" : `/${item.name}`}
                  onClick={() => {
                    setMenuNum(item.id);
                    console.log(item.id, index);
                    dispatch(selectCat(item.name === "home" ? "" : item.name));
                    dispatch(
                      getNewsData({
                        category: item.name === "home" ? "" : item.name,
                        country: countryCode,
                        page: 1,
                      })
                    );
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
