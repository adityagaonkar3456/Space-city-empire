import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* =====================================================
   BASIC SETUP
===================================================== */

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);

scene.fog = new THREE.Fog(
    0x87ceeb,
    100,
    320
);


/* =====================================================
   CAMERA
===================================================== */

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    700
);

camera.position.set(0, 6, 12);


/* =====================================================
   RENDERER - PERFORMANCE MODE
===================================================== */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false,
    powerPreference: "high-performance"
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

/* IMPORTANT: Mobile FPS improvement */
renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.25)
);

/* Smaller shadows */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;


/* =====================================================
   LIGHTING
===================================================== */

const skyLight =
    new THREE.HemisphereLight(
        0xffffff,
        0x405040,
        1.8
    );

scene.add(skyLight);


const sun =
    new THREE.DirectionalLight(
        0xffffff,
        2.2
    );

sun.position.set(
    100,
    120,
    80
);

sun.castShadow = true;

/* FAST SHADOW */
sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;

sun.shadow.camera.left = -120;
sun.shadow.camera.right = 120;
sun.shadow.camera.top = 120;
sun.shadow.camera.bottom = -120;

sun.shadow.bias = -0.0005;

scene.add(sun);


/* =====================================================
   GROUND
===================================================== */

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


/* =====================================================
   ROAD MATERIALS
===================================================== */

const roadMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x252525,
        roughness: 1
    });


/* =====================================================
   ROAD
===================================================== */

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

    const road =
        new THREE.Mesh(
            geometry,
            roadMaterial
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


createRoad(
    0,
    0,
    20,
    500
);


/* Horizontal road */

const horizontalRoad =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            500,
            20
        ),
        roadMaterial
    );

horizontalRoad.rotation.x =
    -Math.PI / 2;

horizontalRoad.position.y =
    0.03;

horizontalRoad.receiveShadow = true;

scene.add(horizontalRoad);


/* =====================================================
   ROAD MARKINGS
===================================================== */

const lineMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffffff
    });


/* Reduced markings */

for (
    let z = -240;
    z < 240;
    z += 18
) {

    const line =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                0.35,
                5
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
    x += 18
) {

    const line =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                5,
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


/* =====================================================
   BUILDINGS
===================================================== */

const buildingMaterials = [];

for (
    let i = 0;
    i < 8;
    i++
) {

    buildingMaterials.push(
        new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(
                i / 8,
                0.25,
                0.45
            ),
            roughness: 0.85
        })
    );
}


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
        buildingMaterials[
            Math.floor(
                Math.random() *
                buildingMaterials.length
            )
        ];

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

    /*
       PERFORMANCE:
       Buildings receive shadow
       but do NOT cast shadow.
    */

    building.castShadow = false;
    building.receiveShadow = true;

    scene.add(building);
}


/* Reduced city density */

for (
    let x = -90;
    x <= 90;
    x += 30
) {

    for (
        let z = -120;
        z <= 120;
        z += 40
    ) {

        if (
            Math.abs(x) < 18 ||
            Math.abs(z) < 18
        ) {
            continue;
        }

        const height =
            10 +
            Math.random() * 30;

        createBuilding(
            x,
            z,
            20,
            height,
            20
        );
    }
}


/* =====================================================
   TREES
===================================================== */

/* Shared materials */

const trunkMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x6b421f
    });

const leavesMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x176b2c
    });


/* Shared geometries */

const trunkGeometry =
    new THREE.CylinderGeometry(
        0.45,
        0.65,
        4,
        7
    );

const leavesGeometry =
    new THREE.SphereGeometry(
        3,
        8,
        8
    );


function createTree(
    x,
    z
) {

    const tree =
        new THREE.Group();

    /* trunk */

    const trunk =
        new THREE.Mesh(
            trunkGeometry,
            trunkMaterial
        );

    trunk.position.y = 2;

    trunk.castShadow = false;

    tree.add(trunk);


    /* leaves */

    const leaves =
        new THREE.Mesh(
            leavesGeometry,
            leavesMaterial
        );

    leaves.position.y = 6;

    leaves.castShadow = false;

    tree.add(leaves);


    tree.position.set(
        x,
        0,
        z
    );

    scene.add(tree);
}


/* Reduced trees */

for (
    let i = 0;
    i < 40;
    i++
) {

    const x =
        (Math.random() - 0.5) *
        450;

    const z =
        (Math.random() - 0.5) *
        450;

    if (
        Math.abs(x) < 25 ||
        Math.abs(z) < 25
    ) {
        continue;
    }

    createTree(
        x,
        z
    );
}


/* =====================================================
   PLAYER
===================================================== */

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
            12,
            12
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


/* Player position */

player.position.set(
    0,
    0,
    35
);


/* =====================================================
   INPUT
===================================================== */

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


/* =====================================================
   MOBILE CONTROLS
===================================================== */

function setupButton(
    id,
    key
) {

    const button =
        document.getElementById(id);

    if (!button) return;

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


/* =====================================================
   PLAYER PHYSICS
===================================================== */

let velocityY = 0;

let grounded = true;

const gravity = -22;

const walkSpeed = 7;

const runSpeed = 14;

const jumpPower = 10;


/* =====================================================
   ANIMATION
===================================================== */

let animationTime = 0;


/* =====================================================
   CAMERA
===================================================== */

const cameraTarget =
    new THREE.Vector3();

const desiredCamera =
    new THREE.Vector3();


/* =====================================================
   CLOCK
===================================================== */

const clock =
    new THREE.Clock();


/* =====================================================
   GAME LOOP
===================================================== */

function animate() {

    requestAnimationFrame(
        animate
    );


    const delta =
        Math.min(
            clock.getDelta(),
            0.05
        );


    /* ---------------------------------
       INPUT
    --------------------------------- */

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


    /* ---------------------------------
       SPEED
    --------------------------------- */

    const running =
        keys["ShiftLeft"] ||
        keys["ShiftRight"];


    const speed =
        running
            ? runSpeed
            : walkSpeed;


    /* ---------------------------------
       MOVEMENT
    --------------------------------- */

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


        /* Face movement */

        const angle =
            Math.atan2(
                side,
                forward
            );

        player.rotation.y =
            angle;


        /* Animation */

        animationTime +=
            delta * speed;


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

        /* Smooth stop */

        leftLeg.rotation.x *= 0.8;

        rightLeg.rotation.x *= 0.8;

        leftArm.rotation.x *= 0.8;

        rightArm.rotation.x *= 0.8;
    }


    /* ---------------------------------
       JUMP
    --------------------------------- */

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


    /* Ground */

    if (
        player.position.y <= 0
    ) {

        player.position.y = 0;

        velocityY = 0;

        grounded = true;
    }


    /* ---------------------------------
       WORLD LIMIT
    --------------------------------- */

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


    /* ---------------------------------
       CAMERA
    --------------------------------- */

    desiredCamera.set(
        player.position.x,
        player.position.y + 7,
        player.position.z + 12
    );


    camera.position.lerp(
        desiredCamera,
        1 -
        Math.pow(
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


    /* ---------------------------------
       HUD
    --------------------------------- */

    if (
        running &&
        moving
    ) {

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


    /* ---------------------------------
       RENDER
    --------------------------------- */

    renderer.render(
        scene,
        camera
    );
}


/* =====================================================
   RESIZE
===================================================== */

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


/* =====================================================
   START
===================================================== */

status.textContent =
    "GAME READY";

animate();
