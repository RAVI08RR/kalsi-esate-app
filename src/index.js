import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "./responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "core-js/stable";
import "regenerator-runtime/runtime";

import { Provider } from "react-redux";
import store from "./redux/store";
import $ from "jquery";
window.$ = window.jQuery = $;

const App = React.lazy(() => import("./App"));
// Create a root
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function loadCSSAsync(href) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = "style";
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
  <React.Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.Suspense>
);
