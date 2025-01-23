export function createCity(size) {
  const data = [];

  function initialise() {
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const tile = {
          x,
          y,
          building: undefined,
          update() {
            console.log(`updating tile ${this.x}, ${this.y}`); // Use backticks for template literals
          },
        };

        if (Math.random() > 0.7) {
          tile.building = "building";
        }
        column.push(tile);
      }
      data.push(column);
    }
  }

  initialise(); // Ensure this is called to populate data

  function update() {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        data[x][y].update();
      }
    }
  }

  return { size, data, initialise, update }; // Include update in the returned object
}
