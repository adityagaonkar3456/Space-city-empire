import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function createMission1(scene, player, statusElement) {

    const mission = {
        active: false,
        completed: false,
        reward: 100,
        title: "FIRST CONTACT",
        objective: "Meet the mission contact"
    };

    // =========================
    // DEBUG DISPLAY ELEMENT
    // =========================
    const debugDisplay = document.createElement("div");
    debugDisplay.id = "mission1-debug-display";
    debugDisplay.style.position = "fixed";
    debugDisplay.style.top = "20px";
    debugDisplay.style.right = "20px";
    debugDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    debugDisplay.style.color = "#00ff00";
    debugDisplay.style.fontFamily = "monospace";
    debugDisplay.style.fontSize = "14px";
    debugDisplay.style.padding = "15px";
    debugDisplay.style.borderRadius = "8px";
    debugDisplay.style.border = "2px solid #00ff00";
    debugDisplay.style.zIndex = "9999";
    debugDisplay.style.lineHeight = "1.6";
    debugDisplay.style.minWidth = "200px";
    debugDisplay.style.pointerEvents = "none";
    document.body.appendChild(debugDisplay);

    // =========================
    // MISSION NPC
    // =========================

    const npc = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.35, 1, 6, 10),
        new THREE.MeshStandardMaterial({
            color: 0x8b3fa7
        })
    );

    body.position.y = 1;
    body.castShadow = true;
    npc.add(body);

    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 16, 16),
        new THREE.MeshStandardMaterial({
            color: 0xc98f6b
        })
    );

    head.position.y = 1.85;
    head.castShadow = true;
    npc.add(head);

    npc.position.set(12, 0, -12);
    scene.add(npc);

    // =========================
    // MISSION MARKER
    // =========================

    const marker = new THREE.Mesh(
        new THREE.CylinderGeometry(
            1.2,
            1.2,
            0.12,
            32
        ),
        new THREE.MeshBasicMaterial({
            color: 0xffd21f
        })
    );

    marker.position.set(12, 0.08, -12);
    scene.add(marker);

    // =========================
    // START MISSION
    // =========================

    function startMission() {

        if (mission.active || mission.completed) {
            return;
        }

        mission.active = true;

        console.log(`[Mission1 DEBUG - START] Player: (${player.position.x.toFixed(2)}, ${player.position.z.toFixed(2)}) | NPC: (${npc.position.x.toFixed(2)}, ${npc.position.z.toFixed(2)}) | Activ[...]

        if (statusElement) {
            statusElement.innerText =
                "MISSION START: Meet the contact";
        }

        console.log("MISSION 1 STARTED");
        console.log("Story: Someone is waiting for you.");
    }

    // =========================
    // COMPLETE MISSION
    // =========================

    function completeMission() {

        if (mission.completed) {
            return;
        }

        mission.completed = true;
        mission.active = false;

        console.log(`[Mission1 DEBUG - COMPLETE] Player: (${player.position.x.toFixed(2)}, ${player.position.z.toFixed(2)}) | NPC: (${npc.position.x.toFixed(2)}, ${npc.position.z.toFixed(2)}) | A[...]

        marker.visible = false;

        if (statusElement) {
            statusElement.innerText =
                "MISSION COMPLETE  +$" + mission.reward;
        }

        console.log("MISSION 1 COMPLETE");
        console.log("Reward: $" + mission.reward);
    }

    // =========================
    // UPDATE
    // =========================

    function update() {

        if (mission.completed) {
            return;
        }

        const dx = player.position.x - npc.position.x;
        const dz = player.position.z - npc.position.z;

        const distance = Math.sqrt(
            dx * dx + dz * dz
        );

        // Log only when distance <= 10
        if (distance <= 10) {
            console.log(`[Mission1 DEBUG] Player: (${player.position.x.toFixed(2)}, ${player.position.z.toFixed(2)}) | NPC: (${npc.position.x.toFixed(2)}, ${npc.position.z.toFixed(2)}) | Distance[...]
        }

         

        // Player reaches mission area
        if (!mission.active && distance < 8) {
            startMission();
        }

        // Player reaches NPC - log completion condition check
        if (mission.active && distance < 5) {
            console.log(`[Mission1 DEBUG - COMPLETION CHECK] Distance ${distance.toFixed(2)} < 5, calling completeMission()`);
            completeMission();
        }

        // Floating marker
        if (marker.visible) {

            marker.position.y =
                0.15 +
                Math.sin(Date.now() * 0.004) * 0.12;

            marker.rotation.y += 0.02;
        }
    }

    return {
        mission,
        npc,
        marker,
        startMission,
        completeMission,
        update
    };
}
