import * as THREE from "three";
import { createCamera } from "./camera.js";
import { createAssetInstance } from "./assets.js";

export function createScene() {
  // Initial scene setup
  const gameWindow = document.getElementById("render-target");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);

  const camera = createCamera(gameWindow);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  gameWindow.appendChild(renderer.domElement);

  let terrain = [];
  let buildings = [];

  function initialise(city) {
    scene.clear();
    terrain = [];
    buildings = Array.from({ length: city.size }, () =>
      Array(city.size).fill(null)
    ); // Fix here

    for (let x = 0; x < city.size; x++) {
      const column = [];
      for (let y = 0; y < city.size; y++) {
        const mesh = createAssetInstance("grass", x, y);

        scene.add(mesh);
        column.push(mesh);
      }
      terrain.push(column);
    }

    setupLights();
  }

  function update(city) {
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        // Building geometry
        const tile = city.data[x][y];

        if (tile.building && tile.building.startsWith("building")) {
          const mesh = createAssetInstance(tile.building, x, y);

          if (buildings[x][y]) {
            scene.remove(buildings[x][y]);
          }
          scene.add(mesh); // Use 'mesh' here
          buildings[x][y] = mesh; // Update the 'buildings' array
        }
      }
    }
  }

  function setupLights() {
    const lights = [
      new THREE.AmbientLight(0xffffff, 0.2),
      new THREE.DirectionalLight(0xffffff, 0.3),
      new THREE.DirectionalLight(0xffffff, 0.3),
      new THREE.DirectionalLight(0xffffff, 0.3),
    ];

    lights[1].position.set(0, 1, 0);
    lights[2].position.set(1, 1, 0);
    lights[3].position.set(0, 1, 1);

    scene.add(...lights);
  }

  function draw() {
    renderer.render(scene, camera.camera);
  }

  function start() {
    renderer.setAnimationLoop(draw);
  }

  function stop() {
    renderer.setAnimationLoop(null);

    // Clean up event listeners
    document.removeEventListener("mousedown", onMouseDown, false);
    document.removeEventListener("mouseup", onMouseUp, false);
    document.removeEventListener("mousemove", onMouseMove, false);
  }

  // Pass the event correctly to camera methods
  function onMouseDown(event) {
    camera.onMouseDown(event);
  }

  function onMouseUp(event) {
    camera.onMouseUp(event);
  }

  function onMouseMove(event) {
    camera.onMouseMove(event);
  }

  document.addEventListener(
    "contextmenu",
    (event) => {
      event.preventDefault(); // This prevents the context menu from appearing
    },
    false
  );

  // Add event listeners and pass the events to the camera functions
  document.addEventListener("mousedown", onMouseDown, false);
  document.addEventListener("mouseup", onMouseUp, false);
  document.addEventListener("mousemove", onMouseMove, false);

  // Handle resizing of the window
  window.addEventListener("resize", () => {
    const width = gameWindow.offsetWidth;
    const height = gameWindow.offsetHeight;
    camera.camera.aspect = width / height;
    camera.camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  return {
    initialise,
    update,
    start,
    stop,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
}
