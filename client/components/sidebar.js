import React from 'react'

const Sidebar = props => {
  //   const deselectAlbum = props.deselectAlbum

  return (
    <div id="sidebar">
      <img
        src="https://image.shutterstock.com/image-illustration/vintage-jukebox-front-view-3d-260nw-1200589231.jpg"
        id="logo"
      />
      <br />
      <br />
      <a href="#" className="sidebar-link">
        Playlists
      </a>
      <br />
      <br />
      <a href="#" className="sidebar-link">
        Profile
      </a>
    </div>
  )
}
export default Sidebar
