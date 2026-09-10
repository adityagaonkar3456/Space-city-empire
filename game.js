import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* =========================
   BASIC SETUP
========================= */

const canvas = document.getElementById("gameCanvas");
const status = document.getElementById("gameStatus");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x78b7e8);
scene.fog = new THREE.Fog(0x78b7e8, 80, 500);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 7, 12);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: false,
  powerPreference: "high-performance"
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));

/* =========================
   LIGHT
========================= */

scene.add(new THREE.HemisphereLight(0xffffff, 0x445544, 1.8));

const sun = new THREE.DirectionalLight(0xffffff, 1.5);
sun.position.set(100, 150, 80);
scene.add(sun);

/* =========================
   MATERIALS
========================= */

const green = new THREE.MeshLambertMaterial({
  color: 0x3f8f45
});

const roadMat = new THREE.MeshLambertMaterial({
  color: 0x303030
});

const whiteMat = new THREE.MeshLambertMaterial({
  color: 0xffffff
});

const buildingMat = new THREE.MeshLambertMaterial({
  color: 0x7b8794
});

const darkMat = new THREE.MeshLambertMaterial({
  color: 0x20242a
});

const blueMat = new THREE.MeshLambertMaterial({
  color: 0x168cff
});

const redMat = new THREE.MeshLambertMaterial({
  color: 0xd92727
});

/* =========================
   GROUND
========================= */

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(600, 600),
  green
);

ground.rotation.x = -Math.PI / 2;
scene.add(ground);

/* =========================
   CITY
========================= */

function building(x, z, w, h, d) {

  const b = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    buildingMat
  );

  b.position.set(x, h / 2, z);
  scene.add(b);

  // windows
  const windowMat = new THREE.MeshLambertMaterial({
    color: 0x9edfff
  });

  for (let y = 3; y < h - 1; y += 4) {

    for (let px = -w / 2 + 2; px < w / 2 - 1; px += 4) {

      const win = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.4, 0.15),
        windowMat
      );

      win.position.set(
        x + px,
        y,
        z - d / 2 - 0.08
      );

      scene.add(win);
    }
  }
}

for (let i = 0; i < 18; i++) {

  const x = -130 + (i % 9) * 32;
  const z = -70 + Math.floor(i / 9) * 45;

  building(
    x,
    z,
    18,
    15 + (i % 4) * 7,
    18
  );
}

/* =========================
   ROADS
========================= */

function road(x, z, w, d) {

  const r = new THREE.Mesh(
    new THREE.BoxGeometry(w, 0.08, d),
    roadMat
  );

  r.position.set(x, 0.04, z);
  scene.add(r);
}

road(0, -60, 28, 220);
road(-80, 0, 180, 25);
road(80, 0, 180, 25);

/* road markings */

for (let z = -165; z < 60; z += 14) {

  const line = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.1, 6),
    whiteMat
  );

  line.position.set(0, 0.1, z);
  scene.add(line);
}

/* =========================
   TREES
========================= */

function tree(x, z) {

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.6, 4, 8),
    new THREE.MeshLambertMaterial({ color: 0x70452a })
  );

  trunk.position.set(x, 2, z);
  scene.add(trunk);

  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 8, 8),
    new THREE.MeshLambertMaterial({ color: 0x23752d })
  );

  leaves.position.set(x, 5, z);
  scene.add(leaves);
}

for (let i = 0; i < 30; i++) {

  const x = -150 + (i * 31) % 300;
  const z = -130 + (i * 47) % 230;

  if (Math.abs(x) > 20) {
    tree(x, z);
  }
}

/* =========================
   SPACEPORT
========================= */

const spaceport = new THREE.Group();
spaceport.position.set(0, 0, -190);
scene.add(spaceport);

/* spaceport floor */

const portFloor = new THREE.Mesh(
  new THREE.BoxGeometry(150, 0.5, 90),
  darkMat
);

portFloor.position.set(0, 0.25, 0);
spaceport.add(portFloor);

/* boundary lights */

for (let x = -70; x <= 70; x += 14) {

  const light = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    blueMat
  );

  light.position.set(x, 1, -40);
  spaceport.add(light);

  const light2 = light.clone();
  light2.position.z = 40;
  spaceport.add(light2);
}

/* =========================
   CONTROL TOWER
========================= */

const tower = new THREE.Group();

const towerBody = new THREE.Mesh(
  new THREE.BoxGeometry(12, 28, 12),
  buildingMat
);

towerBody.position.y = 14;
tower.add(towerBody);

const towerTop = new THREE.Mesh(
  new THREE.BoxGeometry(18, 5, 18),
  darkMat
);

towerTop.position.y = 29;
tower.add(towerTop);

tower.position.set(-48, 0, -10);

spaceport.add(tower);

/* =========================
   HANGAR
========================= */

const hangar = new THREE.Mesh(
  new THREE.BoxGeometry(35, 18, 30),
  buildingMat
);

hangar.position.set(-5, 9, 20);
spaceport.add(hangar);

const hangarDoor = new THREE.Mesh(
  new THREE.BoxGeometry(20, 12, 0.5),
  darkMat
);

hangarDoor.position.set(-5, 6, 4.8);
spaceport.add(hangarDoor);

/* =========================
   TERMINAL
========================= */

const terminal = new THREE.Mesh(
  new THREE.BoxGeometry(30, 10, 16),
  buildingMat
);

terminal.position.set(35, 5, 25);
spaceport.add(terminal);

/* =========================
   ROCKET
========================= */

function createRocket() {

  const rocket = new THREE.Group();

  /* body */

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(4, 4, 22, 16),
    whiteMat
  );

  body.position.y = 12;
  rocket.add(body);

  /* nose */

  const nose = new THREE.Mesh(
    new THREE.ConeGeometry(4, 7, 16),
    whiteMat
  );

  nose.position.y = 26.5;
  rocket.add(nose);

  /* cockpit */

  const cockpit = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 12, 8),
    blueMat
  );

  cockpit.scale.set(1, 0.55, 1);
  cockpit.position.set(0, 19, 3.6);
  rocket.add(cockpit);

  /* red stripe */

  const stripe = new THREE.Mesh(
    new THREE.CylinderGeometry(4.05, 4.05, 2, 16),
    redMat
  );

  stripe.position.y = 14;
  rocket.add(stripe);

  /* fins */

  for (const side of [-1, 1]) {

    const fin = new THREE.Mesh(
      new THREE.BoxGeometry(1, 8, 5),
      redMat
    );

    fin.position.set(side * 4.5, 6, 0);
    fin.rotation.z = side * -0.3;

    rocket.add(fin);
  }

  /* engines */

  for (let x = -2, i = 0; i < 3; i++, x += 2) {

    const engine = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 1, 2, 10),
      darkMat
    );

    engine.position.set(x, 1, 0);
    rocket.add(engine);
  }

  return rocket;
}

const rocket = createRocket();

rocket.position.set(35, 0, -15);

spaceport.add(rocket);

/* =========================
   LAUNCH PAD
========================= */

const pad = new THREE.Mesh
