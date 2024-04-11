import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FC, useState } from "react";
import { isError, parseStringToNumber, parseStringToNumberArray } from "../../utils.ts";
import Box from "@mui/material/Box";

interface InputsProps {
  onInterpolate: (xValues: number[], yValues: number[], step: number, precision: number) => void;
  onError: (error: Error) => void;
}

export const Inputs: FC<InputsProps> = ({ onInterpolate, onError }) => {
  const [xInput, setXInput] = useState<string>("");
  const [yInput, setYInput] = useState<string>("");
  const [step, setStep] = useState<string>("")
  const [precision, setPrecision] = useState<number>(2);

  const onInterpolateClick = () => {
    const xValues = parseStringToNumberArray(xInput);
    const yValues = parseStringToNumberArray(yInput);
    const stepValue = parseStringToNumber(step);

    if (isError(xValues)) {
      onError(xValues)
      return;
    }
    if (isError(yValues)) {
      onError(yValues);
      return;
    }
    if (isError(stepValue)) {
      onError(stepValue);
      return;
    }

    onInterpolate(xValues, yValues, stepValue, precision);
  };

  return (
    <Paper sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      p:2,
      m:2,
    }}>
      <TextField
        required
        value={xInput}
        onChange={(e) => setXInput(e.target.value)}
        size="small"
        sx={{ my:1, width: "100%" }}
        variant="outlined"
        label="X VALUES"
      />
      <TextField
        required
        value={yInput}
        onChange={(e) => setYInput(e.target.value)}
        size="small"
        sx={{ my:1, width: "100%" }}
        variant="outlined"
        label="Y VALUES"
      />
      <Box sx={{
        display: "flex",
        flexDirection: "row"
      }}>
        <TextField
          required
          value={step}
          onChange={(e) => setStep(e.target.value)}
          size="small"
          sx={{ my:1, width: "100px" }}
          variant="outlined"
          label="Step"
        />
        <TextField
          type="number"
          required
          value={precision}
          onChange={(e) => setPrecision(parseInt(e.target.value))}
          size="small"
          sx={{ ml:1, my:1, width: "100px" }}
          variant="outlined"
          label="Precision"
        />
      </Box>
      <Button
        sx={{ mt:1 }}
        variant="contained"
        onClick={onInterpolateClick}
      >
        Interpolate
      </Button>
    </Paper>
  );
};
