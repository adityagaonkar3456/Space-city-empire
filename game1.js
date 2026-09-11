import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { createCity } from "./game2.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

export function createGame1(canvas) {

    const scene = new THREE.Scene();

    // =========================
    // SKY + FOG
    // =========================

    scene.background = new THREE.Color(0x72a9d8);

    scene.fog = new THREE.Fog(
        0x72a9d8,
        100,
        450
    );

    // =========================
    // CAMERA
    // =========================

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        600
    );

    camera.position.set(0, 6, 12);

    // =========================
    // RENDERER
    // =========================

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,
        powerPreference: "high-performance"
    });

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 1.25)
    );

    // =========================
    // LIGHT
    // =========================

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
    sun.shadow.mapSize.height = 1024;

    sun.position.set(80, 120, 60);

    scene.add(sun);

    // =========================
    // GROUND
    // =========================

    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500),
        new THREE.MeshLambertMaterial({
            color: 0x3d8f42
        })
    );

    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;

    ground.receiveShadow = true;

    scene.add(ground);

    // =========================
    // CITY
    // =========================

    createCity(scene);

    // =========================
    // PLAYER GROUP
    // =========================

    const player = new THREE.Group();

    player.position.set(0, 0, 20);

    scene.add(player);

    // =========================
    // GLB HUMAN
    // =========================

    const loader = new GLTFLoader();

    let humanModel = null;
    let mixer = null;

    loader.load(
        "./models/human/casual_male-architectural_updated.glb",

        (gltf) => {

            humanModel = gltf.scene;

            humanModel.scale.set(
                1.8,
                1.8,
                1.8
            );

            humanModel.position.set(
                0,
                0,
                0
            );

            humanModel.traverse((object) => {

                if (object.isMesh) {

                    object.castShadow = true;
                    object.receiveShadow = true;

                }

            });

            player.add(humanModel);

            // =========================
            // GLB ANIMATION
            // =========================

            if (gltf.animations &&
                gltf.animations.length > 0) {

                mixer = new THREE.AnimationMixer(
                    humanModel
                );

                const action =
                    mixer.clipAction(
                        gltf.animations[0]
                    );

                action.play();
            }

            console.log(
                "GLB HUMAN LOADED"
            );

        },

        undefined,

        (error) => {

            console.error(
                "GLB LOAD ERROR:",
                error
            );

        }
    );

    // =========================
    // PLAYER SHADOW
    // =========================

    player.traverse((object) => {

        if (object.isMesh) {

            object.castShadow = true;
            object.receiveShadow = true;

        }

    });

    // =========================
    // UPDATE GLB ANIMATION
    // =========================

    function updatePlayerAnimation(delta) {

        if (mixer) {
            mixer.update(delta);
        }

    }

    return {
        THREE,
        scene,
        camera,
        renderer,
        player,
        updatePlayerAnimation
    };
}
