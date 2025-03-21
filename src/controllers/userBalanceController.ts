import { balanceNonNegativeConstraint, User } from "@/models/user";
import { validate } from "@/utils/validate";
import { Request, Router } from "express";
import { AllowedSchema } from "express-json-validator-middleware";
import asyncHandler from "express-async-handler";
import { DatabaseError } from "sequelize";

const router = Router();

// Id is actually a number, but something is wrong with the types, so I "hacked" it
type ChangeBalanceRequest = Request<{ id: string }, {}, { amount: number }>;

const changeBalanceParamsSchema: AllowedSchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: {
            type: 'string'
        }
    }
}

const changeBalanceBodySchema: AllowedSchema = {
    type: 'object',
    required: ['amount'],
    properties: {
        amount: {
            type: 'integer',
            minimum: 1
        }
    }
}

router.post('/user/:id/balance/increment', validate({
    params: changeBalanceParamsSchema,
    body: changeBalanceBodySchema
}), asyncHandler(async (req: ChangeBalanceRequest, res) => {
    try {
        await User.increment('balance',
            {
                by: req.body.amount,
                where: {
                    id: req.params.id
                }
            }
        );
    }
    catch (e) {
        if (e instanceof DatabaseError) {
            console.log(e.message);
        }
    }

    res.status(200).send();
}));

router.post('/user/:id/balance/decrement', validate({
    params: changeBalanceParamsSchema,
    body: changeBalanceBodySchema
}), asyncHandler(async (req: ChangeBalanceRequest, res) => {
    try {
        await User.decrement('balance',
            {
                by: req.body.amount,
                where: {
                    id: req.params.id
                }
            }
        );
    }
    catch (error) {
        if (error instanceof DatabaseError && Object.keys(error.original).includes('constraint')) {
            if (error.original['constraint'] === balanceNonNegativeConstraint) {
                res.status(403).send({ error: 'Insufficient balance.' });
                return;
            }
        }
    }

    res.status(200).send();
}));

export default router;
