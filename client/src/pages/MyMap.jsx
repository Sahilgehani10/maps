import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import Geocoder from 'react-geocoder-autocomplete';
import Navbar from './Navbar';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ';

const Map = () => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      // Get user's location
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const newMap = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [longitude, latitude], // Set center to user's location
          zoom: 9
        });

        newMap.addControl(new mapboxgl.NavigationControl());

        // Add directions control
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          
        });

        newMap.addControl(directions, 'top-right');
        setDirections(directions);

        newMap.on('load', () => {
          // Fetch nearby places
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
    const radius = 5000;
    const categories = ['restaurant', 'lodging','gas_station'];

    // Throttle API calls
    let timeout;
    function throttleFetch() {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        categories.forEach(category => {
          map.addLayer({
            id: category,
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: []
              }
            },
            paint: {
              'circle-radius': 6,
              'circle-color': category === 'restaurant' ? '#ff0000' : 
              category === 'lodging' ? '#0000ff' : 
              '#00ff00'
            }
          });

          const bounds = map.getBounds();
          const bbox = [
            bounds.getWest(),
            bounds.getSouth(),
            bounds.getEast(),
            bounds.getNorth()
          ];

          // Fetch places within the current viewport
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${category}.json?bbox=${bbox.join(',')}&access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then(data => {
              const features = data.features.map(feature => ({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: feature.geometry.coordinates
                },
                properties: {
                  title: feature.text,
                  category: category
                }
              }));

              map.getSource(category).setData({
                type: 'FeatureCollection',
                features: features
              });
            })
            .catch(error => console.error('Error fetching places:', error));
        });
      }, 500); // Adjust the throttle time as needed
    }

    map.on('moveend', throttleFetch);
    throttleFetch(); // Initial fetch
  };

  return (
    <div>
      <Navbar />
      <div id="map" style={{ width: '100%', height: '110vh' }} />
      {directions && (
        <div>
          {/* <Geocoder
            mapboxApiAccessToken={mapboxgl.accessToken}
            mapRef={map}
            position="bottom-right"
            onResult={(result) => {
              directions.setOrigin(result.geometry);
            }}
          /> */}
          {/* <div id="directions" style={{ marginTop: '20px' }} /> */}
        </div>
      )}
    </div>
  );
};

export default Map;
