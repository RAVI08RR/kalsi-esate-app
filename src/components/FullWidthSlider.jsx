// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// function FullWidthSlider() {
//   const [swiperInstance, setSwiperInstance] = useState(null);

//   const handleSwiperInit = (swiper) => {
//     setSwiperInstance(swiper);
//   };

//   useEffect(() => {
//     if (swiperInstance) {
//       const updateButtonState = () => {
//         const nextButton = document.querySelector(".swiper-button-next");
//         if (swiperInstance.isEnd) {
//           nextButton.disabled = true;
//           nextButton.classList.add("swiper-button-disabled");
//         } else {
//           nextButton.disabled = false;
//           nextButton.classList.remove("swiper-button-disabled");
//         }
//       };

//       swiperInstance.on("slideChange", updateButtonState);
//       updateButtonState(); // Initial state update

//       return () => {
//         swiperInstance.off("slideChange", updateButtonState);
//       };
//     }
//   }, [swiperInstance]);

//   return (
//     <div
//       data-aos="fade-up"
//       data-aos-duration="3000"
//       className="slider-container"
//     >
//       <div className="heading-with-arrows">
//         <h2 className="slider-heading">
//           Find Luxury Homes: Kalsi Estate, India's Best.
//         </h2>
//         <div className="arrow-buttons">
//           <div className="swiper-button-prev">
//             <img
//               src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/prev-icon.svg"
//               className="arrow-control"
//               alt="Previous"
//             />
//           </div>
//           <div className="swiper-button-next">
//             <img
//               src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/next-arrow.svg"
//               className="arrow-control"
//               alt="Next"
//             />
//           </div>
//         </div>
//       </div>

//       <Swiper
//         className="luxury-slider-section-main"
//         modules={[Navigation, Pagination]}
//         navigation={{
//           nextEl: ".swiper-button-next",
//           prevEl: ".swiper-button-prev",
//         }}
//         pagination={{ clickable: true }}
//         spaceBetween={20}
//         slidesPerView={4.5}
//         centeredSlides={true}
//         onSwiper={handleSwiperInit}
//         breakpoints={{
//           600: {
//             slidesPerView: 1,
//             centeredSlides: false,
//           },
//           1024: {
//             slidesPerView: 2,
//             centeredSlides: true,
//           },
//         }}
//       >
//         <SwiperSlide className="slider-luxary-new">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/delhi.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/banner-city-gloden.png')`,
//               }}
//             ></div>
//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Delhi</h2>
//               <div className="icon-box-city">
//                 <img
//                   src="/assets/images/city-icons/delhi-icon.svg"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         <SwiperSlide className="slider-luxary-new">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/mumbai.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/mumbai-golden.png')`,
//               }}
//             ></div>
//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Mumbai</h2>
//               <div className="icon-box-city">
//                 <img
//                   src="/assets/images/city-icons/mumbai-icon.svg"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         <SwiperSlide className="slider-luxary-new">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/chennai.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/chennai-golden.png')`,
//               }}
//             ></div>
//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Chennai</h2>
//               <div className="icon-box-city">
//                 <img
//                   src="/assets/images/city-icons/chennai-icon.svg"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         <SwiperSlide className="slider-luxary-new">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/bangalore.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/bangalore-golden.png')`,
//               }}
//             ></div>
//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Banglore</h2>
//               <div className="icon-box-city">
//                 <img
//                   src="/assets/images/city-icons/bangalore-icon.svg"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         <SwiperSlide className="slider-luxary-new">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/ahmedabad-1.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/ahmedabad-golden.png')`,
//               }}
//             ></div>
//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Ahmedabad</h2>
//               <div className="icon-box-city">
//                 <img
//                   src="/assets/images/city-icons/ahmedabad-icon.svg"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         <SwiperSlide className="slider-luxary-new">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/mumbai.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/mumbai-golden.png')`,
//               }}
//             ></div>
//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Mumbai</h2>
//               <div className="icon-box-city">
//                 <img
//                   src="assets/images/hyd-icon.png"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// }

// export default FullWidthSlider;

// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// function FullWidthSlider() {
//   const [swiperInstance, setSwiperInstance] = useState(null);
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(null);
//   const [isSwiperDisabled, setIsSwiperDisabled] = useState(false);

//   const handleActiveIndexChange = (swiper) => {
//     const newIndex = swiper.activeIndex;
//     setCurrentSlideIndex(newIndex);

