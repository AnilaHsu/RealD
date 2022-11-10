import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./page/home/Home";
import Technology from "./page/technology/Technology";
import Business from "./page/business/Business";
import Science from "./page/science/Science";
import Sports from "./page/sports/Sports";
import Health from "./page/health/Health";
import Entertainment from "./page/entertainment/Entertainment";
import { useEffect } from "react";
import { getNewsData } from "./app/newsSlice";
import { useAppDispatch, useAppSelector } from "./app/hook";

function App(): JSX.Element {

const dispatch = useAppDispatch()
const category = useAppSelector((state) => state.news.category);
const countryCode = useAppSelector((state) => state.news.countryCode)
  useEffect(() => {
    dispatch(getNewsData({category, country: countryCode, page: 1 }));
  },[dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/RealDNews" element={<Home />} />
          <Route path="/RealDNews/technology" element={<Technology />} />
          <Route path="/RealDNews/business" element={<Business />} />
          <Route path="/RealDNews/science" element={<Science />} />
          <Route path="/RealDNews/sports" element={<Sports />} />
          <Route path="/RealDNews/health" element={<Health />} />
          <Route path="/RealDNews/entertainment" element={<Entertainment />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
