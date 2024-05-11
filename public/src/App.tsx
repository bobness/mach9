import React from "react";
import "./App.css";
import { Ion, Camera, Rectangle, Cartesian3 } from "cesium";
import { Viewer, Entity } from "resium";

import useBridges from "./hooks/useBridges";

// import { Viewer } from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";

// const viewer = new Viewer("cesiumContainer");

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZTJmN2EyYi05NjExLTQ5NDQtYTc2NS03ZjBjNGI5YTE4MTUiLCJpZCI6MjE0MTM3LCJpYXQiOjE3MTUyOTEzMzd9.dAvgKs-iM9Va4cWMdndvT5pigocSNruDKzyOjueSE20";

// @ts-expect-error CESIUM_BASE_URL is not defined in Window by default
window.CESIUM_BASE_URL = "/cesium";

function App() {
  const bridges = useBridges();
  // Pennsylvania coordinates:
  // 74° 41' to 80° 31' W -> 74.68333333333334, 80.51666666666667
  // 39° 43' N to 42° 16' N -> 39.71666666666667, 42.266666666666666
  Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
    74.68333333333334, // west
    39.71666666666667, // south
    80.51666666666667, // east
    42.266666666666666 // north
  );
  // const flyer = new Camera(???);
  // flyer.flyHome(5);
  return (
    <div className="App">
      {bridges && (
        <Viewer
          full
          onClick={(movement, target) => {
            console.log("*** click position: ", movement.endPosition);
          }}
        >
          {/* <Scene />
          <Globe />
          <Camera def /> */}
          {bridges.map((bridge, i) => (
            <Entity
              name={`Bridge ${bridge.id}`}
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
