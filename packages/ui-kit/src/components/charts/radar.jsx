import * as d3 from "d3";
import * as Plot from "@observablehq/plot";
import { svg } from "htl";
import { ObservablePlot } from "./observable";
import { buildColorConfig, createHatchDefs, withHatchFill } from "./common";

const RADAR_TICKS = [0.1, 0.2, 0.3, 0.4, 0.5];

const buildRadarOptions = ({
  data,
  width,
  height,
  color,
  hatchRotate,
  extraMarks,
  plotOptions,
  projectionOptions,
}) => {
  const keys = Array.from(new Set(data.map((d) => d.key)));
  const padding = (360 / keys.length) / 2;
  const longitude = d3
    .scalePoint()
    .domain(keys)
    .range([-180 + padding, 180 - padding]);
  const maxValue = d3.max(data, (d) => d.value) ?? 0;
  const axisRadius = maxValue + 0.17;
  const domainRadius = axisRadius + 0.05;
  const projection = {
    type: "azimuthal-equidistant",
    rotate: [0, -90],
    domain: d3.geoCircle().center([0, 90]).radius(domainRadius)(),
    ...projectionOptions,
  };

  const hatchDefs = createHatchDefs(color.domain, color.range, hatchRotate);
  const baseMarks = [
    Plot.geo(RADAR_TICKS, {
      geometry: (r) => d3.geoCircle().center([0, 90]).radius(r)(),
      stroke: "var(--border-accent-color)",
      fill: "var(--body-color)",
      strokeOpacity: 0.3,
      fillOpacity: 0.03,
      strokeWidth: 0.5,
    }),

    Plot.link(keys, {
      x1: (d) => longitude(d),
      y1: 90 - axisRadius,
      x2: 0,
      y2: 90,
      stroke: "var(--body-color)",
      strokeOpacity: 0.5,
      strokeWidth: 2,
    }),

    Plot.text(RADAR_TICKS, {
      x: 180,
      y: (d) => 90 - d,
      dx: 2,
      text: (d) => `${Math.round(d * 100)}%`,
      textAnchor: "start",
      fill: "currentColor",
      fontSize: 8,
    }),

    Plot.text(keys, {
      x: (d) => longitude(d),
      y: 90 - axisRadius,
      text: (d) => d,
      textAnchor: "middle",
      lineWidth: 6,
      fontSize: 11,
      fontWeight: 500,
      color: "var(--body-color)",
    }),

    Plot.area(data, {
      x1: ({ key }) => longitude(key),
      y1: ({ value }) => 90 - value,
      x2: 0,
      y2: 90,
      z: "distinction",
      fill: "distinction",
      stroke: "distinction",
      curve: "cardinal-closed",
      className: "radar-area",
    }),

    Plot.area(data, {
      x1: ({ key }) => longitude(key),
      y1: ({ value }) => 90 - value,
      x2: 0,
      y2: 90,
      z: "distinction",
      fill: withHatchFill((d) => d.distinction),
      stroke: "distinction",
      curve: "cardinal-closed",
    }),

    Plot.dot(data, {
      x: ({ key }) => longitude(key),
      y: ({ value }) => 90 - value,
      fill: "distinction",
      stroke: "var(--body-bg)",
    }),

    Plot.text(
      data,
      Plot.pointer({
        x: ({ key }) => longitude(key),
        y: ({ value }) => 90 - value,
        text: (d) => `${Math.round(d.value * 100)}%`,
        dx: 4,
        textAnchor: "start",
        fill: "currentColor",
        stroke: "var(--body-bg)",
        maxRadius: 10,
      })
    ),

    () => svg`
      <style>
        g[aria-label=area].radar-area path {
          fill-opacity: 0.12;
          transition: fill-opacity 0.2s;
        }
        g[aria-label=area]:not(.radar-area):hover path:not(:hover) {
          fill-opacity: 0.35;
        }
        g[aria-label=area]:not(.radar-area) path:hover {
          fill-opacity: 1;
        }
      </style>
    `,
  ];

  const { marks: overrideMarks = [], ...restOverrides } = plotOptions ?? {};

  return {
    width,
    height,
    projection,
    color,
    marks: [hatchDefs, ...baseMarks, ...extraMarks, ...overrideMarks],
    ...restOverrides,
  };
};

export const RadarChart = ({
  data,
  width = 450,
  height = 450,
  colorOptions,
  hatchRotate = 45,
  extraMarks = [],
  plotOptions = {},
  projectionOptions = {},
  className,
  style,
}) => {
  const color = buildColorConfig(colorOptions);
  const options = buildRadarOptions({
    data: data ?? [],
    width,
    height,
    color,
    hatchRotate,
    extraMarks,
    plotOptions,
    projectionOptions,
  });

  return <ObservablePlot options={options} className={className} style={style} />;
};
