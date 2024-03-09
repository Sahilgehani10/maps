import React from 'react'
import { useEffect } from 'react'
import "leaflet-routing-machine"
import L, { map } from 'leaflet'
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import { useMap } from 'react-leaflet'
import { useState } from 'react'
import axios from 'axios'

const Llrouting = () => {
    var x=0;
    const map=useMap();
    const [currLoc,setcurrLoc]=useState({});
    useEffect(()=>{
        getLocation() 
    },[])
    const getLocation=async()=>{
        const location=await axios.get('https://ipapi.co/json')
        
        setcurrLoc(location.data)
        console.log(location.data.latitude)
        
    }
    
    useEffect(()=>{
        var marker1=L.marker()
        
        map.on("click",function(e)
        {
            if(x==0)
            {
            L.marker([e.latlng.lat,e.latlng.lng]).addTo(map)
            x++;
            }
            else{
                L.mar
            }
        L.Routing.control({
            waypoints:[L.latLng(19.0645, 72.8359),L.latLng(e.latlng.lat,e.latlng.lng)],
            lineOptions:{
                styles:[{
                    color:"blue",
                    weight:6,
                    opacity:0.7,
                }]
            },
            routeWhileDragging:false,
            geocoder:L.Control.Geocoder.nominatim(),
            addWaypoints:true,
            draggableWaypoints:false,
            fitSelectedRoutes:true,
            showAlternatives:false,
        })
        .on("routesfound",function(e){
            e.routes[0].coordinates.forEach((c,i)=>{
                setTimeout(()=>{
                    marker1.setLatLng([c.lat,c.lng])
                },100*i)
            })
        })
        .addTo(map)
    })
    },[])
    
  return (
    null
  )
}

export default Llrouting