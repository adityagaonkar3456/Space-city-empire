import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const status = document.getElementById("gameStatus");

status.innerText = "THREE.JS LOADING...";

const canvas = document.getElementById("gameCanvas");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x101820);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 2, 6);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

const light = new THREE.HemisphereLight(
    0xffffff,
    0x444444,
    2
);

scene.add(light);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({
        color: 0x00aaff
    })
);

scene.add(cube);

status.innerText = "THREE.JS WORKING";

function animate() {

    requestAnimationFrame(animate);

    cube.rotation.y += 0.01;
    cube.rotation.x += 0.005;

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
