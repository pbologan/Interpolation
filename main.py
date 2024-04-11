import uvicorn
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from service import get_chart_data
from typing import List

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/chart")
async def chart(x_values: List[float] = Query(None), y_values: List[float] = Query(None), step: float = Query(None), precision: int = Query(None)):
    return get_chart_data(x=x_values, y=y_values, step=step, precision=precision)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
