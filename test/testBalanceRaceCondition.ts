import axios from 'axios';

const TOTAL_REQUESTS = 10000;
const USER_ID = 1;
const AMOUNT = 2;
const BASE_URL = 'http://localhost:3000';

async function runTest() {
    console.log('Running a race condition test...');

    const requests = Array.from({ length: TOTAL_REQUESTS }, () =>
        axios.post(`${BASE_URL}/user/${USER_ID}/balance/decrement`, {
            amount: AMOUNT
        }).then(res => res.status).catch(err => err.response?.status || 'NETWORK_ERROR')
    );

    const results = await Promise.all(requests);

    const statusCount: Record<number | string, number> = {};

    for (const status of results) {
        statusCount[status] = (statusCount[status] || 0) + 1;
    }

    console.log('Status Code Summary:');
    for (const [status, count] of Object.entries(statusCount)) {
        console.log(`\t${status}: ${count}`);
    }
}

runTest();