//     // Stop the Swiper when it reaches index 5
//     if (newIndex === 5) {
//       setIsSwiperDisabled(true);
//       swiper.disable();
//     }
//   };

//   const handleSwiperInit = (swiper) => {
//     setSwiperInstance(swiper);
//     setCurrentSlideIndex(swiper.activeIndex);
//   };

//   useEffect(() => {
//     if (swiperInstance) {
//       const updateButtonState = () => {
//         const nextButton = document.querySelector(".swiper-button-next");
//         const prevButton = document.querySelector(".swiper-button-prev");
//         const swiperWrapper = document.querySelector(".swiper-wrapper");

//         if (nextButton) {
//           if (swiperInstance.isEnd) {
//             nextButton.disabled = true;
//             nextButton.classList.add("swiper-button-disabled");
//           } else {
//             nextButton.disabled = false;
//             nextButton.classList.remove("swiper-button-disabled");
//           }
//         }

//         if (prevButton) {
//           if (swiperInstance.isBeginning) {
//             prevButton.disabled = true;
//             prevButton.classList.add("swiper-button-disabled");
//           } else {
//             prevButton.disabled = false;
//             prevButton.classList.remove("swiper-button-disabled");
//           }
//         }

//         if (swiperWrapper) {
//           const translateValue = swiperInstance.translate;
//           swiperWrapper.style.transform = `translate3d(${translateValue}px, 0px, 0px)`;
//           swiperWrapper.style.transitionDelay = "0ms";
//         }
//       };

//       swiperInstance.on("slideChange", updateButtonState);
//       updateButtonState(); // Initial state update

//       return () => {
//         swiperInstance.off("slideChange", updateButtonState);
//       };
//     }
//   }, [swiperInstance]);

//   const slidesData = [
//     {
//       city: "Delhi",
//       image: "/assets/images/cities-images/delhi.png",
//       overlay: "/assets/images/cities-images/banner-city-gloden.png",
//       icon: "/assets/images/city-icons/delhi-icon.svg",
//     },
//     {
//       city: "Mumbai",
//       image: "/assets/images/cities-images/mumbai.png",
//       overlay: "/assets/images/cities-images/mumbai-golden.png",
//       icon: "/assets/images/city-icons/mumbai-icon.svg",
//     },
//     {
//       city: "Chennai",
//       image: "/assets/images/cities-images/chennai.png",
//       overlay: "/assets/images/cities-images/chennai-golden.png",
//       icon: "/assets/images/city-icons/chennai-icon.svg",
//     },
//     {
//       city: "Bangalore",
//       image: "/assets/images/cities-images/bangalore.png",
//       overlay: "/assets/images/cities-images/bangalore-golden.png",
//       icon: "/assets/images/city-icons/bangalore-icon.svg",
//     },
//     {
//       city: "Ahmedabad",
//       image: "/assets/images/cities-images/ahmedabad-1.png",
//       overlay: "/assets/images/cities-images/ahmedabad-golden.png",
//       icon: "/assets/images/city-icons/ahmedabad-icon.svg",
//     },

//     {
//       city: "Ahmedabad",
//       image: "/assets/images/cities-images/ahmedabad-1.png",
//       overlay: "/assets/images/cities-images/ahmedabad-golden.png",
//       icon: "/assets/images/city-icons/ahmedabad-icon.svg",
//     },

//     {
//       city: "Ahmedabad",
//       image: "/assets/images/cities-images/ahmedabad-1.png",
//       overlay: "/assets/images/cities-images/ahmedabad-golden.png",
//       icon: "/assets/images/city-icons/ahmedabad-icon.svg",
//     },
//   ];

