import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* =========================================
   BASIC SETUP
========================================= */

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);

scene.fog = new THREE.Fog(
    0x87ceeb,
    80,
    350
);

/* =========================================
   CAMERA
========================================= */

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 6, 12);

/* =========================================
   RENDERER
========================================= */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

/* =========================================
   LIGHTING
========================================= */

const skyLight =
    new THREE.HemisphereLight(
        0xffffff,
        0x405040,
        2
    );

scene.add(skyLight);

const sun =
    new THREE.DirectionalLight(
        0xffffff,
        3
    );

sun.position.set(
    100,
    120,
    80
);

sun.castShadow = true;

sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;

sun.shadow.camera.left = -150;
sun.shadow.camera.right = 150;
sun.shadow.camera.top = 150;
sun.shadow.camera.bottom = -150;

scene.add(sun);

/* =========================================
   GROUND
========================================= */

const groundGeometry =
    new THREE.PlaneGeometry(
        500,
        500
    );

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x3f7542,
        roughness: 1
    });

const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);

/* =========================================
   ROAD
========================================= */

function createRoad(
    x,
    z,
    width,
    length
) {

    const geometry =
        new THREE.PlaneGeometry(
            width,
            length
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x252525,
            roughness: 0.9
        });

    const road =
        new THREE.Mesh(
            geometry,
            material
        );

    road.rotation.x =
        -Math.PI / 2;

    road.position.set(
        x,
        0.025,
        z
    );

    road.receiveShadow = true;

    scene.add(road);
}

/* Main roads */

createRoad(
    0,
    0,
    20,
    500
);

const horizontalRoad =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            500,
            20
        ),
        new THREE.MeshStandardMaterial({
            color: 0x252525,
            roughness: 0.9
        })
    );

horizontalRoad.rotation.x =
    -Math.PI / 2;

horizontalRoad.position.y =
    0.03;

horizontalRoad.receiveShadow = true;

scene.add(horizontalRoad);

/* =========================================
   ROAD MARKINGS
========================================= */

const lineMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffffff
    });

for (
    let z = -240;
    z < 240;
    z += 12
) {

    const line =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                0.35,
                6
            ),
            lineMaterial
        );

    line.rotation.x =
        -Math.PI / 2;

    line.position.set(
        0,
        0.05,
        z
    );

    scene.add(line);
}

for (
    let x = -240;
    x < 240;
    x += 12
) {

    const line =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                6,
                0.35
            ),
            lineMaterial
        );

    line.rotation.x =
        -Math.PI / 2;

    line.position.set(
        x,
        0.05,
        0
    );

    scene.add(line);
}

/* =========================================
   BUILDINGS
========================================= */

function createBuilding(
    x,
    z,
    width,
    height,
    depth
) {

    const geometry =
        new THREE.BoxGeometry(
            width,
            height,
            depth
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(
                Math.random(),
                0.25,
                0.45
            ),
            roughness: 0.8
        });

    const building =
        new THREE.Mesh(
            geometry,
            material
        );

    building.position.set(
        x,
        height / 2,
        z
    );

    building.castShadow = true;
    building.receiveShadow = true;

    scene.add(building);

    return building;
}

/* City blocks */

for (
    let x = -90;
    x <= 90;
    x += 30
) {

    for (
        let z = -120;
        z <= 120;
        z += 35
    ) {

        if (
            Math.abs(x) < 18 ||
            Math.abs(z) < 18
        ) {
            continue;
        }

        const height =
            10 +
            Math.random() * 35;

        createBuilding(
            x,
            z,
            20,
            height,
            20
        );
    }
}

/* =========================================
   TREES
========================================= */

function createTree(x, z) {

    const trunk =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.45,
                0.65,
                4,
                10
            ),
            new THREE.MeshStandardMaterial({
                color: 0x6b421f
            })
        );

    trunk.position.set(
        x,
        2,
        z
    );

    trunk.castShadow = true;

    scene.add(trunk);

    const leaves =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                3,
                16,
                16
            ),
            new THREE.MeshStandardMaterial({
                color: 0x176b2c
            })
        );

    leaves.position.set(
        x,
        6,
        z
    );

    leaves.castShadow = true;

    scene.add(leaves);
}

