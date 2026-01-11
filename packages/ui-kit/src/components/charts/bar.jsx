import * as Plot from "@observablehq/plot";
import { svg } from "htl";
import { ObservablePlot } from "./observable";
import { buildColorConfig, createHatchDefs, withHatchFill } from "./common";

const formatPercent = (value) => `${Math.round(value * 100)}%`;

const buildBarOptions = ({
  data,
  width,
  height,
  marginLeft,
  x,
  y,
  color,
  hatchRotate,
  extraMarks,
  plotOptions,
}) => {
  const hatchDefs = createHatchDefs(color.domain, color.range, hatchRotate);
  const baseMarks = [
    Plot.ruleX([0], {
      stroke: "var(--border-accent-color)",
    }),

    Plot.barX(data, {
      x: "value",
      y: "key",
      z: "distinction",
      fill: "distinction",
      fillOpacity: 0.18,
      stroke: "distinction",
      strokeOpacity: 0.9,
      strokeWidth: 1,
    }),

    Plot.barX(data, {
      x: "value",
      y: "key",
      z: "distinction",
      fill: withHatchFill((d) => d.distinction),
      stroke: "distinction",
      strokeWidth: 1,
    }),

    Plot.text(data, {
      x: (d) => d.value,
      y: "key",
      dx: 6,
      text: (d) => formatPercent(d.value),
      textAnchor: "start",
      fill: "currentColor",
      fontSize: 10,
    }),

    () => svg`
      <style>
        g[aria-label=bar] rect {
          transition: fill-opacity 0.2s, stroke-opacity 0.2s;
        }
      </style>
    `,
  ];

  const { marks: overrideMarks = [], ...restOverrides } = plotOptions ?? {};

  return {
    width,
    height,
    marginLeft,
    x,
    y,
    color,
    marks: [hatchDefs, ...baseMarks, ...extraMarks, ...overrideMarks],
    ...restOverrides,
  };
};

export const BarChart = ({
  data,
  width = 500,
  height = 300,
  marginLeft = 120,
  x = {},
  y = {},
  colorOptions,
  hatchRotate = -45,
  extraMarks = [],
  plotOptions = {},
  className,
  style,
}) => {
  const color = buildColorConfig(colorOptions);
  const options = buildBarOptions({
    data: data ?? [],
    width,
    height,
    marginLeft,
    x,
    y,
    color,
    hatchRotate,
    extraMarks,
    plotOptions,
  });

  return <ObservablePlot options={options} className={className} style={style} />;
};
