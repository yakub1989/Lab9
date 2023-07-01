let canvas = document.getElementById("glcanvas");

const scene = new THREE.Scene({color: 0xfff});

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var light; 
light = new THREE.DirectionalLight();
light.position.set(-10, -2, 1);
camera.add(light);
scene.add(camera);

const material = new THREE.MeshPhongMaterial(
    {
        color: 0xffffff, 
    });

const baseGeometry = new THREE.CylinderGeometry(1, 1, 0.15, 100);

const base = new THREE.Mesh(baseGeometry, material);

const upperBaseGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.25, 100);

const upperBase = new THREE.Mesh(upperBaseGeometry, material);
upperBase.position.y = 0.1;

let group = new THREE.Group();
group.add(base);
group.add(upperBase);
group.position.set(0, -4, 0);
group.scale.set(2, 2, 1);

let points = [];
for (var i = 0; i < 7; i++) {
    points.push(new THREE.Vector2(Math.tan(i * 0.1)*3+6 , (i - 4.5) * 4));
}
let size = 0.2;
let geometry1 = new THREE.LatheGeometry(points);
let lathe1 = new THREE.Mesh(geometry1, material);
lathe1.position.set(0, -1.7, -0.3);
lathe1.scale.set(size, -size, -size);

const ringGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 100);
const ring = new THREE.Mesh(ringGeometry, material);
ring.position.set(0, 1.3, 0);

const ringGeometry2 = new THREE.CylinderGeometry(1.5, 1.5, 1.4, 100);
material.side = THREE.DoubleSide;
const ball = new THREE.Mesh(ringGeometry2, material);
ball.position.set(0, 0.8, 0);
ball.scale.set(1,-1,-1);

let head = new THREE.Group();
head.add( ball);
head.position.set(0,1.2,0);

let chessRook = new THREE.Group();
chessRook.add(group, lathe1, head);
scene.add(chessRook);

///////////////////



///////////

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

camera.position.z = 6;
camera.position.y = 1.2;
animate();
