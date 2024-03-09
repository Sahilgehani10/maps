import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MyMap.css'

function MyMap() {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || mapContainer.current._leaflet_id === undefined) {
      const initialState = {
        lng: 10,
        lat: 10,
        zoom: 5
      };

      const map = L.map(mapContainer.current).setView([initialState.lat, initialState.lng], initialState.zoom);

      // Add attribution for Geoapify and OpenStreetMap
      map.attributionControl.setPrefix('').addAttribution('Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>');

      const myAPIKey = 'bb8a5d42ced64a7f94fec2c3d281c017';
      const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';

      // Add Geoapify tile layer with custom style and API key
     
     fetch(`https://api.geoapify.com/v2/place-details?lat=19.182990523648954&lon=72.9729257983017&features=radius_500,radius_500.restaurant,walk_10,drive_5,walk_10.restaurant,walk_10.playground,drive_5.supermarket,drive_5.shopping_mall,drive_5.fuel,drive_5.parking&apiKey=bb8a5d42ced64a7f94fec2c3d281c017`).then((res)=>res.json).then((data) => console.log(data));
     
    }
  }, []);

  return (
    <div className="map-container" ref={mapContainer}></div>
  );
}

export default MyMap;
