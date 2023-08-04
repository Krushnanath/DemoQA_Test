class Buttons{

    constructor(page){
        this.page = page;
        this.mainHeader = page.locator(".main-header");
        this.doubleClickButton = page.locator("//button[@id='doubleClickBtn']");
        this.dblClickMessage = page.locator("//p[@id='doubleClickMessage']");
        this.rightClickButton = page.locator("//button[@id='rightClickBtn']");
        this.rightClickMessage = page.locator("//p[@id='rightClickMessage']");
        this.dynamicButton = page.locator("//button[@class='btn btn-primary']").nth(2);
        this.dynamicButtonClkMessage = page.locator("//p[@id='dynamicClickMessage']");
    }
    async getMainHeader(){

        return await this.mainHeader;
    }
    async performDoubleClick(){

        await this.doubleClickButton.dblclick();
    }
    async getdblClickMessage(){

        let message = await this.dblClickMessage.allTextContents();
       return message;
  
    }
    async performRightClick(){

        await this.rightClickButton.click({ button: "right" });
    }
    async getRightClickMessage(){

        let message = await this.rightClickMessage.allTextContents();
        return message;
    }
    async performDynamicButtonClk(){

        await this.dynamicButton.click();
    }
    async getDynamicBtnMessage(){

        let message = await this.dynamicButtonClkMessage.allTextContents();
       return message;
    }


}
module.exports = {Buttons};