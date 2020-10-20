interface InputValues {
  weight: number;
  height: number;
}

interface Query {
  weight?: number;
  height?: number;
}

interface Result extends InputValues {
  bmi: string;
}

interface ErrorObject {
  error: string;
}

const parseQuery = (query: Query): InputValues => {
  const weight = query.weight;
  const height = query.height;
  if (!weight || !height || isNaN(weight) || isNaN(height)) {
    throw new Error("malformatted parameters");
  }
  return {
    weight: Number(weight),
    height: Number(height) / 100,
  };
};

const calculateBmi = (weight: number, height: number): string => {
  const result: number = weight / height ** 2;

  if (result < 15) {
    return "Very severely underweight";
  } else if (result < 16) {
    return "Severely underweight";
  } else if (result < 18.5) {
    return "Underweight";
  } else if (result < 25) {
    return "Normal (healthy weight)";
  } else if (result < 30) {
    return "Overweight";
  } else if (result < 35) {
    return "Moderately obese";
  } else if (result < 40) {
    return "Severely obese";
  } else {
    return "Very severely obese";
  }
};

const bmiCalculator = (query: Query): Result | ErrorObject => {
  try {
    const { weight, height } = parseQuery(query);
    const bmi = calculateBmi(weight, height);
    return {
      weight,
      height: height * 100,
      bmi,
    };
  } catch (err) {
    const errorMessage = (err as Error).message;
    return {
      error: errorMessage,
    };
  }
};

export default bmiCalculator;