for (
    let i = 0;
    i < 70;
    i++
) {

    const x =
        (Math.random() - 0.5) * 450;

    const z =
        (Math.random() - 0.5) * 450;

    if (
        Math.abs(x) < 25 ||
        Math.abs(z) < 25
    ) {
        continue;
    }

    createTree(x, z);
}

/* =========================================
   PLAYER
========================================= */

const player =
    new THREE.Group();

scene.add(player);

/* Body */

const body =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            1.2,
            1.8,
            0.7
        ),
        new THREE.MeshStandardMaterial({
            color: 0x263b8f
        })
    );

body.position.y = 2.1;

body.castShadow = true;

player.add(body);

/* Head */

const head =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.5,
            20,
            20
        ),
        new THREE.MeshStandardMaterial({
            color: 0xffc49a
        })
    );

head.position.y = 3.35;

head.castShadow = true;

player.add(head);

/* Legs */

const legMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x202020
    });

const leftLeg =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.42,
            1.5,
            0.5
        ),
        legMaterial
    );

leftLeg.position.set(
    -0.3,
    0.75,
    0
);

leftLeg.castShadow = true;

player.add(leftLeg);

const rightLeg =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.42,
            1.5,
            0.5
        ),
        legMaterial
    );

rightLeg.position.set(
    0.3,
    0.75,
    0
);

rightLeg.castShadow = true;

player.add(rightLeg);

/* Arms */

const armMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x263b8f
    });

const leftArm =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.35,
            1.5,
            0.4
        ),
        armMaterial
    );

leftArm.position.set(
    -0.8,
    2.15,
    0
);

leftArm.castShadow = true;

player.add(leftArm);

const rightArm =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.35,
            1.5,
            0.4
        ),
        armMaterial
    );

rightArm.position.set(
    0.8,
    2.15,
    0
);

rightArm.castShadow = true;

player.add(rightArm);

/* Player start position */

player.position.set(
    0,
    0,
    35
);

/* =========================================
   INPUT SYSTEM
========================================= */

const keys = {};

window.addEventListener(
    "keydown",
    event => {

        keys[event.code] = true;

        if (
            event.code === "Space"
        ) {
            event.preventDefault();
        }
    }
);

window.addEventListener(
    "keyup",
    event => {

        keys[event.code] = false;
    }
);

/* =========================================
   MOBILE BUTTON SYSTEM
========================================= */

function setupButton(
    id,
    key
) {

    const button =
        document.getElementById(id);

    button.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            keys[key] = true;
        }
    );

    button.addEventListener(
        "pointerup",
        event => {

            event.preventDefault();

            keys[key] = false;
        }
    );

    button.addEventListener(
        "pointercancel",
        () => {

            keys[key] = false;
        }
    );

    button.addEventListener(
        "pointerleave",
        () => {

            keys[key] = false;
        }
    );
}

setupButton(
    "moveUp",
    "KeyW"
);

setupButton(
    "moveDown",
    "KeyS"
);

setupButton(
    "moveLeft",
    "KeyA"
);

setupButton(
    "moveRight",
    "KeyD"
);

setupButton(
    "runButton",
    "ShiftLeft"
);

setupButton(
    "jumpButton",
    "Space"
);

/* =========================================
   PLAYER PHYSICS
========================================= */

let velocityY = 0;

let grounded = true;

const gravity = -22;

const walkSpeed = 7;

const runSpeed = 14;

const jumpPower = 10;

/* =========================================
   ANIMATION
========================================= */

let animationTime = 0;

/* =========================================
   CAMERA
========================================= */

const cameraTarget =
    new THREE.Vector3();

const desiredCamera =
    new THREE.Vector3();

/* =========================================
   CLOCK
========================================= */

const clock =
    new THREE.Clock();

