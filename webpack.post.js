const path = require("path");
const CriticalCssPlugin = require("critical-css-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // For extracting CSS
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // For minifying CSS
const PostCSSPresetEnv = require("postcss-preset-env"); // PostCSS
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "static/js/[name].[contenthash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1, // Ensures postcss-loader is applied before css-loader
            },
          },
          {
            loader: "postcss-loader", // Add PostCSS loader
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env", // For autoprefixing and browser compatibility
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(), // Minifies CSS
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "build/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      scriptLoading: "defer", // Defer loading of scripts
      inject: false, // Disable automatic injection of scripts
    }),

    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css", // Separate CSS files
    }),
    new CriticalCssPlugin({
      base: path.resolve(__dirname, "build"),
      src: "index.html",
      target: "index.html",
      inline: true, // Inline critical CSS
      extract: true, // Extract critical CSS
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      },
    }),
  ],
};
