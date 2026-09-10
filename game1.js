import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function createGame1(canvas) {

    // =========================
    // SCENE
    // =========================

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x72a9d8);

    scene.fog = new THREE.Fog(
        0x72a9d8,
        80,
        400
    );

    // =========================
    // CAMERA
    // =========================

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        500
    );

    camera.position.set(0, 6, 10);

    // =========================
    // RENDERER
    // =========================

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
        Math.min(
            window.devicePixelRatio || 1,
            1.25
        )
    );

    // =========================
    // LIGHT
    // =========================

    const skyLight =
        new THREE.HemisphereLight(
            0xffffff,
            0x445544,
            2
        );

    scene.add(skyLight);

    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            1.5
        );

    sun.position.set(
        80,
        120,
        60
    );

    scene.add(sun);

    // =========================
    // GROUND
    // =========================

    const ground =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                500,
                500
            ),

            new THREE.MeshLambertMaterial({
                color: 0x3d8f42
            })
        );

    ground.rotation.x =
        -Math.PI / 2;

    scene.add(ground);

    // =========================
    // PLAYER
    // =========================

    const player =
        new THREE.Group();

    // Body

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.4,
                2.2,
                1
            ),

            new THREE.MeshLambertMaterial({
                color: 0x168cff
            })
        );

    body.position.y = 2;

    player.add(body);

    // Head

    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.7,
                12,
                8
            ),

            new THREE.MeshLambertMaterial({
                color: 0xffc49b
            })
        );

    head.position.y = 3.6;

    player.add(head);

    // Left leg

    const leftLeg =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.5,
                1.5,
                0.5
            ),

            new THREE.MeshLambertMaterial({
                color: 0x20242a
            })
        );

    leftLeg.position.set(
        -0.4,
        0.75,
        0
    );

    player.add(leftLeg);

    // Right leg

    const rightLeg =
        leftLeg.clone();

    rightLeg.position.x = 0.4;

    player.add(rightLeg);

    // Add player

    scene.add(player);

    player.position.set(
        0,
        0,
        20
    );

    // =========================
    // RETURN GAME OBJECTS
    // =========================

    return {

        THREE: THREE,

        scene: scene,

        camera: camera,

        renderer: renderer,

        player: player
    };
}
