export interface ChartDataRequest {
  x_values: number[];
  y_values: number[];
  step: number;
  precision: number;
}

export interface ChartElement {
  x: number;
  y: number;
}

export interface ChartData {
  name: string;
  data: ChartElement[];
}
