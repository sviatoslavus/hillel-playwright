import {Page, test} from '@playwright/test'


export const userGaragePage = test.extend<{storagePage:Page}>({
    storagePage: async({browser}, use)=>{
        const pageFromStorage = await browser.newPage({storageState:'session-storage.json'})
        await use(pageFromStorage)
    }
})