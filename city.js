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
            const x = Math.random();
            if (x < 0.01) {
              if (this.building === undefined) {
                this.building = "building-1";
              } else if (this.building === "building-1") {
                this.building = "building-2";
              } else if (this.building === "building-2") {
                this.building = "building-3";
              }
            }
          },
        };

        column.push(tile);
      }
      data.push(column);
    }
  }

  initialise(); // Ensure this is called to populate data

  function update() {
    console.log(`Updating city`); // Use backticks for template literals
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        data[x][y].update();
      }
    }
  }

  return { size, data, initialise, update }; // Include update in the returned object
}
