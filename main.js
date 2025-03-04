import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { db, collection, getDocs } from './firebase-config.js';

// Setup Scene, Camera, Renderer
const scene = new THREE.Scene();

// 🌌 **Fix: Load Background Image Properly**
const textureLoader = new THREE.TextureLoader();
textureLoader.load('stars.jpg', (texture) => {
    scene.background = texture;
    console.log("✅ Background texture loaded successfully.");
}, undefined, (error) => {
    console.error("❌ Error loading background texture:", error);
});

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 50, 300);
controls.update();

// 💡 **Fix: Add Ambient Light for Visibility**
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 🌞 **Fix: Make the Sun Emit Light**
const light = new THREE.PointLight(0xffffff, 3, 1000);
light.position.set(0, 0, 0);
scene.add(light);

const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    emissive: 0xffff00, // 🔥 Sun emits light
    emissiveIntensity: 2
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// ⭐ **Add Stars to the Scene**
function addStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8 });

    const starVertices = [];
    for (let i = 0; i < 2000; i++) {  // Generate 2000 stars
        const x = (Math.random() - 0.5) * 2000; // Spread stars randomly
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

addStars(); // Call function to generate stars

// Planets Array
const planetMeshes = [];

// ✅ **Fetch Planet Data from Firestore**
async function fetchPlanets() {
    const querySnapshot = await getDocs(collection(db, "solarConfigurations"));

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`✅ Loaded ${data.name} from Firestore`, data);

        // 🎨 **Fix: Correctly Convert Color**
        let color;
        try {
            color = new THREE.Color(data.color); // Correct way to apply hex colors
        } catch (error) {
            console.error(`❌ Invalid color for ${data.name}, using white.`, error);
            color = new THREE.Color(0xffffff); // Default to white
        }

        // Create a planet
        const geometry = new THREE.SphereGeometry(Math.max(data.radius / 3000, 0.5), 32, 32);
        const material = new THREE.MeshStandardMaterial({ 
            color: color, // ✅ Corrected color assignment
            metalness: 0.4, // 🌍 Reflective surface for realism
            roughness: 0.6 
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Ensure planets have a unique position
        mesh.position.x = (data.distanceFromSun + Math.random() * 10) / 2;
        scene.add(mesh);

        // Store all planets correctly
        planetMeshes.push({
            mesh,
            name: data.name,
            distance: data.distanceFromSun / 2,
            speed: (2 * Math.PI) / (data.orbitalPeriod * 1500),
            angle: Math.random() * Math.PI * 2
        });
    });

    console.log(`🌍 Total planets loaded: ${planetMeshes.length}`);
    animate(); // Start animation after all planets are added
}

// Animation Loop (Orbiting Planets)
function animate() {
    requestAnimationFrame(animate);
    
    planetMeshes.forEach(planet => {
        planet.angle += planet.speed;
        planet.mesh.position.x = planet.distance * Math.cos(planet.angle);
        planet.mesh.position.z = planet.distance * Math.sin(planet.angle);
    });

    controls.update();
    renderer.render(scene, camera);
}

// Fetch planets from Firebase
fetchPlanets();

// **Resize Handling**
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
