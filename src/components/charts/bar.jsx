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

const options = {
  width: 500,
  height: 300,
  marginLeft: 120,
  x: {
    tickFormat: (d) => `${Math.round(d * 100)}%`,
    grid: true,
  },
  y: { label: null },
  color: {
    domain: ["individual", "average"],
    range: ["var(--primary-color)", "var(--danger-color)"],
    legend: true,
  },
  marks: [
    Plot.ruleX([0], {
      stroke: "var(--border-accent-color)",
    }),

    // base filled bars (more opaque, radar-like)
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

    // hatch overlay
    Plot.barX(data, {
      x: "value",
      y: "key",
      z: "distinction",
      fill: (d) => `url(#hatch-${d.distinction})`,
      stroke: "distinction",
      strokeWidth: 1,
    }),

    // value labels
    Plot.text(data, {
      x: (d) => d.value,
      y: "key",
      dx: 6,
      text: (d) => `${Math.round(d.value * 100)}%`,
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
          patternTransform="rotate(-45)"
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

export const BarChart = () => <ObservablePlot options={options} />;
