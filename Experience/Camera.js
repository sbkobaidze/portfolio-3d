import Experience from "./Experience.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Controls from "./World/Controls.js";

import * as THREE from "three";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();

    this.createOrthographicCamera();
    this.setOribitControls();
  }
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.x = 14;
    this.perspectiveCamera.position.z = 31;
    this.perspectiveCamera.position.y = 2;
  }
  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustum) / 2,
      (this.sizes.aspect * this.sizes.frustum) / 2,
      this.sizes.frustum / 2,
      -this.sizes.frustum / 2,
      -50,
      50
    );

    this.orthographicCamera.position.y = 3;
    this.orthographicCamera.position.z = 5;

    this.orthographicCamera.rotation.x = -Math.PI / 9;

    this.scene.add(this.orthographicCamera);

    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);

    //const size = 20;
    //const divisions = 20;

    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(5);
    // this.scene.add(axesHelper);
  }

  setOribitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
  }

  resize() {
    //Update Perspective Camera on Resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.top = this.sizes.frustum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }
  update() {
    this.controls.update();
    // this.helper.matrixAutoUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
