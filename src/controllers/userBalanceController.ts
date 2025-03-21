import { User } from "@/models/user";
import { Request, Router } from "express";

const router = Router();

type ChangeBalanceRequest = Request<{ id: number }, {}, { amount: number }>;

router.post('/user/:id/balance/increment', async (req: ChangeBalanceRequest, res) => {
    await User.increment('balance',
        {
            by: req.body.amount,
            where: {
                id: req.params.id
            }
        }
    );
});

router.post('/user/:id/balance/decrement', async (req: ChangeBalanceRequest, res) => {
    await User.decrement('balance',
        {
            by: req.body.amount,
            where: {
                id: req.params.id
            }
        }
    );
});
