export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};
