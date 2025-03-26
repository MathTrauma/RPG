import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { Terrain } from './terrain';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(10, 10, 10);

const controls = new OrbitControls( camera, renderer.domElement );

const stats = new Stats();
document.body.appendChild(stats.dom)

const gui = new GUI();

const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set(1,2,3);
scene.add(sun);

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

const helper = new THREE.AxesHelper(10);
scene.add(helper);


// %%%%%%%%%%%%%%%%%%%%%%%%%%%
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const terrain = new Terrain(10, 10);
scene.add(terrain);
// %%%%%%%%%%%%%%%%%%%%%%%%%%%


function animate() {
    //controls.update();
	renderer.render( scene, camera );
    stats.update();
}

window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


const terrainFolder = gui.addFolder('Terrain');
terrainFolder.add(terrain, 'width', 1, 20, 1).name('width');
terrainFolder.add(terrain, 'height', 1, 20, 1).name('height');
terrainFolder.addColor(terrain.terrain.material, 'color').name('color');
terrainFolder.onChange(()=>{
    terrain.createTerrain();
})