//   return (
//     <div
//       data-aos="fade-up"
//       data-aos-duration="3000"
//       className="slider-container"
//     >
//       <div className="heading-with-arrows">
//         <h2 className="slider-heading">
//           Find Luxury Homes: Kalsi Estate, India's Best.
//         </h2>
//         <div className="arrow-buttons">
//           <div className="swiper-button-prev">
//             <img
//               src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/prev-icon.svg"
//               className="arrow-control"
//               alt="Previous"
//             />
//           </div>
//           <div className="swiper-button-next">
//             <img
//               src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/next-arrow.svg"
//               className="arrow-control"
//               alt="Next"
//             />
//           </div>
//         </div>
//       </div>
//       <div
//         style={{ width: "100%", overflow: "hidden", backgroundColor: "red" }}
//       >
//         <Swiper
//           style={{ backgroundColor: "blue" }}
//           className="luxury-slider-section-main "
//           modules={[Navigation, Pagination]}
//           navigation={{
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//           }}
//           pagination={{ clickable: true }}
//           spaceBetween={10}
//           slidesPerView={4}
//           loop={true}
//           centeredSlides={true}
//           onSwiper={handleSwiperInit}
//           breakpoints={{
//             600: {
//               slidesPerView: 1,
//               centeredSlides: false,
//             },
//             1024: {
//               slidesPerView: 2,
//               centeredSlides: true,
//             },
//           }}
//         >
//           {slidesData.map((slide, index) => (
//             <SwiperSlide key={index}>
//               <div className="slider-luxary-new">
//                 <div
//                   className="bg-slider-img"
//                   style={{
//                     backgroundImage: `url(${slide.image})`,
//                   }}
//                 >
//                   <div
//                     className="overlay-image"
//                     style={{
//                       backgroundImage: `url(${slide.overlay})`,
//                     }}
//                   ></div>
//                   <div className="hover-box-new">
//                     <h2 className="city-names text-white">{slide.city}</h2>
//                     <div className="icon-box-city">
//                       <img
//                         src={slide.icon}
//                         alt={slide.city}
//                         className="icon-box-city"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

// export default FullWidthSlider;

// import React, { useRef } from "react";
// import Swiper from "react-id-swiper";
// // import CustomButton from "./CustomButton";
// // import CustomScrollbar from "./CustomScrollbar";

// const CustomizedComponent = () => {
//   const swiperRef = useRef(null);

