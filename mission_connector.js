import { createMission1 } from "./mission1.js";

export function createMissionSystem(scene, player, statusElement) {

    const mission1 = createMission1(
        scene,
        player,
        statusElement
    );

    function update() {
        mission1.update();
    }

    return {
        mission1,
        update
    };
}
