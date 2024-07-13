import { userGaragePage as test, userGaragePage} from "../src/fixtures/userGarageFixture";
import { GaragePage } from "../src/pages/GaragePage";
import {expect} from '@playwright/test'


test('open garage page', async ({storagePage}) => {
    let garagePage = new GaragePage(storagePage)
    
    await storagePage.goto('/')
    await garagePage.addCar('Audi', 'TT', 12345)
    await expect(storagePage.getByText('Audi TT')).toBeVisible()
})