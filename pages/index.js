import React, { useEffect, useRef } from "react";
import Card from "./Card";

import Navigation from "../components/navigation/Navigation";

// import ScrollMagic from "scrollmagic";

const App = () => {
  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const fourRef = useRef();
  let ScrollMagic = null;

  useEffect(() => {
    ScrollMagic = require("scrollmagic");
    const controller = new ScrollMagic.Controller();

    // {
    //   globalSceneOptions: {
    // triggerHook: "onLeave",
    // duration: "100%",
    //   },
    // }

    new ScrollMagic.Scene({
      triggerElement: firstRef.current,
      triggerHook: "onLeave",
      duration: "100%",
    })
      .setPin(firstRef.current, { pushFollowers: false })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: secondRef.current,
      triggerHook: "onLeave",
      duration: "100%",
    })
      .setPin(secondRef.current, { pushFollowers: false })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: thirdRef.current,
      triggerHook: "onLeave",
      duration: "100%",
    })
      .setPin(thirdRef.current, { pushFollowers: false })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: fourRef.current,
      triggerHook: "onLeave",
      duration: "100%",
    })
      .setPin(fourRef.current, { pushFollowers: false })
      .addTo(controller);
  });

  return (
    <div className="App">
      <Navigation />
      <section ref={firstRef} className="panel" style={{ background: "blue" }}>
        <b>ONE</b>
      </section>
      <section
        ref={secondRef}
        className="panel"
        style={{ background: "orange" }}
      >
        <b>TWO</b>
      </section>
      <section
        ref={thirdRef}
        className="panel third"
        style={{ background: "green" }}
      >
        <b>Three</b>
      </section>
      <section ref={fourRef} className="panel" style={{ background: "red" }}>
        <b>FOUR</b>
      </section>
    </div>
  );
};

export default App;
