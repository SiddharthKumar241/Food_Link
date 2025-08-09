// Initialize AOS for animations
AOS.init();

// Three.js Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Create a rotating cube for background animation
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

// Event Listeners for Category Selection
document.getElementById('food-btn').addEventListener('click', () => {
  showDonationDetails('Food');
});

document.getElementById('clothing-btn').addEventListener('click', () => {
  showDonationDetails('Clothing');
});

document.getElementById('medicine-btn').addEventListener('click', () => {
  showDonationDetails('Medicine');
});

document.getElementById('others-btn').addEventListener('click', () => {
  showDonationDetails('Others');
});

// Function to show donation details
function showDonationDetails(category) {
  const donationDetailsDiv = document.getElementById('donation-details');
  donationDetailsDiv.style.display = 'block';
  donationDetailsDiv.innerHTML = `<h3>You're donating ${category}</h3><p>Fill out the form to proceed with your donation of ${category}.</p>`;
}

// Search Button to Find Needy People
document.getElementById('search-btn').addEventListener('click', () => {
  alert('Searching for people in need around you...');
});
