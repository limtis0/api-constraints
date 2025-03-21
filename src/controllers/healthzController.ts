import { Router } from "express";
import asyncHandler from "express-async-handler";

const router = Router();

router.get('/healthz', asyncHandler(async (_req, res) => {
    res.status(200).send('OK');
}));

export default router;
