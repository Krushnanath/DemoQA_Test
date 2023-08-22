class Links{

    constructor(page){
        this.page = page;
        this.mainHeader = page.locator(".main-header");
        this.newWindowLink = page.locator("//a[@id='simpleLink']");
        this.createdApiLink = page.locator("//a[@id='created']");
        this.messageText =  page.locator("//p[@id='linkResponse']");
        this.noContentAPILink = page.locator("//a[@id='no-content']");
        this.movedAPILink = page.locator("//a[@id='moved']");
    }
    async getMainHeader(){

        return await this.mainHeader;

    }
    async openNewWindowLink(){
        // Get the current window.
        const currentPage = this.page;
        // Get the promise for the popup event.
        const page1Promise = this.page.waitForEvent("popup");
        // now clicking on the desired link
        await this.newWindowLink.click();
        // Get the popup window.
        const page1 = await page1Promise;
        //checking if the new window tab opened
        let flag = false;
        if (currentPage !== page1) {
            flag = true;
        } else {
            flag = false;
        }
        console.log("Current page: ", currentPage.url());
        console.log("New window Page: ", page1.url());
        return flag;
    }
    async openApiLink(){

        // intercept the api call
        /// below part is neccesory for the creating simulated responce that actual site gives. needed for playwright.
        await this.page.route("**/created", (route) => {
            route.fulfill({
                status: 201,
             // @ts-ignore
                statusText: "Created",
            });
        });
        await this.createdApiLink.click();
         const messageText = await this.messageText.textContent();
         console.log("Message Text :", messageText, typeof(messageText));
         if(messageText.includes("Link has responded with staus 201 and status text Created")){
            return true;
         }
         else return false;

    }
    async openNoContentLink(){

        await this.page.route("**/no-content", (route) => {
            route.fulfill({
              status: 204,
              // @ts-ignore
              statusText: "No Content",
            });
          });
        
          await this.noContentAPILink.click();
          let messageText = await this.messageText.textContent();
          if(messageText.includes("Link has responded with staus 204 and status text No Content")){
            return true;
         }
         else return false;
    }
    async openMovedPermanentlyLink(){

        await this.page.route("**/moved", (route) => {
            route.fulfill({
              status: 301,
              // @ts-ignore
              statusText: "Moved Permanently",
            });
          });
        
          await this.movedAPILink.click();
          let messageText = await this.messageText.textContent();
          if(messageText.includes("Link has responded with staus 301 and status text Moved Permanently")){
            return true;
         }
         else return false;
            
    }
}
module.exports = {Links};