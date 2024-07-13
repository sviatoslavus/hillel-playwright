import {test, expect} from '@playwright/test'


test('/cars/models public request', async ({ request }) => {
    const response = await request.get('/api/cars/models');
    console.log(await response.status());
    const body = await response.json();
    const allCars = body.data;
    expect(response.status()).toBe(200)
});
