import * as d3 from "d3";
import * as Plot from "@observablehq/plot";
import { svg } from "htl";
import { ObservablePlot } from "./observable";

const data = [
  { distinction: "individual", key: "Kids Beginner", value: 0.4 },
  { distinction: "individual", key: "Kids RAI", value: 0.2 },
  { distinction: "individual", key: "Adults Beginner", value: 0.25 },
  { distinction: "individual", key: "Adults RAI", value: 0.15 },
  { distinction: "individual", key: "Discovery", value: 0.1 },
  { distinction: "individual", key: "Freestyle", value: 0.05 },

  { distinction: "average", key: "Kids Beginner", value: 0.3 },
  { distinction: "average", key: "Kids RAI", value: 0.15 },
  { distinction: "average", key: "Adults Beginner", value: 0.41 },
  { distinction: "average", key: "Adults RAI", value: 0.3 },
  { distinction: "average", key: "Discovery", value: 0.11 },
  { distinction: "average", key: "Freestyle", value: 0.3 },
];

const keys = [...new Set(data.map((d) => d.key))];

// IMPORTANT: longitude scale must be [-180, 180]
const longitude = d3
  .scalePoint()
  .domain(keys)
  .range([-180 + 360 / keys.length / 2, 180 - 360 / keys.length / 2]);

const maxValue = d3.max(data, (d) => d.value);

// Matches Observable’s working geometry math
const AXIS_RADIUS = maxValue + 0.17;
const DOMAIN_RADIUS = AXIS_RADIUS + 0.05;

const options = {
  width: 450,
  projection: {
    type: "azimuthal-equidistant",
    rotate: [0, -90],
    domain: d3.geoCircle().center([0, 90]).radius(DOMAIN_RADIUS)(),
  },
  color: {
    domain: ["individual", "average"],
    range: ["var(--primary-color)", "var(--danger-color)"],
    legend: true,
  },
  marks: [
    // concentric grid rings
    Plot.geo([0.1, 0.2, 0.3, 0.4, 0.5], {
      geometry: (r) => d3.geoCircle().center([0, 90]).radius(r)(),
      stroke: "var(--border-accent-color)",
      fill: "var(--body-color)",
      strokeOpacity: 0.3,
      fillOpacity: 0.03,
      strokeWidth: 0.5,
    }),

    // radial axes
    Plot.link(keys, {
      x1: (d) => longitude(d),
      y1: 90 - AXIS_RADIUS,
      x2: 0,
      y2: 90,
      stroke: "var(--body-color",
      strokeOpacity: 0.5,
      strokeWidth: 2,
    }),

    // radial tick labels
    Plot.text([0.2, 0.3, 0.4, 0.5], {
      x: 180,
      y: (d) => 90 - d,
      dx: 2,
      text: (d) => `${Math.round(d * 100)}%`,
      textAnchor: "start",
      fill: "currentColor",
      fontSize: 8,
    }),

    // axis labels
    Plot.text(keys, {
      x: (d) => longitude(d),
      y: 90 - AXIS_RADIUS,
      text: (d) => d,
      textAnchor: "middle",
      lineWidth: 6,
      fontSize: 11,
      fontWeight: 500,
      color: "var(--body-color)",
    }),

    // radar areas
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

      fill: (d) => `url(#hatch-${d.distinction})`,
      stroke: "distinction",

      curve: "cardinal-closed",
    }),

    // points
    Plot.dot(data, {
      x: ({ key }) => longitude(key),
      y: ({ value }) => 90 - value,
      fill: "distinction",
      stroke: "var(--body-bg)",
    }),

    // hover labels
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

    // hover opacity
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
  ],
};

const hatchDefs = () => svg`
  <defs>
    ${options.color.domain.map(
      (d) => svg`
        <pattern
          id="hatch-${d}"
          patternUnits="userSpaceOnUse"
          width="6"
          height="6"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="6"
            stroke="${options.color.range[options.color.domain.indexOf(d)]}"
            stroke-width="1"
          />
        </pattern>
      `
    )}
  </defs>
`;

options.marks.unshift(hatchDefs);

export const RadarChart = () => <ObservablePlot options={options} />;
