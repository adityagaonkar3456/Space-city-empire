import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* =========================================
   SETUP
========================================= */

const canvas =
    document.getElementById("gameCanvas");

const status =
    document.getElementById("gameStatus");

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x87ceeb);

scene.fog =
    new THREE.Fog(
        0x87ceeb,
        100,
        420
    );

/* =========================================
   CAMERA
========================================= */

const camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
        window.innerHeight,
        0.1,
        1200
    );

camera.position.set(
    0,
    7,
    14
);

/* =========================================
   RENDERER
========================================= */

const renderer =
    new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

/* =========================================
   LIGHTING
========================================= */

const sky =
    new THREE.HemisphereLight(
        0xffffff,
        0x304030,
        2.2
    );

scene.add(sky);

const sun =
    new THREE.DirectionalLight(
        0xffffff,
        3.2
    );

sun.position.set(
    100,
    150,
    80
);

sun.castShadow = true;

sun.shadow.mapSize.width =
    2048;

sun.shadow.mapSize.height =
    2048;

sun.shadow.camera.left =
    -220;

sun.shadow.camera.right =
    220;

sun.shadow.camera.top =
    220;

sun.shadow.camera.bottom =
    -220;

scene.add(sun);

/* =========================================
   GROUND
========================================= */

const ground =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            600,
            600
        ),
        new THREE.MeshStandardMaterial({
            color: 0x3f7042,
            roughness: 1
        })
    );

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);

/* =========================================
   ROADS
========================================= */

function createRoad(
    x,
    z,
    width,
    length,
    rotation = 0
) {

    const road =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                width,
                length
            ),
            new THREE.MeshStandardMaterial({
                color: 0x252525,
                roughness: 0.95
            })
        );

    road.rotation.x =
        -Math.PI / 2;

    road.rotation.z =
        rotation;

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
    24,
    600
);

createRoad(
    0,
    0,
    600,
    24
);

createRoad(
    -90,
    0,
    18,
    600
);

createRoad(
    90,
    0,
    18,
    600
);

createRoad(
    0,
    -100,
    600,
    18
);

createRoad(
    0,
    100,
    600,
    18
);

/* =========================================
   ROAD MARKINGS
========================================= */

const roadLineMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffffff
    });

function roadLine(
    x,
    z,
    width,
    length
) {

    const line =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                width,
                length
            ),
            roadLineMaterial
        );

    line.rotation.x =
        -Math.PI / 2;

    line.position.set(
        x,
        0.055,
        z
    );

    scene.add(line);
}

/* Vertical road */

for (
    let z = -285;
    z <= 285;
    z += 12
) {

    roadLine(
        0,
        z,
        0.35,
        6
    );

    roadLine(
        -90,
        z,
        0.35,
        5
    );

    roadLine(
        90,
        z,
        0.35,
        5
    );
}

/* Horizontal road */

for (
    let x = -285;
    x <= 285;
    x += 12
) {

    const line =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                6,
                0.35
            ),
            roadLineMaterial
        );

    line.rotation.x =
        -Math.PI / 2;

    line.position.set(
        x,
        0.055,
        0
    );

    scene.add(line);

    const line2 =
        line.clone();

    line2.position.z =
        100;

    scene.add(line2);

    const line3 =
        line.clone();

    line3.position.z =
        -100;

    scene.add(line3);
}

/* =========================================
   BUILDINGS
========================================= */

const buildingColors = [
    0x70747a,
    0x8a8178,
    0x626b73,
    0x77736d,
    0x59636b,
    0x858585
];

