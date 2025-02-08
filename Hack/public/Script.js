function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        document.getElementById("status").innerText = "Geolocation is not supported by this browser.";
    }
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const userId = 2023095; // Replace with actual user ID

    document.getElementById("status").innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;

    fetch('/store-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name: "Food_Needy", latitude, longitude })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function error() {
    document.getElementById("status").innerText = "Unable to retrieve your location.";
}