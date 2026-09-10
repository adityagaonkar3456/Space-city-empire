import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function createCity(scene) {

    const roadMaterial = new THREE.MeshLambertMaterial({
        color: 0x30343b
    });

    const buildingMaterial = new THREE.MeshLambertMaterial({
        color: 0x737b84
    });

    // Main road
    const road = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 18),
        roadMaterial
    );

    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.03;
    scene.add(road);

    // Cross road
    const crossRoad = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 500),
        roadMaterial
    );

    crossRoad.rotation.x = -Math.PI / 2;
    crossRoad.position.y = 0.04;
    scene.add(crossRoad);

    // Building function
    function building(x, z, w, h, d) {

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(w, h, d),
            buildingMaterial
        );

        mesh.position.set(
            x,
            h / 2,
            z
        );

        scene.add(mesh);
    }

    // City buildings
    building(-30, -30, 15, 30, 15);
    building(30, -30, 18, 42, 18);

    building(-30, 30, 18, 24, 18);
    building(30, 30, 15, 35, 15);

    building(-60, -55, 20, 38, 18);
    building(60, -55, 18, 28, 18);

    building(-60, 55, 18, 32, 18);
    building(60, 55, 22, 45, 20);

    return true;
}
