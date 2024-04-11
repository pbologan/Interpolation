import { FC } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartData } from "../../types.ts";

interface ChartsProps {
  onReset: () => void;
  data: ChartData[];
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    console.log(payload)
    return (
      <Paper
        sx={{
          width: "60px",
          height: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          p:2,
        }}
        elevation={4}>
        <Typography width="100%" align="left">{`x: ${payload[0].payload.x}`}</Typography>
        <Typography width="100%" align="left">{`y: ${payload[0].payload.y}`}</Typography>
      </Paper>
    );
  }

  return null;
};

export const Charts: FC<ChartsProps> = ({ onReset, data }) => {
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          p:2,
          m:2,
        }}>
        <Button onClick={onReset} variant="contained">
          Reset
        </Button>
      </Paper>
      <Paper sx={{ width: "100%", p:2 }}>
        <Grid container spacing={2}>
          {data.map(el => (
            <Grid
              key={el.name}
              item xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Box sx={{
                width: "500px",
                height: "350px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Typography sx={{ marginY: 1 }} variant="h5" align="center">{el.name}</Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={el.data}>
                    <Line dataKey="x" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis dataKey="y" />
                    <Tooltip content={<CustomTooltip /> }/>
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};
