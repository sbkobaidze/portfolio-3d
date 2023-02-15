import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import all, { ScrollTrigger } from "gsap/all";
import ASScroll from "@ashthornton/asscroll";

import Room from "./Room";
export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = new Room();

    this.room.actualRoom.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child;
      }
    });

    GSAP.registerPlugin(ScrollTrigger);
    // this.setSmoothScroll();

    this.setScrollTrigger();
  }

  // setSmoothScroll() {
  //   this.assscroll = this.setupASScroll();
  // }

  // setupASScroll() {
  //   // https://github.com/ashthornton/asscroll
  //   const asscroll = new ASScroll({
  //     ease: 0.1,
  //     disableRaf: true,
  //   });

  //   GSAP.ticker.add(asscroll.update);

  //   ScrollTrigger.defaults({
  //     scroller: asscroll.containerElement,
  //   });

  //   ScrollTrigger.scrollerProxy(asscroll.containerElement, {
  //     scrollTop(value) {
  //       if (arguments.length) {
  //         asscroll.currentPos = value;
  //         return;
  //       }
  //       return asscroll.currentPos;
  //     },
  //     getBoundingClientRect() {
  //       return {
  //         top: 0,
  //         left: 0,
  //         width: window.innerWidth,
  //         height: window.innerHeight,
  //       };
  //     },
  //     fixedMarkers: true,
  //   });

  //   asscroll.on("update", ScrollTrigger.update);
  //   ScrollTrigger.addEventListener("refresh", asscroll.resize);

  //   requestAnimationFrame(() => {
  //     asscroll.enable({
  //       newScrollElements: document.querySelectorAll(
  //         ".gsap-marker-start, .gsap-marker-end, [asscroll]"
  //       ),
  //     });
  //   });
  //   return asscroll;
  // }

  setScrollTrigger() {
    let mm = GSAP.matchMedia();
    //Desktop
    mm.add("(min-width: 969px)", () => {
      this.room.actualRoom.scale.set(0.4, 0.4, 0.4);

      //first section
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: "0.6",
          invalidateOnRefresh: true,
        },
      });
      this.firstMoveTimeline.to(this.room.actualRoom.position, {
        x: () => {
          return this.sizes.width * 0.00197;
        },
      });

      //second section

      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: "0.6",
          invalidateOnRefresh: true,
        },
      });
      this.secondMoveTimeline.to(
        this.room.actualRoom.position,
        {
          x: () => {
            return -1;
          },
          z: () => {
            return this.sizes.height * 0.0032;
          },
        },
        "same"
      );

      this.secondMoveTimeline.to(
        this.room.actualRoom.scale,
        {
          x: 1,
          y: 1,
          z: 1,
        },
        "same"
      );
      this.secondMoveTimeline.to(
        this.rectLight,
        {
          width: 1 * 2,
          height: 1 * 2,
        },
        "same"
      );

      // third move
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: "0.6",
          invalidateOnRefresh: true,
        },
      });
      this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
        y: 2,
        x: -7.1,
      });
    });

    // Mobile

    mm.add("(max-width: 968px)", () => {
      this.room.actualRoom.scale.set(0.25, 0.25, 0.25);
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: "0.6",
          invalidateOnRefresh: true,
        },
      }).to(this.room.actualRoom.scale, {
        x: 0.3,
        y: 0.3,
        z: 0.3,
      });

      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: "0.6",
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.actualRoom.scale,
          {
            x: 0.9,
            y: 0.9,
            z: 0.9,
          },
          "same"
        )
        .to(
          this.room.actualRoom.position,
          {
            x: 1.5,
          },
          "same"
        );

      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: "0.6",
          invalidateOnRefresh: true,
        },
      }).to(this.camera.orthographicCamera.position, {
        y: 2,
        x: -3.5,
      });
    });

    mm.add("(min-width:200px)", () => {
      // Mini Platform Animations
      this.sections = document.querySelectorAll(".section");
      this.sections.forEach((section) => {
        this.progressWrapper = section.querySelector(".progress-wrapper");
        this.progressBar = section.querySelector(".progress-bar");
        if (section.classList.contains("right")) {
          GSAP.to(section, {
            borderTopLeftRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          GSAP.to(section, {
            borderBottomLeftRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        } else {
          GSAP.to(section, {
            borderTopRightRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          GSAP.to(section, {
            borderBottomRightRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        GSAP.from(this.progressBar, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: "0.4",
            pin: this.progressBar,
            pinSpacing: false,
          },
        });
      });
      this.secondPartTimeLine = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: "0.6",
          invalidateOnRefresh: true,
        },
      });

      this.room.actualRoom.children.forEach((child) => {
        console.log(child);
        if (child.name === "Cube") {
          this.first = GSAP.to(child.position, {
            x: -5.12022,
            z: 2.92099,
            ease: "back.out(1.7)",
            duration: 0.3,
          });
        }

        if (child.name === "Noot") {
          this.second = GSAP.to(child.scale, {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            ease: "back.out(1.7)",

            duration: 0.3,
          });
        }
      });
      this.secondPartTimeLine.add(this.first);
      this.secondPartTimeLine.add(this.second);
    });
  }

  update() {}
}
