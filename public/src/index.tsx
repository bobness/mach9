import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

/*
  TODO:  Incorporate geospatial analysis or visualization into the application, 
  such as identifying clusters of structurally deficient bridges or creating an 
  interactive map that displays bridge locations and attributes. 
  
  This will not only help convey the insights generated from the data, 
  but also demonstrate your ability to work across the full stack and create 
  a more engaging user experience.
*/

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
