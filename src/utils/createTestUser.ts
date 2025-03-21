import { User } from "@/models/user";

export async function createTestUser() {
    const [user] = await User.upsert(
        { id: 1, balance: 10_000 },
    );

    return user;
}