/* =========================================
   GAME LOOP
========================================= */

function animate() {

    requestAnimationFrame(
        animate
    );

    const delta =
        Math.min(
            clock.getDelta(),
            0.05
        );

    /* -----------------------------
       MOVEMENT INPUT
    ----------------------------- */

    let forward = 0;
    let side = 0;

    if (
        keys["KeyW"] ||
        keys["ArrowUp"]
    ) {
        forward += 1;
    }

    if (
        keys["KeyS"] ||
        keys["ArrowDown"]
    ) {
        forward -= 1;
    }

    if (
        keys["KeyA"] ||
        keys["ArrowLeft"]
    ) {
        side -= 1;
    }

    if (
        keys["KeyD"] ||
        keys["ArrowRight"]
    ) {
        side += 1;
    }

    const moving =
        forward !== 0 ||
        side !== 0;

    /* -----------------------------
       SPEED
    ----------------------------- */

    const running =
        keys["ShiftLeft"] ||
        keys["ShiftRight"];

    const speed =
        running
            ? runSpeed
            : walkSpeed;

    /* -----------------------------
       MOVE PLAYER
    ----------------------------- */

    if (moving) {

        const length =
            Math.sqrt(
                forward * forward +
                side * side
            );

        forward /= length;
        side /= length;

        player.position.z -=
            forward *
            speed *
            delta;

        player.position.x +=
            side *
            speed *
            delta;

        /* Face movement direction */

        const angle =
            Math.atan2(
                side,
                forward
            );

        player.rotation.y =
            angle;

        /* -------------------------
           WALK / RUN ANIMATION
        ------------------------- */

        animationTime +=
            delta *
            speed;

        const swing =
            Math.sin(
                animationTime * 8
            ) * 0.45;

        leftLeg.rotation.x =
            swing;

        rightLeg.rotation.x =
            -swing;

        leftArm.rotation.x =
            -swing;

        rightArm.rotation.x =
            swing;

    } else {

        leftLeg.rotation.x *= 0.8;
        rightLeg.rotation.x *= 0.8;

        leftArm.rotation.x *= 0.8;
        rightArm.rotation.x *= 0.8;
    }

    /* -----------------------------
       JUMP
    ----------------------------- */

    if (
        keys["Space"] &&
        grounded
    ) {

        velocityY =
            jumpPower;

        grounded = false;

        keys["Space"] = false;
    }

    /* Gravity */

    velocityY +=
        gravity *
        delta;

    player.position.y +=
        velocityY *
        delta;

    /* Ground collision */

    if (
        player.position.y <= 0
    ) {

        player.position.y = 0;

        velocityY = 0;

        grounded = true;
    }

    /* -----------------------------
       WORLD LIMIT
    ----------------------------- */

    player.position.x =
        THREE.MathUtils.clamp(
            player.position.x,
            -240,
            240
        );

    player.position.z =
        THREE.MathUtils.clamp(
            player.position.z,
            -240,
            240
        );

    /* -----------------------------
       THIRD PERSON CAMERA
    ----------------------------- */

    desiredCamera.set(
        player.position.x,
        player.position.y + 7,
        player.position.z + 12
    );

    camera.position.lerp(
        desiredCamera,
        1 - Math.pow(
            0.001,
            delta
        )
    );

    cameraTarget.set(
        player.position.x,
        player.position.y + 2,
        player.position.z
    );

    camera.lookAt(
        cameraTarget
    );

    /* -----------------------------
       HUD
    ----------------------------- */

    if (running && moving) {

        status.textContent =
            "RUNNING";

    } else if (moving) {

        status.textContent =
            "WALKING";

    } else if (!grounded) {

        status.textContent =
            "JUMPING";

    } else {

        status.textContent =
            "READY";
    }

    /* -----------------------------
       RENDER
    ----------------------------- */

    renderer.render(
        scene,
        camera
    );
}

/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);

/* =========================================
   START GAME
========================================= */

status.textContent =
    "GAME READY";

animate();
