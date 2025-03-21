import { ErrorRequestHandler } from "express";
import { ValidationError } from "express-json-validator-middleware";

export const validationErrorHandler: ErrorRequestHandler = (error, _req, response, next) => {
    if (error instanceof ValidationError) {
        response.status(422).send(error.validationErrors);
        next();
    } else {
        next(error);
    }
};
