import axios from "axios";
import { ChartData, ChartDataRequest } from "./types.ts";

class RestAPI {
  private client = axios.create({
    baseURL: "https://interpolation-ct01.onrender.com",
    paramsSerializer: {
      indexes: null
    }
  });

  public async getChartData(request: ChartDataRequest): Promise<ChartData[]> {
    const response = await this.client.get<ChartData[]>("/chart", {
      params: { ...request },
    });
    return response.data;
  }
}

export default new RestAPI();
