import * as THREE from "three";
import { createCamera } from "./camera.js";

export function createScene() {
  // Initial scene setup
  const gameWindow = document.getElementById("render-target");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);

  const camera = createCamera(gameWindow);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  gameWindow.appendChild(renderer.domElement);

  let meshes = [];

  function initialise(city) {
    scene.clear();
    meshes = [];

    for (let x = 0; x < city.size; x++) {
      const column = [];
      for (let y = 0; y < city.size; y++) {
        //Grass geometry
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, -0.5, y);
        scene.add(mesh);
        column.push(mesh);

        //Building geometry
        const tile = city.data[x][y];

        if (tile.building === "building") {
          const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
          const buildingMaterial = new THREE.MeshLambertMaterial({
            color: 0x777777,
          });
          const buildingMesh = new THREE.Mesh(
            buildingGeometry,
            buildingMaterial
          );
          buildingMesh.position.set(x, 0.5, y);
          scene.add(buildingMesh);
          column.push(buildingMesh);
        }
      }
      meshes.push(column);
    }

    setupLights();
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
    start,
    stop,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
}
