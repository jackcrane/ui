import { BarChart } from "../components/charts/bar";
import { RadarChart } from "../components/charts/radar";

export const Charts = () => {
  return (
    <div>
      <h2>Charts</h2>
      <RadarChart />
      <BarChart />
    </div>
  );
};
