import React, { useEffect, useRef } from "react";
import BottomNav from "../components/BottomNav";

function MapView() {
  const mapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.59, lng: 78.96 },
      zoom: 6,
    });

    // CREATE SEARCH BAR ELEMENT
    const input = document.createElement("input");
    input.placeholder = "Search destination...";
    input.style.width = "500px";
    input.style.padding = "12px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "10px";
    input.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
    input.style.fontSize = "15px";
    input.style.outline = "none";
    input.style.background = "white";

    // ATTACH SEARCH BAR INSIDE GOOGLE MAP CONTROLS
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input);

    // Autocomplete
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);

    let userMarker = null;

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      map,
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      drawRoute(place.geometry.location);
    });

    const drawRoute = (destination) => {
      if (!userMarker) return;

      directionsService.route(
        {
          origin: userMarker.getPosition(),
          destination,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          }
        }
      );
    };

    // Locate User
    navigator.geolocation?.getCurrentPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      userMarker = new window.google.maps.Marker({
        map,
        position: coords,
        icon: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
      });

      map.setCenter(coords);
      map.setZoom(15);
    });
  }, []);

  return (
    <div className="page-wrapper" style={{ padding: 0 }}>
      {/* Map */}
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100vh" }}
      ></div>

      {/* Current Location Btn */}
      <button
        onClick={() => window.location.reload()}
        style={{
          position: "absolute",
          bottom: "110px",
          right: "15px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg,#ff5f6d,#ffc371)",
          color: "white",
          fontSize: "22px",
          boxShadow: "0 0 20px rgba(255,95,109,0.5)",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        ⦿
      </button>

      <BottomNav />
    </div>
  );
}

export default MapView;
