import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { CheckCircle, ChevronDown, ChevronUp, Menu, Star, X } from 'lucide-react'
import { Link } from "react-router-dom";
import Geocoder from "./LocGeocoder";
import Llrouting from "./Llrouting";
import axios from "axios";
import "./Maps.css";
import { data } from "autoprefixer";
import Navbar from "./Navbar";
const Maps = () => {
  const [currLoc, setcurrLoc] = useState({});
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const menuItems = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'About',
      href: '/',
    },
    {
      name: 'Maps',
      href: 'maps',
    },
    {
      name: 'Blogs',
      href: '',
    },
  ]

  var requestOptions = {
    method: "GET",
  };

  // fetch(
  //   "https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=623cbbb2f4fa4e58a115574dee763b2c",
  //   requestOptions
  // )
  //   .then((response) => response.json())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));

  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");

    setcurrLoc(location.data);
  };
  // const center = [currLoc.latitude, currLoc.longitude];

  return (
    <div>
      <Navbar />
      
    <div className="bg-bgcolor h-[100vh] pt-20">
      <MapContainer
        id="container"
        className="h-[85vh]  mx-10 rounded-lg border border-accent "
        center={[19.0645, 72.8359]}
        zoom={35}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*<Geocoder />*/}

        <Llrouting /> 
      </MapContainer>
    </div>
    </div>
  );
};

export default Maps;
