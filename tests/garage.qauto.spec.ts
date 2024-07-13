import  { test, expect } from "@playwright/test"
import { HomePage } from "../src/pages/HomePage"
import { GaragePage } from "../src/pages/GaragePage"
import { SignInModal } from "../src/pages/Components/SignInModal"


let garagePage:GaragePage


test.describe("garage test", () => {

    test.beforeEach(async({page})=>{
        
        garagePage = new GaragePage(page);
        await garagePage.navigate()
        
      })
    
    test.only('user can add a car', async({page})=>{
      await garagePage.addCar('Audi', 'TT', 1234)
      expect(page.getByText('Audi TT')).toBeVisible()
      await page.pause()
       
        
      })
})