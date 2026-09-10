import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* =====================================================
   V3.0 SCI-FI SPACEPORT
   City → Spaceport → Rocket
===================================================== */

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 100, 320);


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
   RENDERER - MOBILE FAST
===================================================== */

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    powerPreference: "high-performance"
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.25)
);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;


/* =====================================================
   LIGHT
===================================================== */

scene.add(
    new THREE.HemisphereLight(
        0xffffff,
        0x405040,
        1.8
    )
);

const sun =
    new THREE.DirectionalLight(
        0xffffff,
        2.2
    );

sun.position.set(100, 120, 80);
sun.castShadow = true;

sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;

sun.shadow.camera.left = -120;
sun.shadow.camera.right = 120;
sun.shadow.camera.top = 120;
sun.shadow.camera.bottom = -120;

scene.add(sun);


/* =====================================================
   GROUND
===================================================== */

const ground =
    new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500),
        new THREE.MeshStandardMaterial({
            color: 0x3f7542,
            roughness: 1
        })
    );

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;

scene.add(ground);


/* =====================================================
   ROADS
===================================================== */

const roadMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x252525,
        roughness: 1
    });

function createRoad(x, z, width, length) {

    const road =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                width,
                length
            ),
            roadMaterial
        );

    road.rotation.x = -Math.PI / 2;

    road.position.set(
        x,
        0.025,
        z
    );

    road.receiveShadow = true;

    scene.add(road);
}

createRoad(0, 0, 20, 500);

createRoad(0, -145, 30, 180);


/* =====================================================
   ROAD MARKINGS
===================================================== */

const lineMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffffff
    });

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

    line.rotation.x = -Math.PI / 2;

    line.position.set(
        0,
        0.05,
        z
    );

    scene.add(line);
}


/* =====================================================
   CITY BUILDINGS
===================================================== */

const buildingMaterials = [];

for (let i = 0; i < 7; i++) {

    buildingMaterials.push(
        new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(
                i / 7,
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

    const building =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),
            buildingMaterials[
                Math.floor(
                    Math.random() *
                    buildingMaterials.length
                )
            ]
        );

    building.position.set(
        x,
        height / 2,
        z
    );

    building.receiveShadow = true;

    scene.add(building);
}

for (
    let x = -90;
    x <= 90;
    x += 30
) {

    for (
        let z = -110;
        z <= 100;
        z += 40
    ) {

        if (
            Math.abs(x) < 18 ||
            Math.abs(z) < 18
        ) continue;

        createBuilding(
            x,
            z,
            20,
            10 + Math.random() * 30,
            20
        );
    }
}


/* =====================================================
   TREES
===================================================== */

const trunkMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x6b421f
    });

const leavesMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x176b2c
    });

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

function createTree(x, z) {

    const tree = new THREE.Group();

    const trunk =
        new THREE.Mesh(
            trunkGeometry,
            trunkMaterial
        );

    trunk.position.y = 2;

    tree.add(trunk);

    const leaves =
        new THREE.Mesh(
            leavesGeometry,
            leavesMaterial
        );

    leaves.position.y = 6;

    tree.add(leaves);

    tree.position.set(x, 0, z);

    scene.add(tree);
}

for (let i = 0; i < 40; i++) {

    const x =
        (Math.random() - 0.5) * 450;

    const z =
        (Math.random() - 0.5) * 450;

    if (
        Math.abs(x) < 25 ||
        Math.abs(z) < 25
    ) continue;

    createTree(x, z);
}


/* =====================================================
   SPACEPORT AREA
===================================================== */

const spaceport =
    new THREE.Group();

spaceport.position.set(
    0,
    0,
    -190
);

scene.add(spaceport);


/* =====================================================
   SPACEPORT FLOOR
===================================================== */

const spaceFloor =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            150,
            0.5,
            90
        ),
        new THREE.MeshStandardMaterial({
            color: 0x555b63,
            metalness: 0.4,
            roughness: 0.65
        })
    );

spaceFloor.position.y = 0.25;
spaceFloor.receiveShadow = true;

spaceport.add(spaceFloor);


/* =====================================================
   LAUNCH PAD
===================================================== */

const launchPad =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            15,
            15,
            0.7,
            32
        ),
        new THREE.MeshStandardMaterial({
            color: 0x30343a,
            metalness: 0.5,
            roughness: 0.6
        })
    );