//   const params = {
//     ContainerEl: "section",
//     WrapperEl: "section",
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     renderPrevButton: () => (
//       <button className="swiper-button-prev">Prev</button>
//     ),
//     renderNextButton: () => (
//       <button className="swiper-button-next">Next</button>
//     ),

//     slidesPerView: 4,
//     centeredSlides: true,
//     spaceBetween: 10,
//     loop: true,
//     breakpoints: {
//       600: {
//         slidesPerView: 1,
//         centeredSlides: false,
//       },
//       1024: {
//         slidesPerView: 2,
//         centeredSlides: true,
//       },
//     },
//   };

//   const centerCurrentSlide = () => {
//     if (swiperRef.current && swiperRef.current.swiper) {
//       swiperRef.current.swiper.slideTo(swiperRef.current.swiper.activeIndex, 0);
//     }
//   };

//   const slidesData = [
//     {
//       city: "Delhi",
//       image: "/assets/images/cities-images/delhi.png",
//       overlay: "/assets/images/cities-images/banner-city-gloden.png",
//       icon: "/assets/images/city-icons/delhi-icon.svg",
//     },
//     {
//       city: "Mumbai",
//       image: "/assets/images/cities-images/mumbai.png",
//       overlay: "/assets/images/cities-images/mumbai-golden.png",
//       icon: "/assets/images/city-icons/mumbai-icon.svg",
//     },
//     {
//       city: "Chennai",
//       image: "/assets/images/cities-images/chennai.png",
//       overlay: "/assets/images/cities-images/chennai-golden.png",
//       icon: "/assets/images/city-icons/chennai-icon.svg",
//     },
//     {
//       city: "Bangalore",
//       image: "/assets/images/cities-images/bangalore.png",
//       overlay: "/assets/images/cities-images/bangalore-golden.png",
//       icon: "/assets/images/city-icons/bangalore-icon.svg",
//     },
//     {
//       city: "Ahmedabad",
//       image: "/assets/images/cities-images/ahmedabad-1.png",
//       overlay: "/assets/images/cities-images/ahmedabad-golden.png",
//       icon: "/assets/images/city-icons/ahmedabad-icon.svg",
//     },
//     {
//       city: "Ahmedabad",
//       image: "/assets/images/cities-images/ahmedabad-1.png",
//       overlay: "/assets/images/cities-images/ahmedabad-golden.png",
//       icon: "/assets/images/city-icons/ahmedabad-icon.svg",
//     },
//     {
//       city: "Ahmedabad",
//       image: "/assets/images/cities-images/ahmedabad-1.png",
//       overlay: "/assets/images/cities-images/ahmedabad-golden.png",
//       icon: "/assets/images/city-icons/ahmedabad-icon.svg",
//     },
//   ];

//   return (
//     <div
//       data-aos="fade-up"
//       data-aos-duration="3000"
//       className="slider-container"
//     >
//       <div className="heading-with-arrows">
//         <h2 className="slider-heading">
//           Find Luxury Homes: Kalsi Estate, India's Best.
//         </h2>
//         <div className="arrow-buttons">
//           <div className="swiper-button-prev">
//             <img
//               src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/prev-icon.svg"
//               className="arrow-control"
//               alt="Previous"
//             />
//           </div>
//           <div className="swiper-button-next">
//             <img
//               src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/next-arrow.svg"
//               className="arrow-control"
//               alt="Next"
//             />
//           </div>
//         </div>
//       </div>
//       <div
//         style={{ width: "100%", overflow: "hidden", backgroundColor: "red" }}
//       >
//         <Swiper ref={swiperRef} {...params}>
//           {slidesData.map((slide, index) => (
//             <div key={index} className="slider-luxary-new">
//               <div
//                 className="bg-slider-img"
//                 style={{ backgroundImage: `url(${slide.image})` }}
//               >
//                 <div
//                   className="overlay-image"
//                   style={{ backgroundImage: `url(${slide.overlay})` }}
//                 ></div>
//                 <div className="hover-box-new">
//                   <h2 className="city-names text-white">{slide.city}</h2>
//                   <div className="icon-box-city">
//                     <img
//                       src={slide.icon}
//                       alt={slide.city}
//                       className="icon-box-city"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default CustomizedComponent;

import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "bootstrap/dist/css/bootstrap.min.css";

const slidesData = [
  {
    city: "Delhi",
    image: "/assets/images/cities-images/delhi.png",
    overlay: "/assets/images/cities-images/banner-city-gloden.png",
    icon: "/assets/images/city-icons/delhi-icon.svg",
  },
  {
    city: "Mumbai",
    image: "/assets/images/cities-images/mumbai.png",
    overlay: "/assets/images/cities-images/mumbai-golden.png",
    icon: "/assets/images/city-icons/mumbai-icon.svg",
  },
  {
    city: "Chennai",
    image: "/assets/images/cities-images/chennai.png",
    overlay: "/assets/images/cities-images/chennai-golden.png",
    icon: "/assets/images/city-icons/chennai-icon.svg",
  },
  {
    city: "Bangalore",
    image: "/assets/images/cities-images/bangalore.png",
    overlay: "/assets/images/cities-images/bangalore-golden.png",
    icon: "/assets/images/city-icons/bangalore-icon.svg",
  },
  {
    city: "Ahmedabad",
    image: "/assets/images/cities-images/ahmedabad-1.png",
    overlay: "/assets/images/cities-images/ahmedabad-golden.png",
    icon: "/assets/images/city-icons/ahmedabad-icon.svg",
  },
];

function FullWidthSlider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef(null);
  const totalSlides = slidesData.length;
  const slidesToShow = 3.5;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    centerMode: "true",
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    beforeChange: (current, next) => setSlideIndex(next),
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mb-4">
        <button
          disabled={slideIndex === 0}
          className={`btn font-weight-bold px-4 py-2 mx-2 rounded ${
            slideIndex === 0
              ? "btn-secondary text-light disabled"
              : "btn-primary"
          }`}
          onClick={previous}
        >
          Previous
        </button>
        <button
          disabled={slideIndex >= totalSlides - slidesToShow}
          className={`btn font-weight-bold px-4 py-2 mx-2 rounded ${
            slideIndex >= totalSlides - slidesToShow
              ? "btn-secondary text-light disabled"
              : "btn-primary"
          }`}
          onClick={next}
        >
          Next
        </button>
      </div>
      <div className="slider-container">
        <Slider ref={sliderRef} {...settings}>
          {slidesData.map((slide, index) => (
            <div key={index} className="slider-luxary-new">
              <div
                className="bg-slider-img"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div
                  className="overlay-image"
                  style={{ backgroundImage: `url(${slide.overlay})` }}
                ></div>
                <div className="hover-box-new">
                  <h2 className="city-names text-white">{slide.city}</h2>
                  <div className="icon-box-city">
                    <img
                      src={slide.icon}
                      alt={slide.city}
                      className="icon-box-city"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div
          className="w-100 bg-light my-4 mx-auto rounded overflow-hidden border border-secondary"
          style={{ maxWidth: "500px" }}
        >
          <div
            className="bg-success text-white text-center py-1"
            style={{ width: `${(slideIndex + 1) * (100 / totalSlides)}%` }}
          >
            {/* {Math.round((slideIndex + 1) * (100 / totalSlides))}% */}
          </div>
        </div>
      </div>
    </>
  );
}

export default FullWidthSlider;
