export function createCity(size) {
  const data = [];

  function initialise() {
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const tile = {
          x,
          y,
          buildingId: "grass", // Default to "grass" instead of undefined
          update() {
            const rand = Math.random();
            if (rand < 0.01) {
              if (this.buildingId === "grass") {
                this.buildingId = "building-1";
              } else if (this.buildingId === "building-1") {
                this.buildingId = "building-2";
              } else if (this.buildingId === "building-2") {
                this.buildingId = "building-3";
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
    console.log(`Updating city`);
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        data[x][y].update();
      }
    }
  }

  return { size, data, initialise, update };
}
