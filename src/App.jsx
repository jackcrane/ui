import React from "react";
import Button from "./components/Button/button";
import { JCUIProvider } from "./components/jcui/provider";
import { Blocks } from "./democomponents/blocks";

function App() {
  return (
    <div>
      <h1>JC/UI</h1>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 300,
        }}
      >
        <JCUIProvider theme="dark" style={{ flex: 1, padding: 10 }}>
          <Blocks />
        </JCUIProvider>
      </div>
    </div>
  );
}

export default App;
