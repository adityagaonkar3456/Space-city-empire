import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function createMission1(scene, player, statusElement) {

    const mission = {
        active: false,
        completed: false,
        reward: 100,
        title: "FIRST CONTACT"
    };

    // Mission NPC
    const npc = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.35, 1, 6, 10),
        new THREE.MeshStandardMaterial({
            color: 0x8b3fa7
        })
    );

    body.position.y = 1;
    npc.add(body);

    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 16, 16),
        new THREE.MeshStandardMaterial({
            color: 0xc98f6b
        })
    );

    head.position.y = 1.85;
    npc.add(head);

    npc.position.set(12, 0, -12);
    scene.add(npc);

    // Mission marker
    const marker = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 0.12, 32),
        new THREE.MeshBasicMaterial({
            color: 0xffd21f
        })
    );

    marker.position.set(12, 0.08, -12);
    scene.add(marker);

    // Mission title
    function startMission() {
        mission.active = true;

        if (statusElement) {
            statusElement.innerText =
                "MISSION: Go to the mission contact";
        }
    }

    // Mission update
    function update() {

        if (mission.completed) return;

        const distance = player.position.distanceTo(npc.position);

        // Automatically start when player gets close
        if (!mission.active && distance < 8) {
            startMission();
        }

        // Complete mission
        if (mission.active && distance < 2.5) {

            mission.completed = true;

            marker.visible = false;

            if (statusElement) {
                statusElement.innerText =
                    "MISSION COMPLETE +$" + mission.reward;
            }

            console.log(
                "Mission 1 completed. Reward:",
                mission.reward
            );
        }

        // Floating marker effect
        if (marker.visible) {
            marker.position.y =
                0.15 + Math.sin(Date.now() * 0.004) * 0.12;

            marker.rotation.y += 0.02;
        }
    }

    return {
        mission,
        npc,
        marker,
        startMission,
        update
    };
}
