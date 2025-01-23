import { createScene } from "./scene.js"; // Ensure .js extension is included
import { createCity } from "./city.js"; // Ensure .js extension is included

export function createGame() {
  const scene = createScene();
  const city = createCity(8);
  city.initialise(); // Make sure to call this to populate the city data
  scene.initialise(city);

  // Move the event listeners and start call inside the createGame function
  document.addEventListener("mousedown", scene.onMouseDown, false);
  document.addEventListener("mouseup", scene.onMouseUp, false);
  document.addEventListener("mousemove", scene.onMouseMove, false);
  document.addEventListener(
    "contextmenu",
    (event) => event.preventDefault(),
    false
  );

  // Start rendering the scene
  scene.start();
}
