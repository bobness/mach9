import React from "react";
import "./App.css";
import { Ion, Cartesian3 } from "cesium";
// @ts-expect-error cesium-react has no @types
import { Viewer, Entity } from "cesium-react";

import useBridges from "./hooks/useBridges";

// import { Viewer } from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";

// const viewer = new Viewer("cesiumContainer");

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZTJmN2EyYi05NjExLTQ5NDQtYTc2NS03ZjBjNGI5YTE4MTUiLCJpZCI6MjE0MTM3LCJpYXQiOjE3MTUyOTEzMzd9.dAvgKs-iM9Va4cWMdndvT5pigocSNruDKzyOjueSE20";

function App() {
  const bridges = useBridges();
  return (
    <div className="App">
      <Viewer full>
        {bridges?.map((bridge, i) => (
          <Entity
            name={bridge.id}
            position={Cartesian3.fromDegrees(
              bridge.longitude,
              bridge.latitude,
              100
            )}
            point={{ pixelSize: 10 }}
          >
            Bridge #{i}
          </Entity>
        ))}
      </Viewer>
    </div>
  );
}

export default App;