function createBuilding(
    x,
    z,
    width,
    height,
    depth
) {

    const building =
        new THREE.Group();

    /* Main structure */

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),
            new THREE.MeshStandardMaterial({
                color:
                    buildingColors[
                        Math.floor(
                            Math.random() *
                            buildingColors.length
                        )
                    ],
                roughness: 0.8
            })
        );

    body.position.y =
        height / 2;

    body.castShadow = true;

    body.receiveShadow = true;

    building.add(body);

    /* Roof */

    const roof =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width + 0.5,
                0.4,
                depth + 0.5
            ),
            new THREE.MeshStandardMaterial({
                color: 0x303030
            })
        );

    roof.position.y =
        height + 0.2;

    roof.castShadow = true;

    building.add(roof);

    /* Windows */

    const windowMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x9fdcff,
            emissive: 0x16394a,
            roughness: 0.25
        });

    const rows =
        Math.max(
            2,
            Math.floor(
                height / 3
            )
        );

    const columns =
        Math.max(
            2,
            Math.floor(
                width / 3
            )
        );

    for (
        let row = 0;
        row < rows;
        row++
    ) {

        for (
            let col = 0;
            col < columns;
            col++
        ) {

            /* Front windows */

            const win =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.8,
                        1.1,
                        0.08
                    ),
                    windowMaterial
                );

            win.position.set(
                -width / 2 +
                    1.5 +
                    col * 3,
                2 +
                    row * 3,
                depth / 2 + 0.05
            );

            building.add(win);

            /* Back windows */

            const back =
                win.clone();

            back.position.z =
                -depth / 2 - 0.05;

            building.add(back);
        }
    }

    building.position.set(
        x,
        0,
        z
    );

    scene.add(building);
}

/* =========================================
   CITY BLOCKS
========================================= */

const roadXs = [
    -90,
    0,
    90
];

const roadZs = [
    -100,
    0,
    100
];

for (
    let x = -240;
    x <= 240;
    x += 45
) {

    for (
        let z = -240;
        z <= 240;
        z += 45
    ) {

        let nearRoad = false;

        for (
            const rx of roadXs
        ) {

            if (
                Math.abs(
                    x - rx
                ) < 25
            ) {
                nearRoad = true;
            }
        }

        for (
            const rz of roadZs
        ) {

            if (
                Math.abs(
                    z - rz
                ) < 25
            ) {
                nearRoad = true;
            }
        }

        if (nearRoad)
            continue;

        const height =
            12 +
            Math.random() * 45;

        const width =
            24 +
            Math.random() * 10;

        const depth =
            24 +
            Math.random() * 10;

        createBuilding(
            x +
                (Math.random() - 0.5) *
                8,
            z +
                (Math.random() - 0.5) *
                8,
            width,
            height,
            depth
        );
    }
}

/* =========================================
   TREES
========================================= */

function createTree(
    x,
    z
) {

    const tree =
        new THREE.Group();

    const trunk =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.45,
                0.7,
                4,
                10
            ),
            new THREE.MeshStandardMaterial({
                color: 0x68411f
            })
        );

    trunk.position.y =
        2;

    trunk.castShadow = true;

    tree.add(trunk);

    const leaves =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                3,
                16,
                16
            ),
            new THREE.MeshStandardMaterial({
                color: 0x206b2c,
                roughness: 0.9
            })
        );

    leaves.position.y =
        6;

    leaves.castShadow = true;

    tree.add(leaves);

    tree.position.set(
        x,
        0,
        z
    );

    scene.add(tree);
}

/* Street trees */

for (
    let x = -250;
    x <= 250;
    x += 20
) {

    createTree(
        x,
        17
    );

    createTree(
        x,
        -17
    );
}

/* =========================================
   STREET LIGHTS
========================================= */

function createStreetLight(
    x,
    z
) {

    const group =
        new THREE.Group();

    const pole =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.12,
                0.18,
                7,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x333333,
                metalness: 0.7,
                roughness: 0.3
            })
        );

    pole.position.y =
        3.5;

    pole.castShadow = true;

    group.add(pole);

    const lamp =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.35,
                12,
                12
            ),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0xffffff,
                emissiveIntensity: 2
            })
        );

    lamp.position.y =
        7;

    group.add(lamp);

    const light =
        new THREE.PointLight(
            0xffffff,
            1.2,
            20
        );

    light.position.y =
        7;

    group.add(light);

    group.position.set(
        x,
        0,
        z
    );

    scene.add(group);
}

for (
    let z = -240;
    z <= 240;
    z += 40
) {

    createStreetLight(
        13,
        z
    );

    createStreetLight(
        -13,
        z
    );
}

/* =========================================
   TRAFFIC LIGHTS
========================================= */

