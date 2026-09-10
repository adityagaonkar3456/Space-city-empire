import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const game = createGame1(canvas);

const scene = game.scene;
const camera = game.camera;
const renderer = game.renderer;
const player = game.player;

const keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

// ==========================
// BUTTON CONTROL
// ==========================

function setupButton(id, key) {

    const button = document.getElementById(id);

    if (!button) return;

    button.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        keys[key] = true;
    });

    button.addEventListener("pointerup", (e) => {
        e.preventDefault();
        keys[key] = false;
    });

    button.addEventListener("pointercancel", () => {
        keys[key] = false;
    });

    button.addEventListener("pointerleave", () => {
        keys[key] = false;
    });
}

setupButton("moveUp", "up");
setupButton("moveDown", "down");
setupButton("moveLeft", "left");
setupButton("moveRight", "right");

// ==========================
// KEYBOARD
// ==========================

window.addEventListener("keydown", (e) => {

    if (e.key === "ArrowUp" || e.key === "w")
        keys.up = true;

    if (e.key === "ArrowDown" || e.key === "s")
        keys.down = true;

    if (e.key === "ArrowLeft" || e.key === "a")
        keys.left = true;

    if (e.key === "ArrowRight" || e.key === "d")
        keys.right = true;
});

window.addEventListener("keyup", (e) => {

    if (e.key === "ArrowUp" || e.key === "w")
        keys.up = false;

    if (e.key === "ArrowDown" || e.key === "s")
        keys.down = false;

    if (e.key === "ArrowLeft" || e.key === "a")
        keys.left = false;

    if (e.key === "ArrowRight" || e.key === "d")
        keys.right = false;
});

// ==========================
// WALKING
// ==========================

let walkTime = 0;

function updatePlayer() {

    const speed = 0.08;

    let moving = false;

    if (keys.up) {
        player.position.z -= speed;
        moving = true;
    }

    if (keys.down) {
        player.position.z += speed;
        moving = true;
    }

    if (keys.left) {
        player.position.x -= speed;
        moving = true;
    }

    if (keys.right) {
        player.position.x += speed;
        moving = true;
    }

    // WALK ANIMATION
    if (moving) {

        walkTime += 0.15;

        const swing = Math.sin(walkTime) * 0.5;

        // First two children are body/head.
        // Legs are children 3 and 4.
        if (player.children[3]) {
            player.children[3].rotation.x = swing;
        }

        if (player.children[4]) {
            player.children[4].rotation.x = -swing;
        }

        status.innerText = "WALKING";
    } 
    else {

        // Stop legs
        if (player.children[3]) {
            player.children[3].rotation.x = 0;
        }

        if (player.children[4]) {
            player.children[4].rotation.x = 0;
        }

        status.innerText = "STANDING";
    }
}

// ==========================
// FIXED CAMERA
// ==========================

camera.position.set(0, 6, 30);

camera.lookAt(
    player.position.x,
    player.position.y + 1.5,
    player.position.z
);

// ==========================
// GAME LOOP
// ==========================

function animate() {

    requestAnimationFrame(animate);

    updatePlayer();

    renderer.render(scene, camera);
}

animate();

// ==========================
// RESIZE
// ==========================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
