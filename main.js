import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x5facb8 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('../img/space2.jpg');
scene.background = spaceTexture;

// Avatar

const blockTexture = new THREE.TextureLoader().load('../img/placeholder-635x635.jpg');

const block = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: blockTexture }));

scene.add(block);

// Moon

const moonTexture = new THREE.TextureLoader().load('../img/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('../img/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

// Bitcoin

// const btcTexture = new THREE.TextureLoader().load('/img/btc.png');
// const btc = new THREE.Mesh(THREE.CylinderGeometry( 6, 6, 1, 32 ), new THREE.MeshBasicMaterial({ map: btcTexture }));

// scene.add(btc);

const cylinderGeometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const cylinderMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry, material );
// scene.add( cylinder );

moon.position.z = 30;
moon.position.setX(-10);

block.position.z = -5;
block.position.x = 2;

cylinder.position.z = -5;
cylinder.position.x = 2;

// btc.position.z = -7;
// btc.position.x = 4;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  block.rotation.y += 0.01;
  block.rotation.z += 0.01;

  cylinder.rotation.y += 0.01;
  cylinder.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
