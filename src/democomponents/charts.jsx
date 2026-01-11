import { BarChart } from "../components/charts/bar";
import { LineChart } from "../components/charts/line";
import { RadarChart } from "../components/charts/radar";

const percentFormat = (value) => `${Math.round(value * 100)}%`;

const colorOptions = {
  domain: ["individual", "average"],
  range: ["var(--primary-color)", "var(--danger-color)"],
  legend: true,
};

const categoryData = [
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

const lineData = [
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

const radarData = [...categoryData];

const barXAxis = {
  tickFormat: percentFormat,
  grid: true,
};

const barYAxis = {
  label: null,
};

const lineXAxis = {
  label: null,
};

const lineYAxis = {
  label: null,
  grid: true,
};

export const Charts = () => {
  return (
    <div>
      <h2>Charts</h2>
      <RadarChart
        data={radarData}
        width={450}
        height={450}
        colorOptions={colorOptions}
        hatchRotate={45}
      />
      <BarChart
        data={categoryData}
        width={520}
        height={340}
        marginLeft={110}
        x={barXAxis}
        y={barYAxis}
        colorOptions={colorOptions}
      />
      <LineChart
        data={lineData}
        width={520}
        height={320}
        marginBottom={70}
        x={lineXAxis}
        y={lineYAxis}
        colorOptions={colorOptions}
        curve="monotone-x"
        pointRadius={4}
      />
    </div>
  );
};
