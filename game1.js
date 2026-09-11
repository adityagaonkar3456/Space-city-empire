import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { createCity } from "./game2.js";

export function createGame1(canvas) {

    const scene = new THREE.Scene();

    // SKY
    scene.background = new THREE.Color(0x72a9d8);

    scene.fog = new THREE.Fog(
        0x72a9d8,
        80,
        400
    );

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        600
    );

    camera.position.set(0, 5, 12);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,
        powerPreference: "high-performance"
    });

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 1.25)
    );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    // LIGHT
    const hemi = new THREE.HemisphereLight(
        0xffffff,
        0x334433,
        2
    );

    scene.add(hemi);

    const sun = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    sun.position.set(80, 120, 60);
    sun.castShadow = true;

    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;

    scene.add(sun);

    // GROUND
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500),
        new THREE.MeshLambertMaterial({
            color: 0x3d8f42
        })
    );

    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;

    scene.add(ground);

    // CITY
    createCity(scene);

    // =========================
    // PLAYER
    // =========================

    const player = new THREE.Group();

    player.position.set(0, 0, 20);

    scene.add(player);

    // BODY
    const body = new THREE.Mesh(
        new THREE.CapsuleGeometry(
            0.38,
            1.0,
            6,
            12
        ),
        new THREE.MeshStandardMaterial({
            color: 0x3155aa,
            roughness: 0.7
        })
    );

    body.position.y = 1.15;
    body.castShadow = true;

    player.add(body);

    // HEAD
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.34,
            16,
            16
        ),
        new THREE.MeshStandardMaterial({
            color: 0xc98f6b,
            roughness: 0.8
        })
    );

    head.position.y = 2.05;
    head.castShadow = true;

    player.add(head);

    // LEFT ARM
    const leftArm = new THREE.Mesh(
        new THREE.CapsuleGeometry(
            0.11,
            0.65,
            5,
            8
        ),
        new THREE.MeshStandardMaterial({
            color: 0x3155aa
        })
    );

    leftArm.position.set(
        -0.5,
        1.3,
        0
    );

    leftArm.rotation.z = -0.12;
    leftArm.castShadow = true;

    player.add(leftArm);

    // RIGHT ARM
    const rightArm = new THREE.Mesh(
        new THREE.CapsuleGeometry(
            0.11,
            0.65,
            5,
            8
        ),
        new THREE.MeshStandardMaterial({
            color: 0x3155aa
        })
    );

    rightArm.position.set(
        0.5,
        1.3,
        0
    );

    rightArm.rotation.z = 0.12;
    rightArm.castShadow = true;

    player.add(rightArm);

    // LEFT LEG
    const leftLeg = new THREE.Mesh(
        new THREE.CapsuleGeometry(
            0.13,
            0.75,
            5,
            8
        ),
        new THREE.MeshStandardMaterial({
            color: 0x202838
        })
    );

    leftLeg.position.set(
        -0.2,
        0.45,
        0
    );

    leftLeg.castShadow = true;

    player.add(leftLeg);

    // RIGHT LEG
    const rightLeg = new THREE.Mesh(
        new THREE.CapsuleGeometry(
            0.13,
            0.75,
            5,
            8
        ),
        new THREE.MeshStandardMaterial({
            color: 0x202838
        })
    );

    rightLeg.position.set(
        0.2,
        0.45,
        0
    );

    rightLeg.castShadow = true;

    player.add(rightLeg);

    // PLAYER PARTS
    const playerParts = {
        body,
        head,
        leftArm,
        rightArm,
        leftLeg,
        rightLeg
    };

    // =========================
    // ANIMATION
    // =========================

    let walkTime = 0;

    function updatePlayerAnimation(
        delta,
        moving,
        running
    ) {

        if (!moving) {

            leftArm.rotation.x = 0;
            rightArm.rotation.x = 0;

            leftLeg.rotation.x = 0;
            rightLeg.rotation.x = 0;

            return;
        }

        const speed =
            running ? 10 : 6;

        walkTime += delta * speed;

        const swing =
            Math.sin(walkTime) * 0.65;

        leftArm.rotation.x = swing;
        rightArm.rotation.x = -swing;

        leftLeg.rotation.x = -swing;
        rightLeg.rotation.x = swing;
    }

    return {
        THREE,
        scene,
        camera,
        renderer,
        player,
        playerParts,
        updatePlayerAnimation
    };
}
