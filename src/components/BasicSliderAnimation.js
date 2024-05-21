import HeroSlider, { Overlay, Slide, MenuNav } from "hero-slider";

// Import any additional components or styles needed for the slider
// import Wrapper from "./components/Wrapper";
// import Title from "./components/Title";
// import Subtitle from "./components/Subtitle";

const bogliasco = "https://i.imgur.com/Gu5Cznz.jpg";
const countyClare = "https://i.imgur.com/idjXzVQ.jpg";
const craterRock = "https://i.imgur.com/8DYumaY.jpg";
const giauPass = "https://i.imgur.com/8IuucQZ.jpg";

export default function BasicSliderAnimation() {
  return (
    <HeroSlider
      height={"100%"}
      autoplay
      controller={{
        initialSlide: 1, // Set the initial slide (0-based index)
        slidingDuration: 500, // Duration of the sliding animation (in ms)
        slidingDelay: 100, // Delay between slides (in ms)
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide), // Callback fired when sliding starts
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ), // Callback fired before sliding starts
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide), // Callback fired after sliding ends
      }}
    >
      <Overlay>
        {/* Overlay content */}
        <div className="">
          <h2>Basic Setup</h2>
          <p>Check out the documentation for more advanced examples.</p>
        </div>
      </Overlay>

      {/* Slides */}
      <Slide
        shouldRenderMask
        label="Giau Pass - Italy"
        background={{
          backgroundImageSrc: giauPass,
        }}
      />
      <Slide
        shouldRenderMask
        label="Bogliasco - Italy"
        background={{
          backgroundImageSrc: bogliasco,
        }}
      />
      <Slide
        shouldRenderMask
        label="County Clare - Ireland"
        background={{
          backgroundImageSrc: countyClare,
        }}
      />
      <Slide
        shouldRenderMask
        label="Crater Rock, OR - United States"
        background={{
          backgroundImageSrc: craterRock,
        }}
      />

      {/* Navigation */}
      <MenuNav />
    </HeroSlider>
  );
}
