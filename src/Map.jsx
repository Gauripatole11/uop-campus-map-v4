import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet

const zoom = 13;
const regionCoord = [37.9799, -121.3129];
const additionalMarkerCoord = [37.9817, -121.312];

// Create custom icons for different categories
const icons = {
  Makerspace: L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
  }),
  "Study Rooms": L.icon({
    iconSize: [30, 30], // Adjust the size as needed
    iconAnchor: [15, 15], // Adjust the anchor point as needed
    popupAnchor: [0, -15], // Adjust the popup anchor as needed
    iconUrl:
      "https://www.pngall.com/wp-content/uploads/12/Red-Star-Shape-PNG-File.png"
  }),
  LABS: L.icon({
    iconSize: [30, 30], // Adjust the size as needed
    iconAnchor: [15, 15], // Adjust the anchor point as needed
    popupAnchor: [0, -15], // Adjust the popup anchor as needed
    iconUrl:
      "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7810468/map-marker-pin-clipart-md.png"
  })
};

const markers = [
  {
    position: regionCoord,
    category: "Makerspace",
    name: "Makerspace Location",
    hours: "9 AM - 5 PM",
    phone: "123-456-7890"
  },
  {
    position: additionalMarkerCoord,
    category: "Study Rooms",
    name: "Study Rooms Location",
    hours: "8 AM - 6 PM",
    phone: "987-654-3210"
  },
  {
    position: [37.9789, -121.3111],
    category: "Study Rooms",
    name: "Another Study Room",
    hours: "7 AM - 9 PM",
    phone: "555-555-5555"
  },
  {
    position: [37.979751, -121.309154],
    category: "Study Rooms",
    name: "Yet Another Study Room",
    hours: "10 AM - 8 PM",
    phone: "444-444-4444"
  },
  {
    position: [37.9789, -121.3111],
    category: "LABS",
    info: "Lab Location"
  },
  {
    position: [37.980156, -121.310679],
    category: "LABS",
    info: "Another Lab Location"
  },
  {
    position: [37.980155, -121.311378],
    category: "LABS",
    info: "Yet Another Lab Location"
  },
  {
    position: [37.976279, -121.31183],
    category: "LABS",
    info: "Additional Lab Location"
  },
  {
    position: [37.976586, -121.314124],
    category: "LABS",
    info: "Yet Another LABS Location"
  }
]; // Added the additional LABS marker

function Map() {
  const [map, setMap] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  function FlyToButton() {
    const onClick = () => {
      map.flyTo(regionCoord, zoom);
    };

    return <Button onClick={onClick}>Add marker on click</Button>;
  }

  // Filter markers based on the selected category
  const filteredMarkers = selectedCategory
    ? markers.filter((marker) => marker.category === selectedCategory)
    : markers;

  const sidebarStyles = {
    background: "#f0f0f0",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "5px"
  };

  // Custom CSS styles for buttons
  const buttonStyles = {
    marginBottom: "10px",
    width: "100%",
    textAlign: "left"
  };

  const makerspaceButtonStyles = {
    ...buttonStyles,
    background: "blue", // Add your desired background color
    color: "white"
  };

  const studyRoomsButtonStyles = {
    ...buttonStyles,
    background: "green", // Add your desired background color
    color: "white"
  };

  const labsButtonStyles = {
    ...buttonStyles,
    background: "orange", // Add your desired background color
    color: "white"
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        {/* Sidebar with category buttons */}
        <div style={sidebarStyles}>
          <h2>Categories</h2>
          <Button
            style={makerspaceButtonStyles}
            onClick={() => setSelectedCategory("Makerspace")}
          >
            Makerspace
          </Button>
          <Button
            style={studyRoomsButtonStyles}
            onClick={() => setSelectedCategory("Study Rooms")}
          >
            Study Rooms
          </Button>
          <Button
            style={labsButtonStyles}
            onClick={() => setSelectedCategory("LABS")}
          >
            LABS
          </Button>
          <Button
            style={buttonStyles}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
        </div>
      </Grid>
      <Grid item xs={10}>
        <MapContainer
          center={regionCoord}
          zoom={zoom}
          style={{ height: "90vh" }}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Display filtered markers */}
          {filteredMarkers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={icons[marker.category]} // Use the appropriate icon based on the category
            >
              {/* Customize the Popup content */}
              <Popup>
                <div>
                  <h3>{marker.name}</h3>
                  <p>Category: {marker.category}</p>
                  <p>Hours: {marker.hours}</p>
                  <p>Phone: {marker.phone}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Grid>
      <FlyToButton />
    </Grid>
  );
}

export default Map;
