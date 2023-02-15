import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Lights {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    // this.gui = new GUI({ container: document.querySelector(".hero-main") });
    this.obj = {
      colorObj: { r: 0, g: 0, b: 0 },
      intensity: 3,
    };

    this.setSunlight();
    // this.setGUI();
  }

  /*setGUI() {
    this.gui.addColor(this.obj, "colorObj").onChange(() => {
      this.sunLight.color.copy(this.obj.colorObj);
      this.ambientlight.color.copy(this.obj.colorObj);
      console.log(this.obj.colorObj);
    });
    this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
      this.sunLight.intensity = this.obj.intensity;
      this.ambientlight.intensity = this.obj.intensity;
    });
  }
*/

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0;
    //const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    //this.scene.add(helper);

    this.sunLight.position.set(-2, 10, 4);
    this.scene.add(this.sunLight);
    this.ambientlight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientlight);
  }
  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 0.03529411764705882,
        g: 0.027450980392156862,
        b: 0.027450980392156862,
      });
      GSAP.to(this.ambientlight.color, {
        r: 0.03529411764705882,
        g: 0.027450980392156862,
        b: 0.027450980392156862,
      });
      GSAP.to(this.sunLight, {
        intensity: 10,
      });
      GSAP.to(this.ambientlight, {
        intensity: 10,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientlight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: 5,
      });
      GSAP.to(this.ambientlight, {
        intensity: 1,
      });
    }
  }

  resize() {}

  update() {}
}
