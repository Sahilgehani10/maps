import React from 'react'
import Globe from 'react-globe.gl'
import Navbar from './Navbar'

const Home = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <h1 className='position:absolute top-0 left-0 right-0 text-center z-10'>JOURNIFY</h1>
      <Globe showGlobe={true} globeImageUrl={"//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"} style={{ position: 'relative', zIndex: '1' }} />
    </div>
  )
}

export default Home
