import * as THREE from "three";

import GSAP from "gsap ";

import Experience from "../Experience.js";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({ color: 0x1e3a8a });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.receiveShadow = true;
  }

  resize() {}

  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xfaf4e5 });
    this.material2 = new THREE.MeshStandardMaterial({ color: 0x7ad0a });
    this.material3 = new THREE.MeshStandardMaterial({ color: 0xe5a1aa });

    this.circle = new THREE.Mesh(geometry, material);
    this.circle2 = new THREE.Mesh(geometry, this.material2);
    this.circle3 = new THREE.Mesh(geometry, this.material3);

    this.circle.position.y = 0.1;
    this.circle2.position.y = 0.11;
    this.circle3.position.y = 0.12;
    this.circle.scale.set(0, 0, 0);
    this.circle2.scale.set(0, 0, 0);
    this.circle3.scale.set(0, 0, 0);
    this.circle.rotation.x =
      this.circle2.rotation.x =
      this.circle3.rotation.x =
        -Math.PI / 2;

    this.circle.receiveShadow = true;

    this.scene.add(this.circle);
    this.scene.add(this.circle2);
    this.scene.add(this.circle3);
  }

  update() {
    this.mixer.update(this.time.delta * 0.0009);
    this.actualRoom.rotation.y = this.lerp.current;
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
  }
}
