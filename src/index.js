// // import React from "react";
// // import ReactDOM from "react-dom/client";
// import "./index.css";
// // import App from "./App";
// // import reportWebVitals from "./reportWebVitals";
// import "bootstrap/dist/css/bootstrap.min.css";

// // const root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );

// // // If you want to start measuring performance in your app, pass a function
// // // to log results (for example: reportWebVitals(console.log))
// // // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();

// // src/index.js
// import React, { createContext, useState } from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "core-js/stable";
import "regenerator-runtime/runtime";

import { Provider } from "react-redux";
import store from "./redux/store";
import $ from "jquery";
window.$ = window.jQuery = $;

// Create a root
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function loadCSSAsync(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.media = "print"; // Load in the background
  link.onload = function () {
    link.media = "all"; // Apply the styles once it's loaded
  };
  document.head.appendChild(link);
}

loadCSSAsync("./index.css");
loadCSSAsync("./responsive.css");
loadCSSAsync("bootstrap/dist/css/bootstrap.min.css");
loadCSSAsync("slick-carousel/slick/slick.css");
loadCSSAsync("slick-carousel/slick/slick-theme.css");
// Create a root

// Render your app
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
