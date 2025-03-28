import { Days } from "@/dataTypes/weather";
import { Box, Card, Grid2 } from "@mui/material";

export default function WeeklyForcast({ week }: { week: Array<Days> }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 4, md: 14 }}
        direction={"row"}
        sx={{ width: "60vw", justifyContent: "space-evenly" }}
      >
        {week.slice(0, 7).map((item, index) => (
          <Grid2 key={index} size={{ xs: 4, sm: 4, md: 2 }}>
            <Card sx={{ padding: 3, height: "25vh" }}>
              <h1>{`${item.temp}°F`}</h1>
              <h3>{<span className="font-bold">{item.conditions}</span>}</h3>
              <p>{`H: ${item.tempmax}`}</p>
              <p>{`L: ${item.tempmin}`}</p>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
