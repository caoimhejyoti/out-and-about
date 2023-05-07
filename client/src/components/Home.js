import React from "react";

import MandurahMap from "./maps/mandurah-forshore";
import UwaMap from "./maps/uwa-grad";
import Hero from "./Hero";
import heroImg from "../assets/hero.png";

const Home = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8">
          <Hero />
        </div>
      </div>
    </main>
  );
};

export default Home;
