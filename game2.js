import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function createCity(scene) {

    // =========================
    // MATERIALS
    // =========================

    const roadMaterial = new THREE.MeshStandardMaterial({
        color: 0x171c24,
        roughness: 0.85,
        metalness: 0.15
    });

    const sidewalkMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a5260,
        roughness: 0.9
    });

    const buildingMaterial = new THREE.MeshStandardMaterial({
        color: 0x252d38,
        roughness: 0.65,
        metalness: 0.25
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0x102a3d,
        emissive: 0x06354d,
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.25
    });

    const neonMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d9ff
    });

    const roadLineMaterial = new THREE.MeshBasicMaterial({
        color: 0xe8f7ff
    });

    // =========================
    // MAIN ROADS
    // =========================

    const road = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 20),
        roadMaterial
    );

    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.035;
    road.receiveShadow = true;
    scene.add(road);

    const crossRoad = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 500),
        roadMaterial
    );

    crossRoad.rotation.x = -Math.PI / 2;
    crossRoad.position.y = 0.04;
    crossRoad.receiveShadow = true;
    scene.add(crossRoad);

    // =========================
    // ROAD CENTER LINES
    // =========================

    for (let z = -240; z <= 240; z += 12) {

        const line = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 0.35),
            roadLineMaterial
        );

        line.rotation.x = -Math.PI / 2;
        line.position.set(0, 0.06, z);

        scene.add(line);
    }

    for (let x = -240; x <= 240; x += 12) {

        const line = new THREE.Mesh(
            new THREE.PlaneGeometry(0.35, 5),
            roadLineMaterial
        );

        line.rotation.x = -Math.PI / 2;
        line.position.set(x, 0.07, 0);

        scene.add(line);
    }

    // =========================
    // BUILDING FUNCTION
    // =========================

    function building(x, z, w, h, d) {

        const group = new THREE.Group();

        const main = new THREE.Mesh(
            new THREE.BoxGeometry(w, h, d),
            buildingMaterial
        );

        main.position.y = h / 2;
        main.castShadow = true;
        main.receiveShadow = true;

        group.add(main);

        // Glass front
        const glass = new THREE.Mesh(
            new THREE.BoxGeometry(
                w * 0.72,
                h * 0.78,
                0.08
            ),
            glassMaterial
        );

        glass.position.set(
            0,
            h * 0.55,
            -d / 2 - 0.05
        );

        group.add(glass);

        // Neon roof
        const roof = new THREE.Mesh(
            new THREE.BoxGeometry(
                w * 0.85,
                0.12,
                d * 0.85
            ),
            neonMaterial
        );

        roof.position.y = h + 0.08;

        group.add(roof);

        // Vertical neon strip
        const strip = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.08,
                h * 0.8,
                0.08
            ),
            neonMaterial
        );

        strip.position.set(
            w * 0.35,
            h * 0.5,
            -d / 2 - 0.1
        );

        group.add(strip);

        group.position.set(x, 0, z);

        scene.add(group);
    }

    // =========================
    // CITY
    // =========================

    building(-30, -30, 16, 32, 16);
    building(30, -30, 20, 48, 20);

    building(-30, 30, 20, 28, 20);
    building(30, 30, 16, 38, 16);

    building(-60, -55, 22, 42, 20);
    building(60, -55, 20, 34, 20);

    building(-60, 55, 20, 38, 20);
    building(60, 55, 24, 52, 22);

    // =========================
    // STREET LIGHT
    // =========================

    function streetLight(x, z) {

        const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.08,
                0.12,
                5,
                8
            ),
            buildingMaterial
        );

        pole.position.set(x, 2.5, z);
        pole.castShadow = true;

        scene.add(pole);

        const lamp = new THREE.Mesh(
            new THREE.SphereGeometry(0.22, 12, 8),
            new THREE.MeshBasicMaterial({
                color: 0xb8f5ff
            })
        );

        lamp.position.set(x, 5, z);

        scene.add(lamp);
    }

    streetLight(-10, -10);
    streetLight(10, -10);
    streetLight(-10, 10);
    streetLight(10, 10);
   // CITY V1.1 - EXTRA STREET LIGHTS

function extraStreetLight(x, z) {
    const poleMaterial = new THREE.MeshStandardMaterial({
        color: 0x20252c,
        metalness: 0.7,
        roughness: 0.4
    });

    const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.12, 5, 8),
        poleMaterial
    );

    pole.position.set(x, 2.5, z);
    pole.castShadow = true;
    scene.add(pole);

    const lampMaterial = new THREE.MeshBasicMaterial({
        color: 0x9eeaff
    });

    const lamp = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 12, 8),
        lampMaterial
    );

    lamp.position.set(x, 5, z);
    scene.add(lamp);
}

// Long road lights
extraStreetLight(-8, -35);
extraStreetLight(8, -35);

extraStreetLight(-8, 35);
extraStreetLight(8, 35);

extraStreetLight(-35, -8);
extraStreetLight(-35, 8);

extraStreetLight(35, -8);
extraStreetLight(35, 8);
    
    // CITY V1.2 - PARKED CAR

function createCar(x, z, rotation = 0) {

    const car = new THREE.Group();

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x182b4a,
        metalness: 0.6,
        roughness: 0.35
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0x07151f,
        metalness: 0.5,
        roughness: 0.2
    });

    // Car body
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.55, 4.5),
        bodyMaterial
    );

    body.position.y = 0.55;
    body.castShadow = true;
    car.add(body);

    // Upper cabin
    const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.65, 2.1),
        glassMaterial
    );

    cabin.position.set(0, 1.05, -0.15);
    cabin.castShadow = true;
    car.add(cabin);

    // Wheels
    const wheelMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.8
    });

    const wheelPositions = [
        [-1.15, 0.38, -1.45],
        [ 1.15, 0.38, -1.45],
        [-1.15, 0.38,  1.45],
        [ 1.15, 0.38,  1.45]
    ];

    for (const p of wheelPositions) {

        const wheel = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.38,
                0.38,
                0.22,
                16
            ),
            wheelMaterial
        );

        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(p[0], p[1], p[2]);
        wheel.castShadow = true;

        car.add(wheel);
    }

    car.position.set(x, 0, z);
    car.rotation.y = rotation;

    scene.add(car);

    return car;
}

// Parked vehicles
createCar(-5, -12, 0);
createCar(5, 12, Math.PI);

    // CITY V1.3 - MOVING TEST CAR

const movingCar = createCar(-220, -6, 0);

movingCar.userData.speed = 0.12;

function updateMovingCar() {
    movingCar.position.x += movingCar.userData.speed;

    // Reach the end of the road -> return to start
    if (movingCar.position.x > 220) {
        movingCar.position.x = -220;
    }
}

scene.userData.updateMovingCar = updateMovingCar;
    return true;
}
