class PopupEvents {

    constructor(page) {

        this.page = page;
        this.mainHeader = page.locator("//div[@class='main-header']");
        this.tabBtn = page.locator("//button[@id='tabButton']");
        this.windowBtn = page.locator("//button[@id='windowButton']");
        this.msgWindowBtn = page.locator("//button[@id='messageWindowButton']");

    }
    async getMainHeader() {

        let mainHeaderText = await this.mainHeader.textContent();
        return mainHeaderText;
    }
    async clickBtn(buttonType) {
        const popUpPromice = this.page.waitForEvent('popup');

        if (buttonType == 'NewTab') {
            await this.tabBtn.click();
        } else if (buttonType == 'NewWindow') {
            await this.windowBtn.click();
        }
        else {
            await this.msgWindowBtn.click();
        }

        const popUp = await popUpPromice;
        let currentPage = this.page;
        console.log("Popup URL: ", popUp.url(), ", current Page URL: ", currentPage.url());
        //checking if the newtab page has the desired url
        let flag;
        if ((popUp.url().includes("/sample")) || (popUp.url().includes("about:blank"))) {
            flag = true;
        } else flag = false;
        await popUp.close();
        return flag;

    }

}
module.exports = { PopupEvents };