launchPad.position.set(
    35,
    0.8,
    -15
);

launchPad.receiveShadow = true;

spaceport.add(launchPad);


/* =====================================================
   LAUNCH PAD RINGS
===================================================== */

for (let r = 0; r < 3; r++) {

    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                5 + r * 3,
                0.12,
                6,
                32
            ),
            new THREE.MeshBasicMaterial({
                color: 0x00aaff
            })
        );

    ring.rotation.x =
        Math.PI / 2;

    ring.position.set(
        35,
        1.2,
        -15
    );

    spaceport.add(ring);
}


/* =====================================================
   CONTROL TOWER
===================================================== */

const tower =
    new THREE.Group();

tower.position.set(
    -45,
    0,
    -20
);


/* Tower body */

const towerBody =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            10,
            35,
            10
        ),
        new THREE.MeshStandardMaterial({
            color: 0x515963,
            metalness: 0.5,
            roughness: 0.4
        })
    );

towerBody.position.y = 17.5;

tower.add(towerBody);


/* Tower top */

const towerTop =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            9,
            9,
            5,
            8
        ),
        new THREE.MeshStandardMaterial({
            color: 0x20262d,
            metalness: 0.6
        })
    );

towerTop.position.y = 37;

tower.add(towerTop);


/* Tower antenna */

const antenna =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.3,
            0.3,
            12,
            6
        ),
        new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            metalness: 0.8
        })
    );

antenna.position.y = 45;

tower.add(antenna);

spaceport.add(tower);


/* =====================================================
   HANGAR
===================================================== */

const hangar =
    new THREE.Group();

hangar.position.set(
    -5,
    0,
    15
);


/* Hangar body */

const hangarBody =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            45,
            18,
            30
        ),
        new THREE.MeshStandardMaterial({
            color: 0x39434d,
            metalness: 0.45,
            roughness: 0.55
        })
    );

hangarBody.position.y = 9;

hangar.add(hangarBody);


/* Hangar roof */

const hangarRoof =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            21,
            21,
            45,
            4
        ),
        new THREE.MeshStandardMaterial({
            color: 0x20262c,
            metalness: 0.5
        })
    );

hangarRoof.rotation.z =
    Math.PI / 2;

hangarRoof.position.y = 19;

hangar.add(hangarRoof);

spaceport.add(hangar);


/* =====================================================
   TERMINAL
===================================================== */

const terminal =
    new THREE.Group();

terminal.position.set(
    35,
    0,
    30
);

const terminalBody =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            45,
            16,
            18
        ),
        new THREE.MeshStandardMaterial({
            color: 0x687681,
            metalness: 0.4,
            roughness: 0.45
        })
    );

terminalBody.position.y = 8;

terminal.add(terminalBody);


/* Blue windows */

const terminalWindowMat =
    new THREE.MeshBasicMaterial({
        color: 0x20a9df
    });

for (let i = -2; i <= 2; i++) {

    const window =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6,
                5,
                0.2
            ),
            terminalWindowMat
        );

    window.position.set(
        i * 8,
        9,
        -9.1
    );

    terminal.add(window);
}

spaceport.add(terminal);


/* =====================================================
   ROCKET
===================================================== */

const rocket =
    new THREE.Group();

rocket.position.set(
    35,
    1,
    -15
);

spaceport.add(rocket);


/* Rocket body */

const rocketBody =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            3.5,
            3.8,
            20,
            12
        ),
        new THREE.MeshStandardMaterial({
            color: 0xd8d8d8,
            metalness: 0.65,
            roughness: 0.3
        })
    );

rocketBody.position.y = 11;

rocketBody.castShadow = true;

rocket.add(rocketBody);


/* Nose */

const nose =
    new THREE.Mesh(
        new THREE.ConeGeometry(
            3.5,
            7,
            12
        ),
        rocketBody.material
    );

nose.position.y = 24.5;

rocket.add(nose);


/* Rocket window */

const cockpit =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            1.25,
            10,
            8
        ),
        new THREE.MeshStandardMaterial({
            color: 0x168ed1,
            metalness: 0.8,
            roughness: 0.15
        })
    );

cockpit.scale.set(
    1,
    0.6,
    0.35
);

cockpit.position.set(
    0,
    17,
    -3.3
);

