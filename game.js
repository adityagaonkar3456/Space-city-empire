import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const game = createGame1(canvas);

const scene = game.scene;
const camera = game.camera;
const renderer = game.renderer;
const player = game.player;

// =====================
// CONTROLS
// =====================

const keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

function button(id, key) {

    const el = document.getElementById(id);

    if (!el) return;

    el.addEventListener("pointerdown", function(e) {
        e.preventDefault();
        keys[key] = true;
    });

    el.addEventListener("pointerup", function(e) {
        e.preventDefault();
        keys[key] = false;
    });

    el.addEventListener("pointercancel", function() {
        keys[key] = false;
    });

    el.addEventListener("pointerleave", function() {
        keys[key] = false;
    });
}

button("moveUp", "up");
button("moveDown", "down");
button("moveLeft", "left");
button("moveRight", "right");

// =====================
// KEYBOARD
// =====================

window.addEventListener("keydown", function(e) {

    if (e.key === "ArrowUp" || e.key === "w")
        keys.up = true;

    if (e.key === "ArrowDown" || e.key === "s")
        keys.down = true;

    if (e.key === "ArrowLeft" || e.key === "a")
        keys.left = true;

    if (e.key === "ArrowRight" || e.key === "d")
        keys.right = true;
});

window.addEventListener("keyup", function(e) {

    if (e.key === "ArrowUp" || e.key === "w")
        keys.up = false;

    if (e.key === "ArrowDown" || e.key === "s")
        keys.down = false;

    if (e.key === "ArrowLeft" || e.key === "a")
        keys.left = false;

    if (e.key === "ArrowRight" || e.key === "d")
        keys.right = false;
});

// =====================
// PLAYER MOVEMENT
// =====================

function updatePlayer() {

    const speed = 0.18;

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

// =====================
// CAMERA FOLLOW
// =====================

function updateCamera() {

    camera.position.x =
        player.position.x;

    camera.position.y =
        player.position.y + 6;

    camera.position.z =
        player.position.z + 10;

    camera.lookAt(
        player.position.x,
        player.position.y + 1.5,
        player.position.z
    );
}

// =====================
// GAME LOOP
// =====================

function animate() {

    requestAnimationFrame(animate);

    updatePlayer();
    updateCamera();

    renderer.render(scene, camera);
}

status.innerText = "GAME READY";

animate();

// =====================
// RESIZE
// =====================

window.addEventListener("resize", function() {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
