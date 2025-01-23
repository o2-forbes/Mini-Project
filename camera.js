import * as THREE from "three";

export function createCamera(gameWindow) {
  const DEG2RAD = Math.PI / 180.0; // Convert degrees to radians
  const LEFT_MOUSE_BUTTON = 0;
  const MIDDLE_MOUSE_BUTTON = 1;
  const RIGHT_MOUSE_BUTTON = 2;

  const MIN_CAMERA_RADIUS = 2;
  const MAX_CAMERA_RADIUS = 10;

  const MIN_CAMERA_ELEVATION = 30;
  const MAX_CAMERA_ELEVATION = 90;

  const ROTATION_SENSITIVITY = 0.05;
  const ZOOM_SENSITIVITY = 0.02;
  const PAN_SENSITIVITY = -0.01;

  const Y_AXIS = new THREE.Vector3(0, 1, 0);

  const camera = new THREE.PerspectiveCamera(
    75,
    gameWindow.offsetWidth / gameWindow.offsetHeight,
    0.1,
    1000
  );
  let cameraOrigin = new THREE.Vector3(0, 1, 0);
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
      Math.sin(cameraAzimuth * DEG2RAD) *
      Math.cos(cameraElevation * DEG2RAD);
    camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD);
    camera.position.z =
      cameraRadius *
      Math.cos(cameraAzimuth * DEG2RAD) *
      Math.cos(cameraElevation * DEG2RAD);
    camera.position.add(cameraOrigin);
    camera.lookAt(cameraOrigin);
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
      event.preventDefault(); // This will stop the browser's context menu from appearing
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
      cameraAzimuth += -(deltaX * ROTATION_SENSITIVITY);
      cameraElevation += deltaY * ROTATION_SENSITIVITY;
      cameraElevation = Math.min(
        MAX_CAMERA_ELEVATION,
        Math.max(MIN_CAMERA_ELEVATION, cameraElevation)
      ); // Allow negative elevation
      updateCameraPosition();
    }

    // Handle zooming of the camera
    if (isRightMouseDown) {
      cameraRadius += deltaY * ZOOM_SENSITIVITY;
      cameraRadius = Math.min(
        MAX_CAMERA_RADIUS,
        Math.max(MIN_CAMERA_RADIUS, cameraRadius)
      );
      updateCameraPosition();
    }

    // Handle panning of the camera (future implementation)
    if (isMiddleMouseDown) {
      const panFactor = 0.005; // This factor controls the speed of panning
      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
        Y_AXIS,
        cameraAzimuth * DEG2RAD
      );
      const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(
        Y_AXIS,
        cameraAzimuth * DEG2RAD
      );
      cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * deltaY));
      cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * deltaX));
      updateCameraPosition();
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
