import React, { useState } from "react";
import PropTypes from "prop-types";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const StyledMap = ({
  latitude,
  longitude,
  zoom = 14,
  markerLabel,
  height = 400,
  errorMessage = "Map not available",
  apiKey,
}) => {
  const [currentZoom, setCurrentZoom] = useState(zoom);

  // Convert latitude and longitude to numbers
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  const handleZoomChange = (delta) => {
    setCurrentZoom((prevZoom) => Math.max(0, prevZoom + delta));
  };

  return (
    <div className="map-container">
      {lat && lng ? (
        <>
          <APIProvider apiKey={apiKey}>
            <Map
              style={{ width: "100%", height: `${height}px` }}
              defaultCenter={{ lat, lng }}
              zoom={currentZoom}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              <Marker position={{ lat, lng }} title={markerLabel} />
            </Map>
          </APIProvider>
          <div className="zoom-controls">
            <button onClick={() => handleZoomChange(1)}>+</button>
            <button onClick={() => handleZoomChange(-1)}>-</button>
          </div>
        </>
      ) : (
        <div className="map-error">{errorMessage}</div>
      )}
      <style>
        {`
          .map-container {
            position: relative;
            width: 100%;
            height: ${height}px;
          }
          .map-error {
            display: flex;
            align-items: center;
            justify-content: center;
            height: ${height}px;
            background-color: #f8f9fa;
            color: #dc3545;
            font-size: 18px;
            font-weight: bold;
            border: 2px solid #dc3545;
            border-radius: 5px;
          }
          .zoom-controls {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            flex-direction: column;
          }
          .zoom-controls button {
            background-color: #fff;
            border: 1px solid #ccc;
            padding: 5px 10px;
            cursor: pointer;
            margin-bottom: 5px;
            border-radius: 0px;
            font-size: 18px;
                font-family: 'Red Hat Display';
    font-weight: bold;
          }
          .zoom-controls button:hover {
            background-color: #f0f0f0;
          }
        `}
      </style>
    </div>
  );
};

StyledMap.propTypes = {
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  zoom: PropTypes.number,
  markerLabel: PropTypes.string,
  height: PropTypes.number,
  errorMessage: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
};

export default StyledMap;
