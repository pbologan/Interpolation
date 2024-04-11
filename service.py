import numpy as np
from typing import Callable
from scipy.interpolate import CubicSpline, interp1d, BarycentricInterpolator, KroghInterpolator, CubicHermiteSpline, Akima1DInterpolator

methods = {
    'Interp1d (deprecated)': interp1d,
    'Cubic Spline': CubicSpline,
    'Barycentric Interpolator': BarycentricInterpolator,
    'Krogh Interpolator': KroghInterpolator,
    'Cubic Hermite Spline': CubicHermiteSpline,
    'Akima 1D Interpolator': Akima1DInterpolator,
}


def get_value(value, precision: int) -> float:
    if isinstance(value, np.ndarray):
        value = value.tolist()
    split = str(value).split(".")
    dec = split[1][0:precision]
    return float(f"{split[0]}.{dec}")


def get_new_values(first_x: float, last_x: float, step: float, precision: int, interp_fn: Callable[[float], float]) -> (list[float], list[float]):
    current = first_x
    new_x: list[float] = [current]
    new_y: list[float] = [get_value(interp_fn(current), precision)]

    while current < last_x:
        current += step
        if current <= last_x:
            new_x.append(get_value(current, precision))
            new_y.append(get_value(interp_fn(current), precision))

    return new_x, new_y


def get_chart_data(x: list[float], y: list[float], step: float, precision: int) -> list[dict[str, list[dict[float, float]]]]:
    result = []
    for name, method in methods.items():
        if name == 'Cubic Hermite Spline':
            interp_fn = method(x, y, np.gradient(y, x))
        else:
            interp_fn = method(x, y)
        new_values: (list[float], list[float]) = get_new_values(x[0], x[-1], step, precision, interp_fn)
        data = []
        for i in range(len(new_values[0])):
            data.append({
                "x": new_values[0][i],
                "y": new_values[1][i],
            })
        result.append({"name": name, "data": data})
    return result


