import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);

const assets = {
  grass: (x, y) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: "grass", x, y };
    mesh.position.set(x, -0.5, y);
    return mesh;
  },
  "residential": (x, y) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: "residential", x, y };
    mesh.position.set(x, 0.5, y);
    return mesh;
  },
  "commercial": (x, y) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1, 2, 1);
    mesh.userData = { id: "commercial", x, y };
    mesh.position.set(x, 0.5, y);
    return mesh;
  },
  "industrial": (x, y) => {
    const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1, 3, 1);
    mesh.userData = { id: "industrial", x, y };
    mesh.position.set(x, 0.5, y);
    return mesh;
  },
  "road": (x, y) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x444440 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1, 2, 1);
    mesh.userData = { id: "road", x, y };
    mesh.position.set(x, 0.5, y);
    return mesh;
  },
};

export function createAssetInstance(assetId, x, y) {
  if (!(assetId in assets)) {
    console.warn(`Asset Id ${assetId} is not found.`); // Corrected string interpolation
    return null; // Return null if the asset ID is invalid
  }

  const mesh = assets[assetId](x, y);
  if (mesh) {
    mesh.userData = { id: assetId }; // Ensure the mesh has a valid id
  }

  return mesh;
}
