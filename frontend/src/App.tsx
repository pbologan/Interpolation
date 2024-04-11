import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ChartData } from "./types.ts";
import { Charts } from "./widgets/Charts/Charts.tsx";
import { Inputs } from "./widgets/Inputs/Inputs.tsx";
import restApi from "./api.ts";
import { AxiosError } from "axios";

export default function App() {
  const [data, setData] = useState<ChartData[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const onInterpolate = (xValues: number[], yValues: number[], stepValue: number, precision: number) => {
    if (xValues.length !== yValues.length) {
      setError({
        name: "Разное количество элементов",
        message: "Количество элементов должно быть одинаковым",
      });
      return;
    }

    restApi.getChartData({
      x_values: xValues,
      y_values: yValues,
      step: stepValue,
      precision,
    }).then(response => {
      setData(response);
    }).catch((error: AxiosError) => {
      setError({
        name: error.name,
        message: error.message
      });
    });
  };

  const onInputError = (inputError: Error) => {
    setError(inputError);
  };

  return (
    <Container>
      <Box sx={{
        width: "100%",
        height: "100%",
        maxWidth: "1200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {(data !== null && data.length > 0)
          ? <Charts onReset={() => setData(null)} data={data} />
          : <Inputs onInterpolate={onInterpolate} onError={onInputError} />
        }
      </Box>
      <Modal sx={{ display: "flex", justifyContent: "center", alignItems: "center"}} open={error !== null}>
        <Paper
          elevation={3}
          sx={{
            width: "400px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 3,
            px:3,
          }}
        >
          <Typography variant="h5" align="center">{error?.name}</Typography>
          <Typography sx={{ my:2 }} align="center">{error?.message}</Typography>
          <Button sx={{ mt:1 }} size="small" variant="contained" onClick={() => setError(null)}>Close</Button>
        </Paper>
      </Modal>
    </Container>
  );
}
