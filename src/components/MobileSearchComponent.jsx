import React, { useState, useEffect, useContext } from "react";
import { Select, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {
  allcitiesprojects,
  searchProjects,
  // highlightedProjects,
  // topUpcomingProjects,
  fetchData,
  getHomeBannerContent,
} from "../apis/callbacks";
import { CityIdContext, CityNameContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Height } from "@mui/icons-material";

const { Option } = Select;
const MAX_SUGGESTIONS = 2;

const MobileSearchComponent = ({ setSelectedCity, cities }) => {
  const dispatch = useDispatch();
  const { storeCityName } = useContext(CityNameContext);
  const { storeCityId } = useContext(CityIdContext);
  const navigate = useNavigate();

  // const [cities, setCities] = useState([]);
  const [userCity, setUserCity] = useState("");
  const [sliderContent, setSliderContent] = useState([]);

  const [userCityId, setUserCityId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [placeholder, setPlaceholder] = useState(
    "Search Project, Locality or Builder"
  );
  const [searchItems, setSearchItems] = useState([]);

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       const citylist = await allcitiesprojects();
  //       setCities(citylist.locations);
  //     } catch (error) {
  //       console.error("Error fetching cities:", error);
  //     }
  //   };

  //   fetchCities();
  // }, []);

  const fetchSliderContent = async () => {
    try {
      const response = await getHomeBannerContent();
      setSliderContent(response.data);
    } catch (error) {
      console.error("Error fetching slider content:", error);
    }
  };

  useEffect(() => {
    const cityName = localStorage.getItem("cityName");
    const cityId = localStorage.getItem("cityId");

    if (cityName && cityId) {
      setUserCity(cityName);
      setUserCityId(parseInt(cityId));
      storeCityId(parseInt(cityId));
      setSelectedCity(cityName);
    } else if (cities?.length > 0) {
      getUserLocation();
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

  useEffect(() => {
    const fetchCityData = async () => {
      if (userCityId) {
        try {
          // const highlightedProjectsList = await highlightedProjects(userCityId);
          // const topUpcomingProjectsList = await topUpcomingProjects(userCityId);
          const topProjectsList = await fetchData(userCityId);
          // Handle the fetched data as needed
          // console.log("Highlighted Projects:", highlightedProjectsList);
          // console.log("Top Upcoming Projects:", topUpcomingProjectsList);
          console.log("Top Projects:", topProjectsList);
        } catch (error) {
          console.error("Error fetching city data:", error);
        }
      }
    };

    fetchCityData();
  }, [userCityId]);

  const handleCityChange = (selectedCityId) => {
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
          if (results.data.length > 0) {
            setPlaceholder(results.data[0].title);
          } else {
            setPlaceholder("No results found");
          }
        } else {
          setSearchItems([]);
          setPlaceholder("No results found");
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
  };

  const handleSearchSubmit = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const results = await searchProjects(searchQuery);
        if (results) {
          setSearchResults(results.data);
          navigate("/search-result", {
            state: { results: results.data, query: searchQuery },
          });
        } else {
          console.log("No results found");
        }
      } catch (error) {
        console.error("Error searching projects:", error);
      }
    }
  };

  return (
    <div className="conatiner p-0 bg-mobile-home">
      <div className="homebgmbcontainer" style={styles.container}>
        <div className="col-lg-10">
          {/* {sliderContent?.map((slide) => ( */}
          <div className="slide-contents-mb" style={{}}>
            <div className="slides-contents">
              <h2>Start Your Home Journey Today.</h2>
              {/* <p>
                With The Most Complete Source Of Homes For Sale & Properties
                Near You.
              </p> */}
            </div>
          </div>
          {/* ))} */}
        </div>

        <Select
          className="mt-2 home-md-search"
          style={styles.select}
          placeholder="Select City"
          value={userCityId || ""}
          onChange={handleCityChange}
        >
          {userCity ? (
            <Option value="">{userCity}</Option>
          ) : (
            <Option value="">Select City</Option>
          )}
          {cities?.map((city) => (
            <Option key={city.id} value={city.id}>
              {city.location}
            </Option>
          ))}
        </Select>
        <div style={styles.searchContainer}>
          <ReactSearchAutocomplete
            items={searchItems}
            onSearch={handleSearchChange}
            onSelect={handleOnSelect}
            maxResults={MAX_SUGGESTIONS}
            placeholder={placeholder}
            styling={styles.searchAutocomplete}
          />

          <button
            className="btn-mb-serach"
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearchSubmit}
            style={styles.searchButton}
          >
            <img
              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/search-mobiile-icon.svg"
              className="search-icon-mobile"
              alt="img"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#F5E6D3",
    Height: "600px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  select: {
    width: "100%",
    marginBottom: "10px",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
  },
  homebgmbcontainer: {
    // height: 500px;
    // padding-top: 50px;
    Height: "500px",
  },
  searchAutocomplete: {
    zIndex: 3,
    borderRadius: "0px",
    boxShadow: "none",
    border: "1px solid #dfe1e5",
    hoverBackgroundColor: "#eee",
    lineColor: "transparent",
    placeholderColor: "#787878",
    clearIconMargin: "3px 8px 0 0",
    searchIconMargin: "0 0 0 8px",
  },
  searchButton: {
    marginTop: "10px",
  },
};

export default MobileSearchComponent;
