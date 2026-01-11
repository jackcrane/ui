import { Buttons } from "./buttons";
import { Inputs } from "./inputs";
import { Selects } from "./selects";
import { Modals } from "./modals";
import { Charts } from "./charts";

export const Blocks = () => {
  return (
    <div>
      <h1>JC/UI Demo</h1>
      <hr />
      <Buttons />
      <hr />
      <Inputs />
      <hr />
      <Selects />
      <hr />
      <Modals />
      <hr />
      <Charts />
    </div>
  );
};
