import React from "react";

import MandurahMap from "./maps/mandurah-forshore";

const Home = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          <p>Hello World!</p>
          <MandurahMap />
        </div>
      </div>
    </main>
  );
};

export default Home;
