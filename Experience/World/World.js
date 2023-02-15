import * as THREE from "three";
import Experience from "../Experience.js";

import Room from "./Room.js";
import Lights from "./Lights.js";
import Controls from "./Controls";
import Floor from "./Floor.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.theme = this.experience.theme;

    this.resources = this.experience.resources;
    this.theme = this.experience.theme;

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme);
    });

    this.resources.on("ready", () => {
      this.controls = new Controls();
      this.floor = new Floor();
      this.room = new Room();
      this.lights = new Lights();
    });
  }

  switchTheme(theme) {
    if (this.lights) {
      this.lights.switchTheme(theme);
    }
  }

  resize() {}

  update() {
    if (this.room) {
      this.room.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
