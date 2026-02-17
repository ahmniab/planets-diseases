import DiseaseCard from "./DiseaseCard";
import { Grid } from "@mui/material";
import { disease } from "../../types/disease";

interface DiseasesProps {
  diseases: disease[];
}

const DiseasesGrid: React.FC<DiseasesProps> = ({ diseases }) => {
  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }}>
          {diseases.map((disease) => (
              <Grid key={disease.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <DiseaseCard disease={disease} />
              </Grid>
          ))}
      </Grid>
    </>
  );
};
export default DiseasesGrid;