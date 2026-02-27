import { Buttons } from "./buttons";
import { Inputs } from "./inputs";
import { FileUploads } from "./file-uploads";
import { Checkboxes } from "./checkboxes";
import { Radios } from "./radios";
import { SegmentedControls } from "./segmented-controls";
import { Selects } from "./selects";
import { Dropdowns } from "./dropdowns";
import { Modals } from "./modals";
import { Charts } from "./charts";
import { Cards } from "./cards";
import { Layouts } from "./layouts";
import { Toasts } from "./toasts";

export const Blocks = () => {
  return (
  <div>
    <h1>JC/UI Demo</h1>
    <hr />
    <Buttons />
      <hr />
      <Inputs />
      <hr />
      <FileUploads />
      <hr />
      <Checkboxes />
      <hr />
      <Radios />
      <hr />
      <SegmentedControls />
      <hr />
      <Selects />
      <hr />
    <Modals />
    <hr />
    <Charts />
    <hr />
    <Dropdowns />
    <hr />
    <Cards />
    <hr />
    <Layouts />
    <hr />
    <Toasts />
  </div>
);
};
