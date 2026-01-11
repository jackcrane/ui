import React from "react";
import Button, { ColorSwitcher } from "./components/Button/button";
import { JCUIProvider } from "./components/jcui/provider";
import { Blocks } from "./democomponents/blocks";

function App() {
  return (
    <JCUIProvider theme="dark" style={{ flex: 1, padding: 10 }}>
      <ColorSwitcher />
      <Blocks />
    </JCUIProvider>
  );
}

export default App;
