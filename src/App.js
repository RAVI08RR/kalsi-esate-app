import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { debounce } from "lodash"; // Make sure to install lodash
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PropertyDetailpage from "./pages/PropertyDetailpage";
import Projectlistpage from "./pages/Projectlistpage";
import HomeLoanpage from "./pages/HomeLoanpage";
import Aboutuspage from "./pages/Aboutuspage";
import Contactuspage from "./pages/Contactuspage";
import Preloader from "./components/Preloader";
import InnerPageLoader from "./components/InnerPageLoader";
import BlogDetailpage from "./pages/BlogDetailpage";
import RelatedPostpage from "./pages/RelatedPostpage";
import Residentialprojectspage from "./pages/Residentialprojectspage";
import CommercialProjectspage from "./pages/CommercialProjectspage";
import Plotsprojectspage from "./pages/Plotsprojectspage";
import Hotprojectspage from "./pages/Hotprojectspage";
import BuilderDetailpage from "./pages/BuilderDetailpage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CityDetailpage from "./pages/CityDetailpage";
import Mainlayout from "./components/Mainlayout";
import BuilderDetailComponent from "./components/BuilderDetailcomponent";

import {
  fetchData,
  // topUpcomingProjects,
  fetchCategories,
  allcitiesprojects,
  brandpartners,
  // highlightedProjects,
  getnewsandblogdata,
  getbloglistdata,
  getHomeBannerContent,
  getHomepageBanners,
  // fetchNewLaunchProjects,
} from "./apis/callbacks";

import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "./App.css";
import Loginpage from "./pages/Loginpage";
import AdminComponent from "./components/AdminComponent";
import TermsAndConditionComponent from "./components/TermsAndConditionComponent";
import Desclaimer from "./components/Desclaimer";
import Devloperlist from "./components/Devloperlist";
import BuilderlistingPage from "./pages/BuilderlistingPage";
import NewLaunchcityDynamicPage from "./pages/NewLaunchCitiesvisePage";
import NewlaunchCityPage from "./components/NewlaunchCityPage";
import NewLaunchDynamicPage from "./pages/NewLaunchCitiesvisePage";
import NewLaunchCitiesvisePage from "./pages/NewLaunchCitiesvisePage";
import Residentailpagecitiesvise from "./pages/Residentailpagecitiesvise";
import CommericialCitievisePage from "./pages/CommericialCitievisePage";
import PlotscitievisePage from "./pages/PlotscitievisePage";
import ScrollToTop from "./components/ScrollToTop";
import TopBuilderlistpage from "./pages/TopBuilderlistpage";
import WebsiteLoginComponent from "./components/WebsiteLoginComponent";

export const CityIdContext = createContext();
export const CityNameContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [apiData, setApiData] = useState({});
  const [cityId, setCityId] = useState();
  const [city, setCity] = useState();
  const location = useLocation();
  const [cities, setCities] = useState([]);
  useEffect(() => {
    AOS.init();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const storeCityId = (id) => {
    setCityId(id);
  };

  const storeCityName = (city) => {
    try {
      setCity(city);
      console.log("stored city name", city);
    } catch (error) {
      console.log("storing city error", error);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citylist = await allcitiesprojects();
        setCities(citylist.locations);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  return (
    <CityIdContext.Provider value={{ cityId, storeCityId }}>
      <CityNameContext.Provider value={{ city, storeCityName }}>
        {/* <ScrollToTop /> */}
        <div className="app-container">
          <Header cityName={city} cities={cities} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  storeCityName={storeCityName}
                  apiData={apiData}
                  cities={cities}
                />
              }
            />
            <Route
              path="/property-detail/:propertyid/:slug"
              element={<PropertyDetailpage apiData={apiData} cities={cities} />}
            />
            <Route
              path="/new-launch"
              element={<Projectlistpage apiData={apiData} cities={cities} />}
            />
            <Route
              path="/home-loan"
              element={<HomeLoanpage apiData={apiData} cities={cities} />}
            />
            <Route
              path="/about-us"
              element={<Aboutuspage apiData={apiData} cities={cities} />}
            />
            <Route
              path="/contact-us"
              element={<Contactuspage apiData={apiData} cities={cities} />}
            />
            <Route
              path="/blog-detail/:id"
              element={<BlogDetailpage apiData={apiData} cities={cities} />}
            />
            <Route
              path="/blog-list"
              element={<RelatedPostpage apiData={apiData} cities={cities} />}
            />
            <Route
              path="/residential-projects"
              element={
                <Residentialprojectspage apiData={apiData} cities={cities} />
              }
            />
            <Route
              path="commercial-Projects"
              element={
                <CommercialProjectspage apiData={apiData} cities={cities} />
              }
            />
            <Route
              path="plots"
              element={<Plotsprojectspage apiData={apiData} cities={cities} />}
            />
            <Route
              path="/hot-projects"
              element={<Hotprojectspage apiData={apiData} cities={cities} />}
            />
            <Route
              path="/builder-details/:id"
              element={<BuilderDetailpage cities={cities} />}
            />
            <Route
              path="/search-result"
              element={<SearchResultsPage apiData={apiData} cities={cities} />}
            />
            <Route
              path="/city-detail/:cityName/:lid?"
              element={<CityDetailpage cities={cities} />}
            />
            <Route
              path="/login"
              element={<WebsiteLoginComponent cities={cities} />}
            />
            <Route path="/admin" element={<Mainlayout cities={cities} />} />
            <Route
              path="/terms-condition"
              element={<TermsAndConditionComponent cities={cities} />}
            />
            <Route
              path="/Desclaimer"
              element={<Desclaimer cities={cities} />}
            />
            {/* <Route path ="/property-by-top-builder" element ={<Devloperlist/>}/> */}
            <Route
              path="/properties-by-developer/:id"
              element={<BuilderlistingPage cities={cities} />}
            />
            <Route
              path="/top-builder"
              element={<TopBuilderlistpage cities={cities} />}
            />

            <Route
              path="/new-launchs/:cityIdN"
              element={<NewLaunchCitiesvisePage cities={cities} />}
            />

            <Route
              path="/residential-projects-list/:cityIdN"
              element={<Residentailpagecitiesvise cities={cities} />}
            />

            <Route
              path="/commercial-projects-list/:cityIdN"
              element={<CommericialCitievisePage cities={cities} />}
            />

            <Route
              path="/plots-projects-list/:cityIdN"
              element={<PlotscitievisePage cities={cities} />}
            />
          </Routes>
          <Footer cities={cities} />
          {(loading || updating) && (
            <div className="overlay">
              {loading ? (
                location.pathname === "/" ? (
                  <Preloader />
                ) : (
                  <InnerPageLoader />
                )
              ) : (
                <div className="updating-indicator">
                  <div className="inner-page-loader">
                    {/* Your loader content, e.g., a spinner */}

                    <div className="spinner"></div>
                  </div>
                </div> // You can replace this with a custom updating component
              )}
            </div>
          )}
        </div>
      </CityNameContext.Provider>
    </CityIdContext.Provider>
  );
};

export default App;
