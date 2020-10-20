interface InputValues {
  dailyExerciseHours: Array<number>;
  target: number;
}

interface RequestBody {
  daily_exercises?: Array<number>;
  target?: number;
}

interface ErrorObject {
  error: string;
}

interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

interface ExerciseInfo {
  trainingDays: number;
  totalHoursTrained: number;
}

const parseRequest = (requestBody: RequestBody): InputValues => {
  const daily_exercises = requestBody.daily_exercises;
  const target = requestBody.target;

  if (!daily_exercises || !target) {
    throw new Error("parameters missing");
  } else if (isNaN(target) || !Array.isArray(daily_exercises)) {
    throw new Error("malformatted parameters");
  }

  const dailyExerciseHours = daily_exercises.map((exerciseHours) => {
    if (isNaN(exerciseHours)) {
      throw new Error("malformatted parameters");
    }
    return Number(exerciseHours);
  });

  return {
    dailyExerciseHours,
    target: Number(target),
  };
};

const getAverage = (
  totalHoursTrained: number,
  trainingPeriod: number
): number => {
  return totalHoursTrained / trainingPeriod;
};

const isSuccess = (average: number, target: number): boolean => {
  return average >= target;
};

const getRating = (average: number, target: number): Rating => {
  if (average >= target) {
    return {
      rating: 3,
      ratingDescription: "Very good! Keep up the good work.",
    };
  } else if (target - average < 1) {
    return {
      rating: 2,
      ratingDescription: "Not too bad, but could be better.",
    };
  } else {
    return {
      rating: 1,
      ratingDescription: "Not good, try harder next time!",
    };
  }
};

const getExerciseInfo = (dailyExerciseHours: Array<number>): ExerciseInfo => {
  let totalHoursTrained = 0;
  let trainingDays = 0;

  for (const exerciseHours of dailyExerciseHours) {
    if (exerciseHours > 0) {
      trainingDays++;
    }
    totalHoursTrained += exerciseHours;
  }

  return {
    trainingDays,
    totalHoursTrained,
  };
};

const calculateExercise = (
  dailyExerciseHours: Array<number>,
  target: number
): ExerciseReport => {
  const periodLength = dailyExerciseHours.length;
  const { trainingDays, totalHoursTrained } = getExerciseInfo(
    dailyExerciseHours
  );
  const average = getAverage(totalHoursTrained, periodLength);
  const success = isSuccess(average, target);
  const { rating, ratingDescription } = getRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const exerciseCalculator = (
  requestBody: RequestBody
): ExerciseReport | ErrorObject => {
  try {
    const { dailyExerciseHours, target } = parseRequest(requestBody);
    return calculateExercise(dailyExerciseHours, target);
  } catch (err) {
    const errorMessage = (err as Error).message;
    return {
      error: errorMessage,
    };
  }
};

export default exerciseCalculator;
