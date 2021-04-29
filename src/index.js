/* eslint-disable no-undef, no-unused-vars, import/first */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

console.log(THREE.REVISION);
// Create debug GUI.
const gui = new dat.GUI();

// Create renderer.
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Create scene.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x292f33);

// Create camera.
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.z = -1;
scene.add(camera);

// Add mouse controls for camera.
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Load textures.
const textureLoader = new THREE.TextureLoader();
const earthTex = textureLoader.load("/textures/terrain.jpg");

// Create groups and objects.
const group = new THREE.Group();
scene.add(group);

import sphereVert from "./shaders/earth.vert";
import sphereFrag from "./shaders/earth.frag";
import planeVert from "./shaders/plane.vert";
import planeFrag from "./shaders/plane.frag";

const sphereGeo = new THREE.SphereBufferGeometry(0.5, 64, 64);
const planeGeo = new THREE.PlaneBufferGeometry(0.5, 0.5, 128, 128);
const sphereMat = new THREE.RawShaderMaterial({
  vertexShader: sphereVert,
  fragmentShader: sphereFrag,
  transparent: true,
  uniforms: {
    uTerrainMap: { value: earthTex },
    uTime: { value: 0.0 },
    uNoiseScale: { value: 0.42 },
    uOffsetScale: { value: 0.02 }
  }
});
const planeMat = new THREE.RawShaderMaterial({
  vertexShader: planeVert,
  fragmentShader: planeFrag,
  transparent: true,
  uniforms: {
    uTerrainMap: { value: earthTex },
    uTime: { value: 0.0 },
    uNoiseScale: { value: 2.0 },
    uOffsetScale: { value: 0.1 },
    uValue1: { value: 0.0 },
    uValue2: { value: 1.0 }
  }
});
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
const planeMesh = new THREE.Points(planeGeo, planeMat);
// group.add(sphereMesh);
group.add(planeMesh);

gui
  .add(planeMat.uniforms.uValue1, "value")
  .min(0)
  .max(5)
  .step(0.01)
  .name("evolution");
gui
  .add(planeMat.uniforms.uValue2, "value")
  .min(0)
  .max(5)
  .step(0.01)
  .name("split");

// Animation loop.
const clock = new THREE.Clock();

const tick = () => {
  sphereMat.uniforms.uTime.value = clock.getElapsedTime();
  planeMat.uniforms.uTime.value = clock.getElapsedTime();

  // group.rotation.x += 0.01;
  // group.rotation.y += 0.02;

  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};
tick();

// Window resize listener.
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
