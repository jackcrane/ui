import { Buttons } from "./buttons";
import { Inputs } from "./inputs";
import { Checkboxes } from "./checkboxes";
import { Radios } from "./radios";
import { Selects } from "./selects";
import { Modals } from "./modals";
import { Charts } from "./charts";
import { Cards } from "./cards";

export const Blocks = () => {
  return (
    <div>
      <h1>JC/UI Demo</h1>
      <hr />
      <Buttons />
      <hr />
      <Inputs />
      <hr />
      <Checkboxes />
      <hr />
      <Radios />
      <hr />
      <Selects />
      <hr />
      <Modals />
      <hr />
      <Charts />
      <hr />
      <Cards />
    </div>
  );
};
