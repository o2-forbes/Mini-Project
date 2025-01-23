import { createScene } from "./scene.js"; // Ensure .js extension is included
import { createCity } from "./city.js"; // Ensure .js extension is included

export function createGame() {
  const scene = createScene();
  const city = createCity(16);
  city.initialise(); // Make sure to call this to populate the city data
  scene.initialise(city);

  scene.onObjectSelected = (selectedObject) => {
    console.log(selectedObject);

    let { x, y } = selectedObject.userData;
    const tile = city.data[x][y];
    console.log(tile);
  };

  // Move the event listeners and start call inside the createGame function
  document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);
  document.addEventListener("mouseup", scene.onMouseUp.bind(scene), false);
  document.addEventListener("mousemove", scene.onMouseMove.bind(scene), false);
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
