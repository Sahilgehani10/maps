import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import Navbar from './Navbar';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ';

const Map = () => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const newMap = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [longitude, latitude],
          zoom: 12
        });

        newMap.addControl(new mapboxgl.NavigationControl());

        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
        });

        newMap.addControl(directions, 'top-right');
        setDirections(directions);

        newMap.on('load', () => {
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
    const categories = ['restaurant', 'lodging', 'gas_station', 'tourist_attraction'];

    categories.forEach(category => {
      const bounds = map.getBounds();
      const bbox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth()
      ];

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

          map.addLayer({
            id: category,
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: features
              }
            },
            paint: {
              'circle-radius': 6,
              'circle-color': category === 'restaurant' ? '#ff0000' :
                category === 'lodging' ? '#0000ff' :
                  category === 'gas_station' ? '#00ff00' :
                    '#000000'
            }
          });

          map.on('mouseenter', category, (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.title;

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map);
          });

          map.on('mouseleave', category, () => {
            map.getCanvas().style.cursor = '';
          });
        })
        .catch(error => console.error('Error fetching places:', error));
    });
  };

  return (
    <div>
      <Navbar />
      <div id="map" style={{ width: '100%', height: '110vh' }} />
    </div>
  );
};

export default Map;
