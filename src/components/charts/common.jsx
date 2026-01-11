import { svg } from "htl";

export const DEFAULT_COLOR_DOMAIN = ["individual", "average"];
export const DEFAULT_COLOR_RANGE = ["var(--primary-color)", "var(--danger-color)"];

export const buildColorConfig = ({
  domain = DEFAULT_COLOR_DOMAIN,
  range = DEFAULT_COLOR_RANGE,
  legend = true,
} = {}) => ({
  domain,
  range,
  legend,
});

export const createHatchDefs = (domain, range, rotate = -45) => () => svg`
  <defs>
    ${domain.map(
      (distinction, index) => svg`
        <pattern
          id="hatch-${distinction}"
          patternUnits="userSpaceOnUse"
          width="6"
          height="6"
          patternTransform="rotate(${rotate})"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="6"
            stroke="${range[index % range.length]}"
            stroke-width="1"
          />
        </pattern>
      `
    )}
  </defs>
`;

export const withHatchFill = (valueFn) => (datum) =>
  `url(#hatch-${valueFn(datum)})`;
