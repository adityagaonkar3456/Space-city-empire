import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function createGame1(canvas) {

    const scene = new THREE.Scene();
    
    // SKY
    scene.background = new THREE.Color(0x72a9d8);

    scene.fog = new THREE.Fog(
        0x72a9d8,
        100,
        450
    );

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        600
    );

    camera.position.set(0, 6, 12);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,
        powerPreference: "high-performance"
    });
    renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 1.25)
    );

    // LIGHT
    scene.add(
        new THREE.HemisphereLight(
            0xffffff,
            0x334433,
            2.2
        )
    );

    const sun = new THREE.DirectionalLight(
        0xffffff,
        1.8
    );
    sun.castShadow = true;
sun.shadow.mapSize.width = 1024;
    sun.position.set(80, 120, 60);
    scene.add(sun);

    // GREEN LAND
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500),
        new THREE.MeshLambertMaterial({
            color: 0x3d8f42
        })
    );

    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;

    scene.add(ground);

    // =========================
    // PLAYER
    // =========================

    const player = new THREE.Group();
    
    // PLAYER BODY
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 2.2, 1),
        new THREE.MeshStandardMaterial({
            color: 0x0088ff,
            roughness: 0.6
        })
    );

    body.position.y = 2.1;
    player.add(body);

    // PLAYER HEAD
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.72, 16, 12),
        new THREE.MeshStandardMaterial({
            color: 0xffc49b,
            roughness: 0.7
        })
    );

    head.position.y = 3.7;
    player.add(head);

    // VISOR
    const visor = new THREE.Mesh(
        new THREE.SphereGeometry(0.45, 16, 8),
        new THREE.MeshStandardMaterial({
            color: 0x111827,
            metalness: 0.5,
            roughness: 0.2
        })
    );

    visor.scale.set(1, 0.65, 0.5);
    visor.position.set(0, 3.75, -0.55);

    player.add(visor);

    // LEFT LEG
    const leftLeg = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 1.5, 0.55),
        new THREE.MeshStandardMaterial({
            color: 0x20242a
        })
    );

    leftLeg.position.set(-0.4, 0.75, 0);
    player.add(leftLeg);

    // RIGHT LEG
    const rightLeg = leftLeg.clone();

    rightLeg.position.x = 0.4;
    player.add(rightLeg);

    // LEFT ARM
    const leftArm = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 1.5, 0.45),
        new THREE.MeshStandardMaterial({
            color: 0x0088ff
        })
    );

    leftArm.position.set(-1, 2.1, 0);
    player.add(leftArm);

    // RIGHT ARM
    const rightArm = leftArm.clone();

    rightArm.position.x = 1;
    player.add(rightArm);

    // PLAYER MARKER
    const marker = new THREE.Mesh(
        new THREE.RingGeometry(1.2, 1.5, 32),
        new THREE.MeshBasicMaterial({
            color: 0xffff00,
            side: THREE.DoubleSide
        })
    );

    marker.rotation.x = -Math.PI / 2;
    marker.position.y = 0.03;

    player.add(marker);

    // PLAYER START POSITION
    player.position.set(0, 0, 20);

    scene.add(player);

    return {
        THREE,
        scene,
        camera,
        renderer,
        player
    };
}
