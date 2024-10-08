import { BASE_URL } from "./constatnts";

export const fetchData = async (cityId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/combined-projects?city_id=${cityId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const topUpcomingProjects = async (cityId) => {
  try {
    const response = await fetch(`${BASE_URL}/top-projects?city_id=${cityId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching top upcoming projects:", error);
  }
};

export const highlightedProjects = async (cityId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/combined-projects?city_id=${cityId}`
    );
    const highlightedProjectsList = await response.json();
    return highlightedProjectsList;
  } catch (error) {
    console.error("Error fetching highlighted projects:", error);
  }
};

// In callbacks.js

export const searchProjects = async (cityId, query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?city_id=${cityId}&query=${query}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching projects:", error);
    return { data: [] }; // Ensure a valid fallback structure
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/locations`);
    const categories = await response.json();
    console.log("locations", categories);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const allcitiesprojects = async () => {
  try {
    const response = await fetch(`${BASE_URL}/locations-dropdown`);
    const citylist = await response.json();
    return citylist;
  } catch (error) {
    console.error("Error fetching city list:", error);
  }
};

export const brandpartners = async () => {
  try {
    const response = await fetch(`${BASE_URL}/developers/featured-images`);
    const brandpartnerslist = await response.json();
    return brandpartnerslist;
  } catch (error) {
    console.error("Error fetching brand partners list:", error);
  }
};

export const getCityFromCoordinates = async (
  latitude,
  longitude,
  cities,
  setCity,
  setSelectedCity,
  storeCityId
) => {
  try {
    const apiKey = "zudmHsjS7dIfKFcaV9rRvDhIoAmXXsxfOUlrbV1U6Ic";
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    // Extract city name from API response
    const detectedCity = data.items[0].address.city;

    // Find matching city in the list of available cities
    const matchedCity = cities.find(
      (c) => c.location.toLowerCase() === detectedCity.toLowerCase()
    );
    if (matchedCity) {
      setCity(matchedCity.location);
      storeCityId(matchedCity.id);
      setSelectedCity(matchedCity.location);
    } else {
      // If no match found, set default city
      setCity("Select City");
      storeCityId(null);
    }

    return detectedCity;
  } catch (error) {
    console.error("Error getting city from coordinates:", error);
    return null;
  }
};

export const getnewsandblogdata = async () => {
  try {
    const response = await fetch(`${BASE_URL}/news`);
    const getnewsandblogdatalist = await response.json();
    return getnewsandblogdatalist;
  } catch (error) {
    console.error("Error fetching news and blog data:", error);
  }
};

export const getbloglistdata = async () => {
  try {
    const response = await fetch(`${BASE_URL}/newsList`);
    const result = await response.json();
    return result.data; // Assuming the response has a 'data' field
  } catch (error) {
    console.error("Error fetching blog list data:", error);
    return [];
  }
};

export const getHomeBannerContent = async () => {
  try {
    const response = await fetch(`${BASE_URL}/homepage-contents`);
    const homeBannerContent = await response.json();

    return homeBannerContent;
  } catch (error) {
    console.error("Error fetching home banner content:", error);
  }
};

export const downloadBrochureData = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/submit-enquiry-download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      return { success: false, errors: errorData };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error posting download brochure data:", error);
    return {
      success: false,
      error: "Network error or server is not responding.",
    };
  }
};

export const talktoexpertData = async (contactData) => {
  try {
    const response = await fetch(`${BASE_URL}/submit-enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      return { success: false, errors: errorData };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error posting contact us data:", error);
    return {
      success: false,
      error: "Network error or server is not responding.",
    };
  }
};

// login api function start here

export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error("Failed to login");
    }

    const responseData = await response.json();

    // Save the auth token or any other data from responseData
    const { access_token } = responseData;
    localStorage.setItem("authToken", JSON.stringify(access_token));
    return access_token;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// end function

export const registerUser = async (signupData) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error("Failed to register");
    }

    const responseData = await response.json();

    // Handle the response data as needed, e.g., save the auth token
    const { access_token } = responseData;
    localStorage.setItem("authToken", JSON.stringify(access_token));
    return access_token;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const videoequiryform = async (contactData) => {
  try {
    const response = await fetch(`${BASE_URL}/submit-enquiry-video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      return { success: false, errors: errorData };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error posting contact us data:", error);
    return {
      success: false,
      error: "Network error or server is not responding.",
    };
  }
};

export const florplanequiry = async (contactData) => {
  try {
    const response = await fetch(`${BASE_URL}/floorplan-enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return { success: false, errors: errorData };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error posting contact us data:", error);
    return {
      success: false,
      error: "Network error or server is not responding.",
    };
  }
};

export const postContactUsData = async (contactData, cityId) => {
  try {
    const dataToSend = { ...contactData, city_id: cityId };

    const response = await fetch(`${BASE_URL}/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return { success: false, errors: errorData };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error posting contact us data:", error);
    return {
      success: false,
      error: "Network error or server is not responding.",
    };
  }
};

export const postNewsletterData = (email) => {
  const newsletterData = { email };
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsletterData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          resolve({ success: true, data });
        } else {
          reject({ success: false, error: data.message });
        }
      })
      .catch((error) => {
        console.error("Error posting newsletter data:", error);
        reject({ success: false, error: error.message });
      });
  });
};

export const getHomepageBanners = async () => {
  try {
    const response = await fetch(`${BASE_URL}/homepageBanners`);
    const banners = await response.json();
    return banners.data;
  } catch (error) {
    console.error("Error fetching homepage banners:", error);
  }
};

// export const fetchNewLaunchProjects = async (cityId = 1) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/newLaunch-projects?city_id=${cityId}`
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching new launch projects:", error);
//     // Optionally return some default data or an empty object
//     return { projects: [] };
//   }
// };
