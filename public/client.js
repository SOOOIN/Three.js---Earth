
import * as THREE from 'three';
//  console.log(THREE)
import {
    OrbitControls
} from './jsm/controls/OrbitControls.js';
//  console.log(OrbitControls)
import stats from '/jsm/libs/stats.module.js';
//  console.log(stats)

// global variables
let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webgl');

scene = new THREE.Scene();

const fov = 60; //광곽렌즈 각도.
const aspect = window.innerWidth / window.innerHeight; //윈도우 너비의 높이를 나눈값.
const near = 0.1; //가까이에 있는것.
const far = 1000; //멀리에 있는것.

//카메라 안에 모든변수담기.
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

// renderer setup
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0); // 뒷배경 못 불러옴. (해결해야 할 것 )
// background-color: black; 일단 해결

const controls = new OrbitControls(camera, renderer.domElement);

// earth geometry
//반지름,세그먼트,높이 세그면트
const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

// earth material
const texture = new THREE.TextureLoader();

const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1, //거칠기
    metalness: 0, //금속재질
    map:texture.load('texture/earthmap1k.jpg'),
    bumpMap: texture.load('texture/earthbump.jpg'),
    bumpScale: 0.3,
   // map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg'),
})
// earth mesh
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

const cloudGeometry = new THREE.SphereGeometry(0.63,32,32);
const cloudMaterial = new THREE.MeshPhongMaterial({
    map:texture.load('texture/earthCloud.png'),
    transparent:true,//구름 투명도
})
const cloudMesh = new THREE.Mesh(cloudGeometry,cloudMaterial);
scene.add(cloudMesh);

const starGeometry = new THREE.SphereGeometry(80, 64, 64);
const starMeterial = new THREE.MeshBasicMaterial({// 빛과 상호작용하지않음.
    map:texture.load('texture/galaxy.png'),
    side:THREE.BackSide,
})
const starMesh = new THREE.Mesh(starGeometry,starMeterial);
scene.add(starMesh);



const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);//빛색상, 강도
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5,3,5); //포인트 빛의 위치설정. (x,y,z) 
scene.add(pointLight);

// const stats = stats();
// document.body.appendChild(stats.dom);

const animate = () => {
    requestAnimationFrame(animate);
    earthMesh.rotation.y -=0.001;
    cloudMesh.rotation.y -=0.001; //시계방향
    starMesh.rotation.y -=0.002;
    controls.update();
    render();
//    stats.update();
}


const render = () => {
    renderer.render(scene, camera);
}

animate();