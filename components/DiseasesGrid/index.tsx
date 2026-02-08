import DiseaseCard from "./DiseaseCard";
import { Grid } from "@mui/material";
import { disease } from "../../types/disease";

interface DiseasesProps {
  diseases: disease[];
}

const DiseasesGrid: React.FC<DiseasesProps> = ({ diseases }) => {
  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {diseases.map((disease) => (
              <Grid size={2} key={disease.id}>
                  <DiseaseCard disease={disease} />
              </Grid>
          ))}
      </Grid>
    </>
  );
};
export default DiseasesGrid;