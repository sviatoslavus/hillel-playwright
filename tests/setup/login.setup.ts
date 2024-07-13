import { test as setup } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
const validUser = {
    name: "Sviat",
    lastName: "Peralta",                        // place elsewhere later
    email: "aqa-sviat.peralta@test.com",
    password: "Qauto123"
}

setup('authenticate', async ({ page }) => {
   
  
        const homePage = new HomePage(page)
        await homePage.navigate()
        await homePage.signInAsUser(validUser)
        await page.getByRole('button', {name:'Add Car'}).waitFor()
        await page.context().storageState({ path: 'session-storage.json' });

  });