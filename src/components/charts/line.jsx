import * as Plot from "@observablehq/plot";
import { ObservablePlot } from "./observable";
import { buildColorConfig, createHatchDefs, withHatchFill } from "./common";

const buildLineOptions = ({
  data,
  width,
  height,
  marginBottom,
  x,
  y,
  color,
  curve,
  pointRadius,
  hatchRotate,
  extraMarks,
  plotOptions,
}) => {
  const hatchDefs = createHatchDefs(color.domain, color.range, hatchRotate);
  const baseMarks = [
    Plot.ruleY([0], {
      stroke: "var(--border-accent-color)",
    }),

    Plot.areaY(data, {
      x: "key",
      y2: "value",
      y0: 0,
      z: "distinction",
      fill: "distinction",
      fillOpacity: 0.16,
      curve,
      stack: null,
    }),

    Plot.areaY(data, {
      x: "key",
      y2: "value",
      y0: 0,
      z: "distinction",
      fill: withHatchFill((d) => d.distinction),
      curve,
      stack: null,
    }),

    Plot.lineY(data, {
      x: "key",
      y: "value",
      z: "distinction",
      stroke: "distinction",
      strokeWidth: 2,
      curve,
    }),

    Plot.dot(data, {
      x: "key",
      y: "value",
      fill: "distinction",
      stroke: "var(--body-bg)",
      r: pointRadius,
    }),
  ];

  const { marks: overrideMarks = [], ...restOverrides } = plotOptions ?? {};

  return {
    width,
    height,
    marginBottom,
    x,
    y,
    color,
    marks: [hatchDefs, ...baseMarks, ...extraMarks, ...overrideMarks],
    ...restOverrides,
  };
};

export const LineChart = ({
  data,
  width = 500,
  height = 300,
  marginBottom = 70,
  x = {},
  y = {},
  curve = "monotone-x",
  pointRadius = 3,
  colorOptions,
  hatchRotate = -45,
  extraMarks = [],
  plotOptions = {},
  className,
  style,
}) => {
  const color = buildColorConfig(colorOptions);
  const options = buildLineOptions({
    data: data ?? [],
    width,
    height,
    marginBottom,
    x,
    y,
    color,
    curve,
    pointRadius,
    hatchRotate,
    extraMarks,
    plotOptions,
  });

  return <ObservablePlot options={options} className={className} style={style} />;
};
