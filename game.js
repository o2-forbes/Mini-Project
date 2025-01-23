import { createScene } from "./scene.js"; // Ensure .js extension is included
import { createCity } from "./city.js"; // Ensure .js extension is included

export function createGame() {
  const scene = createScene();
  const city = createCity(16);
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

  const game = {
    update() {
      city.update();
      scene.update(city);
    },
  };

  setInterval(() => {
    game.update();
  }, 1000);

  // Start rendering the scene
  scene.start();

  return game;
}
