export function createCity(size) {
  const data = [];

  function initialise() {
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const tile = createTile(x, y); // Corrected syntax
        column.push(tile); // Add tile to column
      }
      data.push(column); // Add column to data
    }
  }

  initialise(); // Ensure this is called to populate data

  function update() {
    console.log(`Updating city`);
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        data[x][y].update(); // Update each tile
      }
    }
  }

  return { size, data, initialise, update };
}

function createTile(x, y) {
  return {
    x,
    y,
    terrainId: "grass", // Default terrain
    buildingId: "grass", // Default building
    update() {
      const rand = Math.random();
      if (rand < 0.01) {
        // Chance to upgrade the building
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
}
