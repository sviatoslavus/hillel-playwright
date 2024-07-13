import { userGaragePage as test, userGaragePage} from "../src/fixtures/userGarageFixture";
import { GaragePage } from '../src/pages/GaragePage'
import { expect } from "@playwright/test";
import { ProfilePage } from "../src/pages/ProfilePage";

let garagePage:GaragePage
    const mokedUser = {
    "status":"ok",
    "data": {
    "userId":130714,
    "photoFilename":"default-user.png",
    "name":"Sviat",
    "lastName":"Mockus"
    }
    
}

test.only('open profile page', async ({storagePage}) => {
    let garagePage = new GaragePage(storagePage)
    let profilePage = new ProfilePage(storagePage)
    // const response = await request.get('https://qauto.forstudy.space/api/users/profile')
    // const data = await response.json()

    await storagePage.route('/api/users/profile', route =>{
        route.fulfill({
            body: JSON.stringify(mokedUser)
        })
    })
    await storagePage.goto('/')
    await garagePage.sideBar.profileButton.click()
    expect(profilePage.profileName).toHaveText('Sviat Mockus')
    await storagePage.pause()
})