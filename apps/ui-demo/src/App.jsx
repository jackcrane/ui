import React from "react";
import { Blocks } from "./democomponents/blocks";
import { ColorSwitcher, JCUIProvider } from "@jackcrane/ui";

function App() {
  return (
    <JCUIProvider theme="dark" style={{ flex: 1, padding: 10 }}>
      <ColorSwitcher />
      <Blocks />
    </JCUIProvider>
  );
}

export default App;
