import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const game = createGame1(canvas);

const scene = game.scene;
const camera = game.camera;
const renderer = game.renderer;
const player = game.player;

let moving = false;

// =========================
// MOBILE CONTROLS
// =========================

function setupButton(id, action) {

    const btn = document.getElementById(id);

    if (!btn) return;

    btn.addEventListener("pointerdown", function(e) {
        e.preventDefault();
        moving = true;
        action(true);
    });

    btn.addEventListener("pointerup", function(e) {
        e.preventDefault();
        moving = false;
        action(false);
    });

    btn.addEventListener("pointercancel", function() {
        moving = false;
        action(false);
    });

    btn.addEventListener("pointerleave", function() {
        moving = false;
        action(false);
    });
}

setupButton("moveUp", (v) => {
    window.moveUp = v;
});

setupButton("moveDown", (v) => {
    window.moveDown = v;
});

setupButton("moveLeft", (v) => {
    window.moveLeft = v;
});

setupButton("moveRight", (v) => {
    window.moveRight = v;
});

window.moveUp = false;
window.moveDown = false;
window.moveLeft = false;
window.moveRight = false;

// =========================
// PLAYER MOVEMENT
// =========================

function updatePlayer() {

    const speed = 0.25;

    if (window.moveUp) {
        player.position.z -= speed;
    }

    if (window.moveDown) {
        player.position.z += speed;
    }

    if (window.moveLeft) {
        player.position.x -= speed;
    }

    if (window.moveRight) {
        player.position.x += speed;
    }
}

// =========================
// CAMERA
// =========================

function updateCamera() {

    camera.position.set(
        player.position.x,
        player.position.y + 6,
        player.position.z + 10
    );

    camera.lookAt(
        player.position.x,
        player.position.y + 1.5,
        player.position.z
    );
}

// =========================
// GAME LOOP
// =========================

function animate() {

    requestAnimationFrame(animate);

    updatePlayer();
    updateCamera();

    renderer.render(scene, camera);
}

status.innerText = "PLAYER READY";

animate();

// =========================
// RESIZE
// =========================

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
