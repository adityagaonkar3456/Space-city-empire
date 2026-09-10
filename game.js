import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const game = createGame1(canvas);

const THREE = game.THREE;
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

// ===============================
// MOBILE BUTTONS
// ===============================

function connectButton(id, key) {
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

    button.addEventListener("pointerleave", () => {
        keys[key] = false;
    });

    button.addEventListener("pointercancel", () => {
        keys[key] = false;
    });
}

connectButton("moveUp", "up");
connectButton("moveDown", "down");
connectButton("moveLeft", "left");
connectButton("moveRight", "right");

// ===============================
// KEYBOARD
// ===============================

window.addEventListener("keydown", (e) => {

    if (e.key === "w" || e.key === "ArrowUp")
        keys.up = true;

    if (e.key === "s" || e.key === "ArrowDown")
        keys.down = true;

    if (e.key === "a" || e.key === "ArrowLeft")
        keys.left = true;

    if (e.key === "d" || e.key === "ArrowRight")
        keys.right = true;
});

window.addEventListener("keyup", (e) => {

    if (e.key === "w" || e.key === "ArrowUp")
        keys.up = false;

    if (e.key === "s" || e.key === "ArrowDown")
        keys.down = false;

    if (e.key === "a" || e.key === "ArrowLeft")
        keys.left = false;

    if (e.key === "d" || e.key === "ArrowRight")
        keys.right = false;
});

// ===============================
// PLAYER MOVEMENT
// ===============================

function updatePlayer() {

    const speed = 0.18;

    let x = 0;
    let z = 0;

    if (keys.up) {
        z -= 1;
    }

    if (keys.down) {
        z += 1;
    }

    if (keys.left) {
        x -= 1;
    }

    if (keys.right) {
        x += 1;
    }

    // No movement
    if (x === 0 && z === 0) {
        return;
    }

    // Normalize diagonal movement
    const length = Math.sqrt(x * x + z * z);

    x /= length;
    z /= length;

    // MOVE PLAYER
    player.position.x += x * speed;
    player.position.z += z * speed;

    // ROTATE PLAYER
    player.rotation.y = Math.atan2(x, z);
}

// ===============================
// CAMERA FOLLOW
// ===============================

function updateCamera() {

    const desiredPosition = new THREE.Vector3(
        player.position.x,
        player.position.y + 5.5,
        player.position.z + 9
    );

    camera.position.lerp(
        desiredPosition,
        0.12
    );

    camera.lookAt(
        player.position.x,
        player.position.y + 1.5,
        player.position.z
    );
}

// ===============================
// GAME LOOP
// ===============================

function animate() {

    requestAnimationFrame(animate);

    updatePlayer();
    updateCamera();

    renderer.render(scene, camera);
}

status.innerText = "PLAYER MOVEMENT READY";

animate();

// ===============================
// RESIZE
// ===============================

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
