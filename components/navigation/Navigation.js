import React, { PureComponent } from "react";
import paper from "paper";
// import logo from "../../static/logo.png";
// import WebFont from "webfontloader";

import style from "./Navigation.module.scss";

class Navigation extends PureComponent {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.canvasLogo = React.createRef();
    this.navMenu = React.createRef();
    this.WebFont = null;
  }

  componentDidMount() {
    this.WebFont = require("webfontloader");
    const initNavBox = () => {
      var values = {
        friction: 15,
        timeStep: 0.1,
        amount: 15,
        mass: 2,
        count: 0,
      };
      values.invMass = 1 / values.mass;
      // var rasterImg = this.canvasLogo.current;
      var raster, group;
      var path, springs;
      var size = paper.view.size;
      // var text1Arr = [];
      // var texts = ["PORTFOLIO", "SERVICES", "CONTACT", "CLIENTS", "ABOUT"];
      // var cursorPos = 0;
      paper.view.onMouseMove = onMouseMove;
      paper.view.onFrame = onFrame;
      paper.view.onResize = onResize;

      var Spring = function (a, b, strength, restLength) {
        this.a = a;
        this.b = b;
        this.restLength = restLength || 40;
        this.strength = strength ? strength : 0.55;
        this.mamb = values.invMass * values.invMass;
      };

      Spring.prototype.update = function () {
        var delta = {};
        delta.y = this.b.y - this.a.y;
        delta.length = this.b.length - this.a.length;
        var dist = delta.length;
        var normDistStrength =
          ((dist - this.restLength) / (dist * this.mamb)) * this.strength;
        delta.y *= normDistStrength * values.invMass * 0.2;
        if (!this.a.fixed) this.a.y += delta.y;
        if (!this.b.fixed) this.b.y -= delta.y;
      };

      function createPath(strength) {
        path = new paper.Path({
          fillColor: "white",
          shadowColor: "hsla(0, 0%, 0%,0.2)",
          // Set the shadow blur radius to 12:
          shadowBlur: 20,
          // Offset the shadow by { x: 5, y: 5 }
          shadowOffset: new paper.Point(2, 2),
        });
        springs = [];

        for (var i = 0; i <= values.amount; i++) {
          var segment = path.add(
            new paper.Point((i / values.amount) * size.width, 0.7 * size.height)
          );
          var point = segment.point;
          if (i === 0 || i === values.amount) {
            point.y = 0;
          }
          if (i === values.amount || i === values.amount - 1) {
            point.x = size.width;
          }
          if (i === 1) {
            point.x = 0;
          }
          point.px = point.x;
          point.py = point.y;
          // The first two and last two points are fixed:
          point.fixed = i < 2 || i > values.amount - 2;
          if (i > 0) {
            var spring = new Spring(segment.previous.point, point, strength);
            springs.push(spring);
          }
        }
        return path;
      }
      createPath();

      function onResize() {
        if (group) {
          paper.project.activeLayer.remove();
        }
        if (path) path.remove();
        size = paper.view.bounds.size;
        path = createPath(0.55);
        if (raster) {
          raster.remove();
        }
      }

      function onMouseMove(event) {
        event.point.y =
          event.point.y < size.height / 2 - 20
            ? size.height / 2 - 20
            : event.point.y;
        event.point.y =
          event.point.y > size.height ? size.height : event.point.y;
        var location = path.getNearestLocation(event.point);
        var segment = location.segment;
        var point = segment.point;

        if (!point.fixed && location.distance < size.height / 5) {
          var y = event.point.y;
          point.y += (y - point.y) / 6;
          if (segment.previous && !segment.previous.point.fixed) {
            var previous = segment.previous.point;
            previous.y += (y - previous.y) / 24;
            if (previous.y < size.height / 2 - 20)
              previous.y = size.height / 2 - 20;
          }
          if (segment.next && !segment.next.point.fixed) {
            var next = segment.next.point;
            next.y += (y - next.y) / 24;
            if (next.y < size.height / 2 - 20) next.y = size.height / 2 - 20;
          }
        }
        if (point.fixed) {
          if (point.y < size.height / 2 - 20) point.y = size.height / 2 - 20;
        }
      }

      function onFrame(event) {
        updateWave(path);
      }

      function updateWave(path) {
        var force = 1 - values.friction * values.timeStep * values.timeStep;
        for (var i = 0, l = path.segments.length; i < l; i++) {
          var point = path.segments[i].point;
          var dy = (point.y - point.py) * force;
          point.py = point.y;
          point.y = Math.max(point.y + dy, 0);
        }

        for (var j = 0, m = springs.length; j < m; j++) {
          springs[j].update();
        }
        path.smooth({ type: "continuous", from: 2, to: 13 });
      }
    };

    const initPaper = () => {
      if (window.innerWidth > 750) {
        paper.setup(this.canvas.current);
        initNavBox();
      }
    };

    this.WebFont.load({
      custom: {
        families: ["SF-UI-Black"],
        url: "../../index.scss",
      },
      active: () => {
        initPaper();
      },
      timeout: 2000,
      inactive: () => {
        console.log("Font Could not be loaded");
        initPaper();
      },
    });
    var prevScrollpos = window.pageYOffset;

    window.addEventListener("scroll", () => {
      // var currentScrollPos = window.pageYOffset;
      // if (this.navMenu.current)
      //   if (prevScrollpos > currentScrollPos) {
      //     this.navMenu.current.style.top = "0px";
      //   } else if (prevScrollpos < currentScrollPos) {
      //     this.navMenu.current.style.top = "-200px";
      //   }
      // prevScrollpos = currentScrollPos;
    });
  }

  render() {
    return (
      <nav>
        <div
          className={style.nav}
          ref={this.navMenu}
          style={{
            position: "fixed",
            top: 0,
            zIndex: 20,
            height: "13vh",
            width: "100%",
            transition: "0.5s all",
            maxWidth: "100vw",
          }}
        >
          <div className={style.liquidNav}>
            <canvas
              ref={this.canvas}
              id="navCanvas"
              style={{ width: "100vw", height: "13vh", minHeight: "130px" }}
            ></canvas>
            <div className={style.navbox}>
              <div>
                <img
                  className={style.navlink__logo__img}
                  src="../../static/kurage_logo.png"
                  alt="Kurage logo"
                />
              </div>
              <div className={style.topnav}>
                <a className={style.active} href="#home">
                  WORK
                </a>
                <a href="#news">CLIENTS</a>
                <a href="#contact">CONTACT</a>
                <a href="#about">ABOUT</a>
                <a href="#about">BLOG</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
