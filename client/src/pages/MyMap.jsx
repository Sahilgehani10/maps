import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import Navbar from "./Navbar";
import "./MyMap.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ";

const Map = () => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [visibleCategories, setVisibleCategories] = useState([]);

  useEffect(() => {
    const initializeMap = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const newMap = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [longitude, latitude],
          zoom: 12,
        });

        newMap.addControl(new mapboxgl.NavigationControl());

        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
        });

        newMap.addControl(directions, "top-right");
        setDirections(directions);

        newMap.on("load", () => {
          fetchNearbyPlaces(newMap);
        });

        setMap(newMap);
      });
    };

    if (!map) {
      initializeMap();
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  const fetchNearbyPlaces = (map) => {
    const categories = [
      "restaurant",
      "lodging",
      "gas_station",
      "tourist_attraction",
    ];

    categories.forEach((category) => {
      const bounds = map.getBounds();
      const bbox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ];

      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${category}.json?bbox=${bbox.join(
          ","
        )}&access_token=${mapboxgl.accessToken}`
      )
        .then((response) => response.json())
        .then((data) => {
          const features = data.features.map((feature) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: feature.geometry.coordinates,
            },
            properties: {
              title: feature.text,
              category: category,
            },
          }));

          map.addLayer({
            id: category,
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: features,
              },
            },
            paint: {
              "circle-radius": 6,
              "circle-color": getCategoryColor(category),
            },
            layout: {
              visibility: visibleCategories.includes(category)
                ? "visible"
                : "none",
            },
          });

          map.on("mouseenter", category, (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.title;

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map);
          });

          map.on("mouseleave", category, () => {
            map.getCanvas().style.cursor = "";
          });
        })
        .catch((error) => console.error("Error fetching places:", error));
    });
  };

  const toggleCategory = (category) => {
    const updatedCategories = visibleCategories.includes(category)
      ? visibleCategories.filter((c) => c !== category)
      : [...visibleCategories, category];
    setVisibleCategories(updatedCategories);
    updateLayerVisibility(category);
  };

  const updateLayerVisibility = (category) => {
    if (map) {
      const visibility = visibleCategories.includes(category)
        ? "visible"
        : "none";
      map.setLayoutProperty(category, "visibility", visibility);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "restaurant":
        return "#ff0000";
      case "lodging":
        return "#0000ff";
      case "gas_station":
        return "#00ff00";
      case "tourist_attraction":
        return "#000000";
      default:
        return "#000000";
    }
  };

  return (
    <div>
      <Navbar />
      <div id="map" style={{ width: "100%", height: "85vh" }} />
      <div className="category-buttons">
        <button
          className="category-button"
          onClick={() => toggleCategory("restaurant")}
        >
          Restaurants
        </button>
        <button
          className="category-button"
          onClick={() => toggleCategory("lodging")}
        >
          Lodging
        </button>
        <button
          className="category-button"
          onClick={() => toggleCategory("gas_station")}
        >
          Gas Stations
        </button>
        <button
          className="category-button"
          onClick={() => toggleCategory("tourist_attraction")}
        >
          Tourist Attractions
        </button>
      </div>
    </div>
  );
};

export default Map;
