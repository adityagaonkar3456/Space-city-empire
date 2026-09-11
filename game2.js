import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function createCity(scene) {

    // =========================
    // MATERIALS
    // =========================

    const roadMaterial = new THREE.MeshStandardMaterial({
        color: 0x151a21,
        roughness: 0.9,
        metalness: 0.1
    });

    const sidewalkMaterial = new THREE.MeshStandardMaterial({
        color: 0x555b63,
        roughness: 0.85
    });

    const buildingMaterials = [
        new THREE.MeshStandardMaterial({
            color: 0x26313d,
            roughness: 0.7,
            metalness: 0.2
        }),
        new THREE.MeshStandardMaterial({
            color: 0x303844,
            roughness: 0.7,
            metalness: 0.15
        }),
        new THREE.MeshStandardMaterial({
            color: 0x202833,
            roughness: 0.75,
            metalness: 0.25
        })
    ];

    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0x123044,
        emissive: 0x07364b,
        emissiveIntensity: 0.7,
        metalness: 0.45,
        roughness: 0.25
    });

    const neonMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d9ff
    });

    const windowMaterial = new THREE.MeshBasicMaterial({
        color: 0xb8efff
    });

    const roadLineMaterial = new THREE.MeshBasicMaterial({
        color: 0xe8f7ff
    });

    // =========================
    // MAIN ROADS
    // =========================

    const road1 = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 28),
        roadMaterial
    );

    road1.rotation.x = -Math.PI / 2;
    road1.position.y = 0.035;
    road1.receiveShadow = true;

    scene.add(road1);

    const road2 = new THREE.Mesh(
        new THREE.PlaneGeometry(28, 500),
        roadMaterial
    );

    road2.rotation.x = -Math.PI / 2;
    road2.position.y = 0.04;
    road2.receiveShadow = true;

    scene.add(road2);

    // =========================
    // SIDEWALKS
    // =========================

    function sidewalk(x, z, w, d) {

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(w, 0.18, d),
            sidewalkMaterial
        );

        mesh.position.set(
            x,
            0.09,
            z
        );

        mesh.receiveShadow = true;

        scene.add(mesh);
    }

    sidewalk(0, 16, 500, 4);
    sidewalk(0, -16, 500, 4);

    sidewalk(16, 0, 4, 500);
    sidewalk(-16, 0, 4, 500);

    // =========================
    // ROAD CENTER LINES
    // =========================

    for (let z = -240; z <= 240; z += 12) {

        const line = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 0.35),
            roadLineMaterial
        );

        line.rotation.x = -Math.PI / 2;
        line.position.set(
            0,
            0.065,
            z
        );

        scene.add(line);
    }

    for (let x = -240; x <= 240; x += 12) {

        const line = new THREE.Mesh(
            new THREE.PlaneGeometry(0
