import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);

const assets = {
  grass: (x, y) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.userData = { id: "grass" };

    mesh.position.set(x, -0.5, y);
    return mesh;
  },
  "building-1": (x, y) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x777777 });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.userData = { id: "building-1" };

    mesh.position.set(x, 0.5, y);
    return mesh;
  },
  "building-2": (x, y) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x777777 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1, 2, 1);

    mesh.userData = { id: "building-2" };

    mesh.position.set(x, 1, y);
    return mesh;
  },
  "building-3": (x, y) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x777777 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1, 3, 1);

    mesh.userData = { id: "building-3" };

    mesh.position.set(x, 1.5, y);
    return mesh;
  },
};

export function createAssetInstance(assetId, x, y) {
  if (!(assetId in assets)) {
    console.warn(`Asset Id ${assetId} is not found.`); // Log warning for invalid asset ID
    return null; // Return null if the asset ID is invalid
  }

  const mesh = assets[assetId](x, y);
  if (mesh) {
    mesh.userData = { id: assetId }; // Ensure the mesh has a valid id
  }

  return mesh;
}
