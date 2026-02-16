'use client';
import { plant } from "@/types/plant";
import PlantCard from "./PlantCard";
import { Grid } from "@mui/system";
import SearchBar from "../shared/SearchBar";

interface PlantsProps {
  plants: plant[];
}

const PlantsGrid: React.FC<PlantsProps> = ({ plants }) => {
  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }}>
          {plants.map((plant) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={plant.id}>
                  <PlantCard Plant={plant} />
              </Grid>
          ))}
      </Grid>
    </>
  );
};
export default PlantsGrid;