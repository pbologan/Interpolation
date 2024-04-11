export function parseStringToNumberArray(str: string): number[] | Error {
  const numbers = str.trim().split(" ")
    .map(s => s.trim())
    .map(s => {
      if (s.includes(",")) {
        return s.replace(",", ".");
      } else {
        return s;
      }
    })
    .map(s => parseFloat(s));
  const hasNaN = numbers.some(el => isNaN(el));
  if (hasNaN) {
    return { name: "Неправильный ввод", message: "Необходимо ввести числа через пробел" }
  }
  return numbers;
}

export function parseStringToNumber(str: string): number | Error {
  let value = str.trim();
  if (value.includes(",")) {
    value = value.replace(",", ".")
  }
  const num = parseFloat(value);

  if (isNaN(num)) {
    return { name: "Неправильный ввод", message: "Необходимо ввести число" }
  }

  return num;
}

export function isError(value: any): value is Error {
  return value.name !== undefined && value.message !== undefined;
}
