let map;
let marker;

// Initialize the map
async function initMap() {
    console.log("init map is called")
    let lati = parseFloat(localStorage.getItem("lat")) || 0;
    let longi = parseFloat(localStorage.getItem("long")) || 0;

    if (lati === 0 && longi === 0) {
        console.log("Invalid lat/long. showing default location");
        lati = 28.6139;  // Default to New Delhi, India (example)
        longi = 77.2090;
    }

    // Load the Google Maps library dynamically
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: lati, lng: longi },
        zoom: 10,
    });

    marker = new google.maps.Marker({
        position: { lat: lati, lng: longi },
        map: map,
        icon: {
            url: "pin.png",
            scaledSize: new google.maps.Size(45, 45),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(22, 42),
        },
    });
}

// Event Listener for "My Location" Button
document.getElementById("myLocation").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                console.log("my location function ")
                // Update localStorage for consistency
                localStorage.setItem("lat", userLocation.lat);
                localStorage.setItem("long", userLocation.lng);

                // Ensure map is initialized before setting marker position
                if (map && marker) {
                    map.setCenter(userLocation);
                    marker.setPosition(userLocation);
                } else {
                    console.log("Map not initialized yet. Initializing now.");
                    initMap(); // Initialize map if not done already
                }
            },
            () => {
                alert("Failed to get your location.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});




