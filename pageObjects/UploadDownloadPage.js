class UploadDownloads {
    constructor(page) {
        this.page = page;
        this.mainHeader = page.locator(".main-header");
        this.downloadButton = page.locator("//a[@id='downloadButton']");
        this.fileUploadInput = page.locator("//input[@id='uploadFile']");
        this.fileUploadInputXpath = "//input[@id='uploadFile']";
        this.successMessage = page.locator("//p[@id='uploadedFilePath']");
    }
    async getMainHeader() {
        const mainHeaderText = this.mainHeader.textContent();
        return mainHeaderText;
    }
    async startDownload() {
        // Register a download listener to wait for the download to start

        const downloadPromise = this.page.waitForEvent("download");

        // Click the download button to trigger the download
        await this.downloadButton.click();

        // Wait for the download event to be triggered
        const isDownloadStarted = await downloadPromise;

        // At this point, the download has started
        // You can add additional assertions here if needed

        // For example, you can check the suggested filename of the download
        const suggestedFilename = isDownloadStarted.suggestedFilename();
        console.log("Download started with suggested filename:", suggestedFilename, isDownloadStarted);
        if (isDownloadStarted)
            return true;
    }
    async getFileInputSection() {

        return this.fileUploadInput;
    }
    async uploadFile(filePath) {

        await this.page.setInputFiles(this.fileUploadInputXpath, filePath);

        // Wait for the file upload to complete (you may need to adjust the waiting condition based on the behavior of the website)
        await this.page.waitForTimeout(5000); // Wait for 5 seconds (adjust as needed)

        // Assert that the file upload is successful (you may need to check for specific changes on the page or some success message)
        // For example, if there is a success message displayed after the upload, you can use the following assertion:
        if(this.successMessage.isVisible()){
            console.log("File Uploaded sucessfully",await this.successMessage.textContent());
            return true;
        }
        else{
            console.log("File Uploaded Failed",await this.successMessage.textContent());
            return false;
        }
        
        
    }
}
module.exports = { UploadDownloads };
