import { generate } from "critical";
import path from "path";
import fs from "fs";

// Define paths
const outputPath = path.resolve("build"); // Adjust this path if necessary
const inputHtml = path.join(outputPath, "index.html");

generate({
  inline: true,
  base: outputPath,
  src: "index.html",
  target: {
    html: "index-critical.html", // This will be the updated HTML file with inlined CSS
    css: "critical.css", // Optional: if you want to save critical CSS separately
  },
  width: 1300,
  height: 900,
})
  .then(({ css, html, uncritical }) => {
    console.log("Critical CSS generated!");

    // Optionally write the output files
    fs.writeFileSync(path.join(outputPath, "index-critical.html"), html);
    fs.writeFileSync(path.join(outputPath, "critical.css"), css);
  })
  .catch((err) => {
    console.error("Error generating critical CSS:", err);
  });
