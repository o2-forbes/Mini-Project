import * as THREE from "three";

export function createCamera(gameWindow) {
  const LEFT_MOUSE_BUTTON = 0;
  const MIDDLE_MOUSE_BUTTON = 1;
  const RIGHT_MOUSE_BUTTON = 2;

  const MIN_CAMERA_RADIUS = 2;
  const MAX_CAMERA_RADIUS = 10;

  const Y_AXIS = new THREE.Vector3(0, 1, 0);

  const camera = new THREE.PerspectiveCamera(
    75,
    gameWindow.offsetWidth / gameWindow.offsetHeight,
    0.1,
    1000
  );
  let cameraRadius = 4;
  let cameraAzimuth = 0;
  let cameraElevation = 0;
  let isLeftMouseDown = false;
  let isRightMouseDown = false;
  let isMiddleMouseDown = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  // Moved `updateCameraPosition` to the top level
  function updateCameraPosition() {
    camera.position.x =
      cameraRadius *
      Math.sin((cameraAzimuth * Math.PI) / 180) *
      Math.cos((cameraElevation * Math.PI) / 180);
    camera.position.y =
      cameraRadius * Math.sin((cameraElevation * Math.PI) / 180);
    camera.position.z =
      cameraRadius *
      Math.cos((cameraAzimuth * Math.PI) / 180) *
      Math.cos((cameraElevation * Math.PI) / 180);
    camera.lookAt(0, 0, 0);
  }

  // Initialize the camera's position
  updateCameraPosition();

  function onMouseDown(event) {
    console.log("mousedown");
    if (event.button === LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = true;
    }
    if (event.button === MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = true;
    }
    if (event.button === RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = true;
    }
  }

  function onMouseUp(event) {
    console.log("mouseup");
    if (event.button === LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = false;
    }
    if (event.button === MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = false;
    }
    if (event.button === RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = false;
    }
  }

  function onMouseMove(event) {
    console.log("mousemove");

    const deltaX = event.clientX - prevMouseX;
    const deltaY = event.clientY - prevMouseY;

    // Handle rotation of the camera
    if (isLeftMouseDown) {
      cameraAzimuth += -(deltaX * 0.5);
      cameraElevation += deltaY * 0.5;
      cameraElevation = Math.min(90, Math.max(-90, cameraElevation)); // Allow negative elevation
      updateCameraPosition();
    }

    // Handle zooming of the camera
    if (isRightMouseDown) {
      cameraRadius += deltaY * 0.02;
      cameraRadius = Math.min(
        MAX_CAMERA_RADIUS,
        Math.max(MIN_CAMERA_RADIUS, cameraRadius)
      );
      updateCameraPosition();
    }

    // Handle panning of the camera (future implementation)
    if (isMiddleMouseDown) {
      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
        Y_AXIS,
        (cameraAzimuth * Math.PI) / 180
      );
      const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(
        Y_AXIS,
        (cameraAzimuth * Math.PI) / 180
      );
    }

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
  }

  return {
    camera,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
}
