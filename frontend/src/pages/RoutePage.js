import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function RoutePage() {
  const mapRef = useRef(null);
  const map = useRef(null);
  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const google = window.google;
    if (!google) {
      alert("Google Maps failed to load");
      return;
    }

    map.current = new google.maps.Map(mapRef.current, {
      center: { lat: 17.3850, lng: 78.4867 },
      zoom: 14,
    });

    directionsService.current = new google.maps.DirectionsService();
    directionsRenderer.current = new google.maps.DirectionsRenderer({
      suppressMarkers: false,
      preserveViewport: true,
    });

    directionsRenderer.current.setMap(map.current);

    // Autocomplete
    const input = document.getElementById("route-input");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map.current);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;
      setDestination(place.formatted_address);
    });
  }, []);

  const showRoute = () => {
    if (!destination) {
      alert("Please enter a destination");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const origin = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      directionsService.current.route(
        {
          origin,
          destination,
          travelMode: "WALKING",
        },
        (result, status) => {
          if (status === "OK") {
            directionsRenderer.current.setDirections(result);
          } else {
            alert("Error: " + status);
          }
        }
      );
    });
  };

  return (
    <div style={{ padding: "10px", fontFamily: "Arial" }}>
      <div
        style={{
          textAlign: "center",
          padding: "15px",
          background: "#3498db",
          color: "white",
          borderRadius: "10px",
          marginBottom: "15px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        SafeSpace – Safe Route
      </div>

      <button
        onClick={() => navigate(-1)}
        style={{
          background: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        ⬅ Back
      </button>

      <input
        id="route-input"
        placeholder="Enter destination"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={showRoute}
        style={{
          width: "100%",
          padding: "12px",
          background: "#3498db",
          color: "white",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "12px",
          cursor: "pointer",
        }}
      >
        Show Safe Route
      </button>

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "10px",
          border: "1px solid #ccc",
        }}
      ></div>
      <BottomNav />

    </div>
  );
}

export default RoutePage;
