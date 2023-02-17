import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

import GSAP from "gsap ";

import Experience from "../Experience.js";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = {};

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };
    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    this.clean = this.mixer.clipAction(this.room.animations[0]);
    this.swim = this.mixer.clipAction(this.room.animations[1]);
    this.swim.play();
    this.clean.play();
  }

  onMouseMove() {
    this.actualRoom.position.y = 0.5;
    window.addEventListener("mousemove", (e) => {
      this.rotation = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      this.lerp.target = this.rotation;
    });
  }

  setModel() {
    console.log(this.actualRoom.children);
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }

      if (child.name === "Screen") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.video,
        });
      }

      if (child.name === "Picture") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.picture1,
        });
      }

      if (child.name === "Sea") {
        child.children[0].material = new THREE.MeshPhysicalMaterial();
        child.children[0].material.roughness = 0;
        child.children[0].material.color.set(0x549dd2);
        child.children[0].material.ior = 3;
        child.children[0].material.transmission = 1;
        child.children[0].material.opacity = 0.5;
      }

      if (child.name === "Cube") {
        child.position.x = 2.17468;
      }
      if (child.name === "Noot") {
        child.scale.set(0, 0, 0);
      }

      this.roomChildren[child.name.toLowerCase()] = child;
    });
    const width = 1;
    const height = 1;
    const intensity = 1;
    this.rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    this.rectLight.castShadow = true;

    // const rectLightHelper = new RectAreaLightHelper(this.rectLight);
    // this.rectLight.add(rectLightHelper);

    this.rectLight.position.set(2.1936771869659424, 2.0, -3.297884464263916);
    this.rectLight.rotation.x = -Math.PI / 2;
    this.actualRoom.add(this.rectLight);
    this.roomChildren["rectLight"] = this.rectLight;

    this.scene.add(this.actualRoom);
    this.actualRoom.rotation.y = Math.PI / 2 - 45;
  }

  resize() {}

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
