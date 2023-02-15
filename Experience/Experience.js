import * as THREE from "three";

import Sizes from "./Components/Sizes.js";
import Time from "./Components/Time.js";
import Resources from "./Components/Resources.js";
import assets from "./Components/assets.js";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Theme from "./Theme.js";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.time = new Time();
    this.resources = new Resources(assets);
    this.theme = new Theme();

    this.world = new World();

    this.time.on("update", () => {
      this.update();
    });
    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  resize() {
    this.camera.resize();
    this.world.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();

    this.renderer.update();
  }
}
