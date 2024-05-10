import React from "react";
import "./App.css";
import { Ion, Cartesian3 } from "cesium";
import { Viewer, Entity } from "resium";

import useBridges from "./hooks/useBridges";

// import { Viewer } from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";

// const viewer = new Viewer("cesiumContainer");

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZTJmN2EyYi05NjExLTQ5NDQtYTc2NS03ZjBjNGI5YTE4MTUiLCJpZCI6MjE0MTM3LCJpYXQiOjE3MTUyOTEzMzd9.dAvgKs-iM9Va4cWMdndvT5pigocSNruDKzyOjueSE20";

// @ts-expect-error CESIUM_BASE_URL is not defined in Window by default
window.CESIUM_BASE_URL = "/";

function App() {
  const bridges = useBridges();
  console.log("*** bridges: ", bridges);
  return (
    <div className="App">
      {bridges && (
        <Viewer full>
          {bridges.map((bridge, i) => (
            <Entity
              name={String(bridge.id)}
              key={bridge.id}
              position={Cartesian3.fromDegrees(
                Number(bridge.longitude) / (10 ^ 6),
                Number(bridge.latitude) / (10 ^ 6),
                100
              )}
              point={{ pixelSize: 10 }}
            >
              Bridge #{i}
            </Entity>
          ))}
        </Viewer>
      )}
    </div>
  );
}

export default App;
