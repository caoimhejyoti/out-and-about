import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import geoJSON from "./map-data/uwa-grad.json";
import geoJSONroutes from "./map-data/uwa-grad-routes.json";
import Tooltip from "@mui/material/Tooltip";
import { Typography, styled, Paper } from "@mui/material";

// import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';

// import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'; // Load worker code separately with worker-loader

// mapboxgl.workerClass = MapboxWorker; // Wire up loaded worker to be used instead of the default

import "./../../style/map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FvaW1oZWp5b3RpIiwiYSI6ImNsaDM1OTdoNzFqdHczY3BudXd0d3M4enMifQ.862ifcHz_-veRJKGrWjwQw";

const Marker = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(feature.properties.name);
  };

  const name = feature.properties.name;

  return (
    <Tooltip title={name} placement="top">
      <button onClick={_onClick} className="marker">
        {children}
      </button>
    </Tooltip>
  );
};

export default function UWAMap() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(115.819156176);
  const [lat, setLat] = useState(-31.97995);
  const [zoom, setZoom] = useState(14);
  // const [projection, setProjection] = useState("globe");

  const waypoints = geoJSONroutes.features[0].geometry.coordinates;

  useEffect(() => {
    function getRoutes() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            fetch(
              `https://api.mapbox.com/directions/v5/mapbox/walking/${waypoints[0][0]},${waypoints[0][1]};${waypoints[1][0]},${waypoints[1][1]},${waypoints[1][0]},${waypoints[1][1]};${waypoints[2][0]},${waypoints[2][1]},${waypoints[2][0]},${waypoints[2][1]};${waypoints[3][0]},${waypoints[3][1]},${waypoints[3][0]},${waypoints[3][1]};${waypoints[4][0]},${waypoints[4][1]}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1IjoiY2FvaW1oZWp5b3RpIiwiYSI6ImNsaDM1OTdoNzFqdHczY3BudXd0d3M4enMifQ.862ifcHz_-veRJKGrWjwQw`
            )
              .then((response) => response.json())
              .catch((err) => console.error(err))
          );
        }, 1000);
      });
    }

    getRoutes().then((data) => {
      const route = data.routes[0].geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
      console.log(route);
    });

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      // projection: projection,
    });

    // Create default markers
    geoJSON.features.forEach((feature) => {
      const ref = React.createRef();
      ref.current = document.createElement("div");

      ReactDOM.render(
        <Marker feature={feature} />,

        ref.current
      );
      new mapboxgl.Marker(ref.current)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    });
    return () => map.remove();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Item>
        <Typography gutterBottom variant="h5">
          My Quest
        </Typography>
        <hr />
        <div ref={mapContainer} className="map-container" />
      </Item>
    </div>
  );
}
