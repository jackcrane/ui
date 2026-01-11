import * as Plot from "@observablehq/plot";
import { svg } from "htl";
import { ObservablePlot } from "./observable";

const data = [
  { distinction: "individual", key: 1, value: 4 },
  { distinction: "individual", key: 2, value: 2 },
  { distinction: "individual", key: 3, value: 25 },
  { distinction: "individual", key: 4, value: 15 },
  { distinction: "individual", key: 5, value: 1 },
  { distinction: "individual", key: 6, value: 5 },

  { distinction: "average", key: 1, value: 8 },
  { distinction: "average", key: 2, value: 15 },
  { distinction: "average", key: 3, value: 41 },
  { distinction: "average", key: 4, value: 30 },
  { distinction: "average", key: 5, value: 11 },
  { distinction: "average", key: 6, value: 3 },
];

const options = {
  width: 500,
  height: 300,
  marginBottom: 70,
  x: {
    label: null,
  },
  y: {
    label: null,
    // tickFormat: (d) => `${Math.round(d * 100)}%`,
    grid: true,
  },
  color: {
    domain: ["individual", "average"],
    range: ["var(--primary-color)", "var(--danger-color)"],
    legend: true,
  },
  marks: [
    Plot.ruleY([0], {
      stroke: "var(--border-accent-color)",
    }),

    // solid area under line (radar-like tint)
    Plot.areaY(data, {
      x: "key",
      y2: "value",
      y0: 0,
      z: "distinction",
      fill: "distinction",
      fillOpacity: 0.16,
      curve: "monotone-x",
      stack: null,
    }),

    // hatch area under line
    Plot.areaY(data, {
      x: "key",
      y2: "value",
      y0: 0,
      z: "distinction",
      fill: (d) => `url(#hatch-${d.distinction})`,
      curve: "monotone-x",
      stack: null,
    }),

    // lines
    Plot.lineY(data, {
      x: "key",
      y: "value",
      z: "distinction",
      stroke: "distinction",
      strokeWidth: 2,
      curve: "monotone-x",
    }),

    // points (static, no hover)
    Plot.dot(data, {
      x: "key",
      y: "value",
      fill: "distinction",
      stroke: "var(--body-bg)",
      r: 3,
    }),
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

export const LineChart = () => <ObservablePlot options={options} />;
