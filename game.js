import { createGame1 } from "./game1.js";

const canvas = document.getElementById("gameCanvas");
const status = {
    set innerText(value) {}
};

const game = createGame1(canvas);

const scene = game.scene;
const camera = game.camera;
const renderer = game.renderer;
const player = game.player;
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

let gameStarted = false;

if (startButton) {
    startButton.addEventListener("click", () => {

        gameStarted = true;

        startScreen.style.display = "none";

        status.innerText = "GAME STARTED";
    });
}
const saveButton = document.getElementById("saveButton");

if (saveButton) {
    saveButton.addEventListener("click", () => {

        const saveData = {
            x: player.position.x,
            y: player.position.y,
            z: player.position.z
        };

        localStorage.setItem(
            "sciFiGameSave",
            JSON.stringify(saveData)
        );

        status.innerText = "GAME SAVED";
    });
}
const menuButton = document.getElementById("menuButton");
const gameMenu = document.getElementById("gameMenu");
const closeMenuButton = document.getElementById("closeMenuButton");

if (menuButton && gameMenu) {

    menuButton.addEventListener("pointerdown", (e) => {

        e.preventDefault();
        e.stopPropagation();

        if (gameMenu.style.display === "flex") {
            gameMenu.style.display = "none";
        } else {
            gameMenu.style.display = "flex";
        }

    });
}

if (closeMenuButton) {
    closeMenuButton.addEventListener("click", () => {
        gameMenu.style.display = "none";
    });
}
const loadButton = document.getElementById("loadButton");

if (loadButton) {
    loadButton.addEventListener("click", () => {

        const saved = localStorage.getItem("sciFiGameSave");

        if (!saved) {
            alert("No saved game found.");
            return;
        }

        const saveData = JSON.parse(saved);

        player.position.x = saveData.x;
        player.position.y = saveData.y;
        player.position.z = saveData.z;

        startScreen.style.display = "none";
        gameStarted = true;

        status.innerText = "GAME LOADED";
    });
}
// ==========================
// CONTROLS
// ==========================

const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    run: false
};

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
setupButton("runButton", "run");

// ==========================
// JUMP
// ==========================

let velocityY = 0;
let jumping = false;

const jumpButton = document.getElementById("jumpButton");

if (jumpButton) {

    jumpButton.addEventListener("pointerdown", (e) => {

        e.preventDefault();

        if (!jumping) {
            jumping = true;
            velocityY = 0.18;
            status.innerText = "JUMP!";
        }
    });
}

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

    if (e.key === "Shift")
        keys.run = true;

    if (e.key === " ")
        jump();
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

    if (e.key === "Shift")
        keys.run = false;
});

function jump() {

    if (!jumping) {
        velocityY = 0.18;
        jumping = true;
    }
}

// ==========================
// PLAYER MOVEMENT
// ==========================

let walkTime = 0;

function updatePlayer() {

    const walkSpeed = 0.08;
    const runSpeed = 0.16;

    const speed = keys.run ? runSpeed : walkSpeed;

    let dx = 0;
    let dz = 0;

    if (keys.up) dz = -1;
    if (keys.down) dz = 1;
    if (keys.left) dx = -1;
    if (keys.right) dx = 1;

    const moving = dx !== 0 || dz !== 0;

    if (moving) {

        const length = Math.sqrt(dx * dx + dz * dz);

        dx /= length;
        dz /= length;

        player.position.x += dx * speed;
        player.position.z += dz * speed;

        // Correct player facing
        player.rotation.y = Math.atan2(-dx, -dz);

        walkTime += keys.run ? 0.25 : 0.15;

        const swing = Math.sin(walkTime) * 0.5;

        if (player.children[3])
            player.children[3].rotation.x = swing;

        if (player.children[4])
            player.children[4].rotation.x = -swing;

        status.innerText = keys.run ? "RUNNING" : "WALKING";

    } else {

        if (player.children[3])
            player.children[3].rotation.x = 0;

        if (player.children[4])
            player.children[4].rotation.x = 0;

        status.innerText = jumping ? "JUMPING" : "STANDING";
    }

    // ======================
    // GRAVITY
    // ======================
if (jumping) {
    velocityY -= 0.012;
    player.position.y += velocityY;

    if (player.position.y <= 0) {
        player.position.y = 0;
        velocityY = 0;
        jumping = false;
    }
}
}
// 360° CAMERA ROTATION
let cameraAngle = 0;
let cameraDistance = 10;
let targetCameraDistance = 10;
let cameraHeight = 6;

let touchStartX = 0;
let rotatingCamera = false;

window.addEventListener("pointerdown", (e) => {

    if (e.clientX > window.innerWidth * 0.35) {
        touchStartX = e.clientX;
        rotatingCamera = true;
    }

});

window.addEventListener("pointermove", (e) => {

    if (!rotatingCamera) return;

    const deltaX = e.clientX - touchStartX;

    cameraAngle -= deltaX * 0.008;

    touchStartX = e.clientX;

});

window.addEventListener("pointerup", () => {
    rotatingCamera = false;
});
// ==========================
// THIRD PERSON 360° CAMERA
// ==========================

function updateCamera() {

    const targetX = player.position.x;
    const targetY = player.position.y + 1.5;
    const targetZ = player.position.z;

    // Camera orbit position
    const desiredX =
        targetX + Math.sin(cameraAngle) * cameraDistance;

    const desiredZ =
        targetZ + Math.cos(cameraAngle) * cameraDistance;

    const desiredY =
        targetY + cameraHeight;

    // Smooth camera movement
    camera.position.x +=
        (desiredX - camera.position.x) * 0.12;

    camera.position.y +=
        (desiredY - camera.position.y) * 0.12;

    camera.position.z +=
        (desiredZ - camera.position.z) * 0.12;

    // Look at player
    camera.lookAt(
        targetX,
        targetY,
        targetZ
    );
}

// ==========================
// GAME LOOP
// ==========================

function animate() {

    requestAnimationFrame(animate);

    if (gameStarted) {
    updatePlayer();
        if (scene.userData.updateMovingCar) {
    scene.userData.updateMovingCar();
}

if (game.updatePlayerAnimation) {
    game.updatePlayerAnimation(
        0.016,
        keys.up || keys.down || keys.left || keys.right,
        keys.run
    );
}

updateCamera();;
}
    renderer.render(scene, camera);
}

status.innerText = "GAME READY";

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
