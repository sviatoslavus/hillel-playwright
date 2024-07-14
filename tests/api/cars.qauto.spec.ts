import {test, expect} from '@playwright/test'


test('/cars/models public request', async ({ request }) => {
    const response = await request.get('/api/cars/models');
    console.log(await response.status());
    const body = await response.json();
    const allCars = body.data;
    expect(response.status()).toBe(200)
});
test('get cars for current users', async ({request})=>{
    const response = await request.get('/api/cars');
    console.log(await response.json());
})
test('get 404 for not existing car id', async({request})=>{
    const invalidId = 100
    const response = await request.get(`/api/cars/models/${invalidId}`)
    expect(response.status()).toBe(404)
})
test('user cant create car with invalid brand id', async ({request}) => {
    const invalidId = 100
    const response =  await request.post('/api/cars', {data:
        {
            "carBrandId": invalidId,
            "carModelId": 1,
            "mileage": 122
          }
    })
    console.log(await response.json());
    expect(response.status()).toBe(404)
})