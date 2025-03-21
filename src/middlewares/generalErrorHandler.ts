import { ErrorRequestHandler } from "express";

export const generalErrorHandler: ErrorRequestHandler = (error, _req, response, _next) => {
    console.error(error);
    response.status(500).send('Internal server error');
};
