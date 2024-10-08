import React, { useState, useEffect, useContext } from "react";
import { Carousel } from "react-bootstrap";
import "./FullpageVerticalSlider.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {
  allcitiesprojects,
  getHomeBannerContent,
  getHomepageBanners,
  // highlightedProjects,
  // topUpcomingProjects,
  fetchData,
  searchProjects,
} from "../apis/callbacks";
import { CitiesContext, CityIdContext, CityNameContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeCitiesList } from "../redux/actions";

const MAX_SUGGESTIONS = 2; // Constant for max number of suggestions

const FullPageVerticalSlider = ({ setSelectedCity, store, cities }) => {
  const dispatch = useDispatch();
  const fetchedCities = useSelector((state) => state.city.cities);
  // const { storeCities } = useContext(CitiesContext);
  const [index, setIndex] = useState(0);
  const { storeCityName } = React.useContext(CityNameContext);
  // const [cities, setCities] = useState([]);
  const [userCity, setUserCity] = useState("");
  const [userCityId, setUserCityId] = useState(null);
  const [sliderContent, setSliderContent] = useState([]);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const { storeCityId } = useContext(CityIdContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [placeholder, setPlaceholder] = useState(
    "Search Project, Locality or Builder"
  );

  const [searchItems, setSearchItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    // const fetchCities = async () => {
    //   try {
    //     const citylist = await allcitiesprojects();
    //     // dispatch(storeCitiesList(citylist.locations));
    //     setCities(citylist.locations);
    //     // storeCities(citylist.locations);
    //   } catch (error) {
    //     console.error("Error fetching cities:", error);
    //   }
    // };

    const fetchSliderContent = async () => {
      try {
        const response = await getHomeBannerContent();
        setSliderContent(response.data);
      } catch (error) {
        console.error("Error fetching slider content:", error);
      }
    };

    const fetchBackgroundImages = async () => {
      try {
        const images = await getHomepageBanners();
        setBackgroundImages(images);
      } catch (error) {
        console.error("Error fetching background images:", error);
      }
    };

    // fetchCities();
    fetchSliderContent();
    fetchBackgroundImages();
  }, [dispatch]);

  useEffect(() => {
    const cityName = localStorage.getItem("cityName");
    const cityId = localStorage.getItem("cityId");

    if (cityName && cityId) {
      // If city is in local storage, set it
      setUserCity(cityName);
      setUserCityId(parseInt(cityId));
      storeCityId(parseInt(cityId));
      setSelectedCity(cityName);
    } else {
      // If not, fetch user location
      if (cities?.length > 0) {
        getUserLocation();
      }
    }
  }, [cities]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const apiKey = "zudmHsjS7dIfKFcaV9rRvDhIoAmXXsxfOUlrbV1U6Ic";
            const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            const detectedCity = data.items[0].address.city;
            const matchedCity = cities.find(
              (c) => c.location.toLowerCase() === detectedCity.toLowerCase()
            );
            if (matchedCity) {
              setUserCity(matchedCity.location);
              setUserCityId(matchedCity.id);
              storeCityName(matchedCity.location);
              localStorage.setItem("cityName", matchedCity.location);
              localStorage.setItem("cityId", matchedCity.id);
              storeCityId(matchedCity.id);
              setSelectedCity(matchedCity.location);
            } else {
              setDefaultCity(); // Default city if the detected city does not match
            }
          } catch (error) {
            console.error("Error getting city from coordinates:", error);
            setDefaultCity(); // Handle errors and set default city
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
          setDefaultCity(); // User denied location access, set default city
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setDefaultCity(); // Geolocation not supported, set default city
    }
  };

  const setDefaultCity = () => {
    const defaultCityName = "Mumbai"; // Replace with your actual default city name
    const defaultCityId = 1;

    setUserCity(defaultCityName);
    setUserCityId(defaultCityId);
    storeCityId(defaultCityId);
    storeCityName(defaultCityName);
    setSelectedCity(defaultCityName);
    localStorage.setItem("cityName", defaultCityName);
    localStorage.setItem("cityId", defaultCityId.toString());
  };

  // useEffect(() => {
  //   const fetchCityData = async () => {
  //     if (userCityId) {
  //       try {
  //         // const highlightedProjectsList = await highlightedProjects(userCityId);
  //         // const topUpcomingProjectsList = await topUpcomingProjects(userCityId);
  //         const topProjectsList = await fetchData(userCityId);
  //         // Handle the fetched data as needed
  //         // console.log("Highlighted Projects:", highlightedProjectsList);
  //         // console.log("Top Upcoming Projects:", topUpcomingProjectsList);
  //         console.log("Top Projects:", topProjectsList);
  //       } catch (error) {
  //         console.error("Error fetching city data:", error);
  //       }
  //     }
  //   };

  //   fetchCityData();
  // }, [userCityId]);

  const handleCityChange = (event) => {
    const selectedCityId = event.target.value;

    if (selectedCityId === "") {
      setUserCity("All Cities");
      setUserCityId(1);
      storeCityId(1);
      setSelectedCity("All Cities");
    } else {
      const selectedCity = cities.find(
        (city) => city.id === parseInt(selectedCityId)
      );
      if (selectedCity) {
        setUserCity(selectedCity.location);
        setUserCityId(selectedCityId);
        storeCityId(selectedCityId);
        storeCityName(selectedCity.location);
        localStorage.setItem("cityName", selectedCity.location);
        localStorage.setItem("cityId", selectedCity.id);
        setSelectedCity(selectedCity.location);
      } else {
        setUserCity("Select City");
        setUserCityId(null);
        setSelectedCity("Select City");
      }
    }
  };

  const handleSearchChange = async (string) => {
    setSearchQuery(string);
    if (string.trim() !== "") {
      try {
        const results = await searchProjects(userCityId, string);

        if (results && results.data && Array.isArray(results.data)) {
          const items = results.data
            .map((project) => ({
              id: project.id,
              name: project.title,
            }))
            .slice(0, MAX_SUGGESTIONS);
          setSearchItems(items);

          // Update placeholder to the title of the first result if available
          if (results.data.length > 0) {
            setPlaceholder(results.data[0].title);
          } else {
            setPlaceholder("No results found");
          }
        } else {
          setSearchItems([]);
          setPlaceholder("No results found");
          console.error("Search results are not in expected format:", results);
        }
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
        setPlaceholder("Error fetching results");
      }
    } else {
      setSearchItems([]);
      setPlaceholder("Search Project, Locality or Builder");
    }
  };

  const handleOnSelect = (item) => {
    setSearchQuery(item.name);
    setPlaceholder(item.name);

    // navigate("/search-result", {
    //   state: { results: searchResults, query: searchQuery },
    // });
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    if (searchQuery.trim() !== "") {
      try {
        const results = await searchProjects(searchQuery);
        if (results) {
          setSearchResults(results.data);

          navigate("/search-result", {
            state: { results: results.data, query: searchQuery },
          });
        } else {
          // You might want to show a message to the user or handle this case differently
        }
      } catch (error) {
        console.error("Error searching projects:", error);
        // Handle the error, maybe show an error message to the user
      }
    }
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      fade
      style={{ width: "100%", height: "auto" }}
    >
      {backgroundImages?.map((banner, i) => (
        <Carousel.Item key={i}>
          <img
            className="d-block w-100 home-slider-img"
            src={banner.banner}
            alt={`Slide ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            style={{
              objectFit: "cover",
              backgroundColor: "black",
              height: "600px",
            }}
          />
          {sliderContent?.map((slide, index) => (
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              key={index}
              className="slide-content"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                zIndex: "1000",
                transform: "translate(-50%, -50%)",
                color: "#fff",
              }}
            >
              <div className="slides-contents">
                <h2>{slide.title}</h2>
                <p>{slide.content}</p>
                <div className="search-box">
                  <form onSubmit={handleSearchSubmit}>
                    <ReactSearchAutocomplete
                      className="home-search-box"
                      items={searchItems}
                      onSearch={handleSearchChange}
                      onSelect={handleOnSelect}
                      maxResults={MAX_SUGGESTIONS}
                      placeholder={placeholder}
                      styling={{
                        zIndex: 3,
                        borderRadius: "0px",
                        boxShadow: "none",
                        border: "1px solid #dfe1e5",
                        hoverBackgroundColor: "#eee",
                        lineColor: "transparent",
                        placeholderColor: "#787878",
                        clearIconMargin: "3px 8px 0 0",
                        searchIconMargin: "0 0 0 8px",
                      }}
                      showIcon={false}
                      showClear={false}
                    />
                    <button type="submit" className="serch-btn-home">
                      <span className="web-search">Search Now</span>
                      <img
                        src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/search-mobiile-icon.svg"
                        className="search-icon-mobile"
                        alt="img"
                      />
                    </button>
                  </form>
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                    className="city-map-icon"
                    alt="map icon"
                  />
                  <select
                    id="citySelect"
                    value={userCityId || ""}
                    onChange={handleCityChange}
                  >
                    {userCity ? (
                      <option value="">{userCity}</option>
                    ) : (
                      <option value="">Select City</option>
                    )}
                    {cities?.map((city, index) => (
                      <option key={index} value={city.id}>
                        {city.location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default React.memo(FullPageVerticalSlider);
