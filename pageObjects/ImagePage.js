class Images{
  constructor(page) {
    this.page = page;
    this.mainHeader = page.locator(".main-header");
    this.allImages = page.locator("img");
  }

  async getMainHeader() {
    const mainHeaderText = await this.mainHeader.textContent();
    return mainHeaderText;
  }

  async getAllImageURL() {
    // get all image tags from page
    console.log(this.allImages);

    // Extract the src attribute from each image element
    const imageSrcs = await this.allImages.evaluateAll((elements) => {
      return elements.map((element) => element.getAttribute("src"));
    });

    console.log(imageSrcs);
    // now we are removing the imgages like advertising images
    const filteredImageSrcs = imageSrcs.filter(
      // @ts-ignore
      (element) => !element.includes("ad")
    );
    console.log(filteredImageSrcs);

    // we are creating the final url array that we will check one by one for all url

    const baseUrl = "https://demoqa.com";
    const finalUrls = filteredImageSrcs.map((url) => baseUrl + url);
    console.log(finalUrls);

    return finalUrls;
  }

  async checkImageURL(allImageURL) {
    //checking if every source of the image working properly by opeing src in new tab
    const imageResult = [];
    let flag = false;
    // Open a new tab for each image source URL
    for (const element of allImageURL) {
      let newPage = await this.page.context().newPage();

      await newPage.goto(element);

      let newPageImage = await newPage.locator("img");

      // Extract the src attribute from each image element for new page
      let newPageSrc = await newPageImage.evaluateAll((item) => {
        return item.map((item) => item.getAttribute("src"));
      });
      let newPageImageSrcs = newPageSrc.filter(
        // @ts-ignore
        (element) => !element.includes("ad")
      );
      console.log("New page", newPageImageSrcs);
      // checking that image src is present in the new tab

      // @ts-ignore
      if (newPageImageSrcs.some((src) => element.includes(src))) {
        imageResult.push(element, " is valid image", " true");
        console.log(element, " is valid image");
      } else {
        imageResult.push(element, " is broken image", " false");
        console.log(element, " is broken image");
        flag = true;
      }

      await newPage.close();
    }
    console.log(imageResult);
    return flag;
  }
}
module.exports = { Images };