rocket.add(cockpit);


/* Rocket fins */

const finMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x252a30,
        metalness: 0.5
    });

function createRocketFin(x) {

    const fin =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1,
                6,
                4
            ),
            finMaterial
        );

    fin.position.set(
        x,
        5,
        0
    );

    fin.rotation.z =
        x > 0 ? -0.25 : 0.25;

    rocket.add(fin);
}

createRocketFin(3.3);
createRocketFin(-3.3);


/* Engine */

const engine =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            2,
            1.5,
            2.5,
            10
        ),
        finMaterial
    );

engine.position.y = 0;

rocket.add(engine);


/* Engine glow */

const engineLight =
    new THREE.PointLight(
        0x00aaff,
        3,
        20
    );

engineLight.position.y = -1;

rocket.add(engineLight);


/* =====================================================
   ASTRONAUT NPC
===================================================== */

function createAstronaut(
    x,
    z
) {

    const astronaut =
        new THREE.Group();

    astronaut.position.set(
        x,
        0,
        z
    );


    const suitMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xe7e7e7,
            roughness: 0.6
        });


    const helmetMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x152b3b,
            metalness: 0.7,
            roughness: 0.2
        });


    /* Body */

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.2,
                1.7,
                0.7
            ),
            suitMaterial
        );

    body.position.y = 2.1;

    astronaut.add(body);


    /* Helmet */

    const helmet =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.65,
                10,
                8
            ),
            helmetMaterial
        );

    helmet.position.y = 3.5;

    astronaut.add(helmet);


    /* Legs */

    for (
        const side of [-0.3, 0.3]
    ) {

        const leg =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.4,
                    1.4,
                    0.45
                ),
                suitMaterial
            );

        leg.position.set(
            side,
            0.7,
            0
        );

        astronaut.add(leg);
    }


    scene.add(astronaut);
}


/* Astronaut locations */

createAstronaut(
    20,
    -165
);

createAstronaut(
    50,
    -170
);

createAstronaut(
    -20,
    -175
);


/* =====================================================
   PLAYER
===================================================== */

const player =
    new THREE.Group();

scene.add(player);


/* Body */

const playerBody =
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

playerBody.position.y = 2.1;

playerBody.castShadow = true;

player.add(playerBody);


/* Head */

const playerHead =
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

playerHead.position.y = 3.35;

playerHead.castShadow = true;

player.add(playerHead);


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

player.add(rightArm);


/* Start near city */

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

setupButton("moveUp", "KeyW");
setupButton("moveDown", "KeyS");
setupButton("moveLeft", "KeyA");
setupButton("moveRight", "KeyD");
setupButton("runButton", "ShiftLeft");
setupButton("jumpButton", "Space");


/* =====================================================
   PHYSICS
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
       MOVEMENT
    --------------------------------- */

    let forward = 0;
    let side = 0;

    if (
        keys["KeyW"] ||
        keys["ArrowUp"]
    ) forward++;

    if (
        keys["KeyS"] ||
        keys["ArrowDown"]
    ) forward--;

    if (
        keys["KeyA"] ||
        keys["ArrowLeft"]
    ) side--;

    if (
        keys["KeyD"] ||
        keys["ArrowRight"]
    ) side++;


    const moving =
        forward !== 0 ||
        side !== 0;


    const running =
        keys["ShiftLeft"] ||
        keys["ShiftRight"];


    const speed =
        running
            ? runSpeed
            : walkSpeed;


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


        player.rotation.y =
            Math.atan2(
                side,
                forward
            );


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

        velocityY = jumpPower;

        grounded = false;

        keys["Space"] = false;
    }


    velocityY +=
        gravity * delta;

    player.position.y +=
        velocityY * delta;


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
       SPACEPORT DETECTION
    --------------------------------- */

    if (
        player.position.z < -145
    ) {

        status.textContent =
            "SPACEPORT";

    } else if (
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
       ROCKET DETECTION
    --------------------------------- */

    const rocketWorld =
        new THREE.Vector3();

    rocket.getWorldPosition(
        rocketWorld
    );

    const rocketDistance =
        player.position.distanceTo(
            rocketWorld
        );

    if (
        rocketDistance < 14
    ) {

        status.textContent =
            "🚀 ROCKET READY";
    }


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
