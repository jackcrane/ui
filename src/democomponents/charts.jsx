import { BarChart } from "../components/charts/bar";
import { LineChart } from "../components/charts/line";
import { RadarChart } from "../components/charts/radar";

export const Charts = () => {
  return (
    <div>
      <h2>Charts</h2>
      <RadarChart />
      <BarChart />
      <LineChart />
    </div>
  );
};
