import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const game = createGame1(canvas);

const player = game.player;
const camera = game.camera;
const renderer = game.renderer;
const scene = game.scene;

const keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

function connectButton(id, key) {

    const button = document.getElementById(id);

    if (!button) return;

    button.addEventListener("pointerdown", function(e) {
        e.preventDefault();
        keys[key] = true;
    });

    button.addEventListener("pointerup", function(e) {
        e.preventDefault();
        keys[key] = false;
    });

    button.addEventListener("pointercancel", function() {
        keys[key] = false;
    });

    button.addEventListener("pointerleave", function() {
        keys[key] = false;
    });
}

connectButton("moveUp", "up");
connectButton("moveDown", "down");
connectButton("moveLeft", "left");
connectButton("moveRight", "right");

function updatePlayer() {

    const speed = 0.15;

    if (keys.up) {
        player.position.z -= speed;
    }

    if (keys.down) {
        player.position.z += speed;
    }

    if (keys.left) {
        player.position.x -= speed;
    }

    if (keys.right) {
        player.position.x += speed;
    }
}

function updateCamera() {

    camera.position.x = player.position.x;
    camera.position.y = player.position.y + 6;
    camera.position.z = player.position.z + 10;

    camera.lookAt(
        player.position.x,
        player.position.y + 1.5,
        player.position.z
    );
}

function animate() {

    requestAnimationFrame(animate);

    updatePlayer();
    updateCamera();

    renderer.render(scene, camera);
}

status.innerText = "PLAYER MOVEMENT READY";

animate();

window.addEventListener("resize", function() {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
