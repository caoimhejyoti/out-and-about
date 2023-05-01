import React, { useRef, useEffect, useState } from "react";
import { ReactDOM } from "react";
import mapboxgl from "mapbox-gl";
import geoJSON from "./map-data/mandurah-foreshore.json";

import "./../../style/map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FvaW1oZWp5b3RpIiwiYSI6ImNsaDM1OTdoNzFqdHczY3BudXd0d3M4enMifQ.862ifcHz_-veRJKGrWjwQw";

export default function MandurahMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(115.7187);
  const [lat, setLat] = useState(-32.533499);
  const [zoom, setZoom] = useState(13);
  const [projection, setProjection] = useState("globe");

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      projection: projection,
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