function createTrafficLight(
    x,
    z
) {

    const group =
        new THREE.Group();

    const pole =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.15,
                0.2,
                5,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x222222
            })
        );

    pole.position.y =
        2.5;

    group.add(pole);

    const housing =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.8,
                2.2,
                0.6
            ),
            new THREE.MeshStandardMaterial({
                color: 0x111111
            })
        );

    housing.position.y =
        5;

    group.add(housing);

    const colors = [
        0xff0000,
        0xffff00,
        0x00ff55
    ];

    colors.forEach(
        (color, index) => {

            const bulb =
                new THREE.Mesh(
                    new THREE.SphereGeometry(
                        0.18,
                        12,
                        12
                    ),
                    new THREE.MeshStandardMaterial({
                        color,
                        emissive: color,
                        emissiveIntensity: 1.5
                    })
                );

            bulb.position.set(
                0,
                4.35 +
                    index * 0.65,
                0.32
            );

            group.add(bulb);
        }
    );

    group.position.set(
        x,
        0,
        z
    );

    scene.add(group);
}

createTrafficLight(
    14,
    14
);

createTrafficLight(
    -14,
    -14
);

createTrafficLight(
    104,
    14
);

createTrafficLight(
    -104,
    -14
);

/* =========================================
   CARS
========================================= */

function createCar(
    color
) {

    const car =
        new THREE.Group();

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                3.2,
                0.8,
                5
            ),
            new THREE.MeshStandardMaterial({
                color,
                metalness: 0.25,
                roughness: 0.45
            })
        );

    body.position.y =
        0.8;

    body.castShadow = true;

    car.add(body);

    const cabin =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.4,
                0.8,
                2.3
            ),
            new THREE.MeshStandardMaterial({
                color: 0x1e2930,
                metalness: 0.2,
                roughness: 0.2
            })
        );

    cabin.position.set(
        0,
        1.45,
        -0.15
    );

    cabin.castShadow = true;

    car.add(cabin);

    const wheelMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111111,
            roughness: 1
        });

    const wheelPositions = [
        [-1.45, 0.45, -1.6],
        [1.45, 0.45, -1.6],
        [-1.45, 0.45, 1.6],
        [1.45, 0.45, 1.6]
    ];

    wheelPositions.forEach(
        position => {

            const wheel =
                new THREE.Mesh(
                    new THREE.CylinderGeometry(
                        0.45,
                        0.45,
                        0.35,
                        16
                    ),
                    wheelMaterial
                );

            wheel.rotation.z =
                Math.PI / 2;

            wheel.position.set(
                position[0],
                position[1],
                position[2]
            );

            wheel.castShadow = true;

            car.add(wheel);
        }
    );

    return car;
}

/* Moving cars */

const cars = [];

for (
    let i = 0;
    i < 8;
    i++
) {

    const car =
        createCar(
            new THREE.Color()
                .setHSL(
                    Math.random(),
                    0.7,
                    0.5
                )
        );

    car.position.set(
        -260 + i * 65,
        0,
        -6
    );

    scene.add(car);

    cars.push({
        object: car,
        speed:
            12 +
            Math.random() * 8
    });
}

/* =========================================
   PLAYER
========================================= */

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

playerBody.position.y =
    2.1;

playerBody.castShadow = true;

player.add(playerBody);

/* Head */

const playerHead =
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

playerHead.position.y =
    3.35;

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

player.position.set(
    0,
    0,
    35
);

/* =========================================
   INPUT
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
   MOBILE INPUT
========================================= */

function setupButton(
    id,
    key
) {

    const button =
        document.getElementById(id);

    if (!button)
        return;

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
   PHYSICS
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

    /* =====================================
       PLAYER MOVEMENT
    ===================================== */

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

        const angle =
            Math.atan2(
                side,
                forward
            );

        player.rotation.y =
            angle;

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

    /* =====================================
       JUMP
    ===================================== */

    if (
        keys["Space"] &&
        grounded
    ) {

        velocityY =
            jumpPower;

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

    /* =====================================
       CITY BOUNDARY
    ===================================== */

    player.position.x =
        THREE.MathUtils.clamp(
            player.position.x,
            -280,
            280
        );

    player.position.z =
        THREE.MathUtils.clamp(
            player.position.z,
            -280,
            280
        );

    /* =====================================
       CAR MOVEMENT
    ===================================== */

    cars.forEach(
        car => {

            car.object.position.x +=
                car.speed * delta;

            if (
                car.object.position.x >
                300
            ) {

                car.object.position.x =
                    -300;
            }
        }
    );

    /* =====================================
       CAMERA
    ===================================== */

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

    /* =====================================
       HUD
    ===================================== */

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
            "CITY EXPLORATION";
    }

    renderer.render(
        scene,
        camera
    );
}

/* =========================================
   RESIZE
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
   START
========================================= */

status.textContent =
    "CITY READY";

animate();
