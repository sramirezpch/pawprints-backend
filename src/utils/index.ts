import { ValidationError, ValidationErrorItem } from "sequelize";

const formatSequelizeError = (error: Error): Record<string, any> => {
  console.log(error instanceof ValidationError);
  if (error instanceof ValidationError) {
    return error.errors.reduce(
      (acc: Record<string, any>, curr: ValidationErrorItem) => {
        if (curr.path) {
          acc[curr.path] = {
            message: curr.message,
          };
          if (curr.type)
            acc[curr.path] = { ...acc[curr.path], type: curr.type };
        } else {
          const genericKey = "general";

          acc[genericKey] = [...acc[genericKey], { message: curr.message }];
        }

        return acc;
      },
      {}
    );
  } else {
    return { error: error.message || "Unknown error", type: "Unkown" };
  }
};

export default { formatSequelizeError };
