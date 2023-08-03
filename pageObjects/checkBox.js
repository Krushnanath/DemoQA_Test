// @ts-check

class CheckBox {
  constructor(page) {
    this.page =page;
    this.expandIcon = page.locator(
      "(//*[name()='svg'][@class='rct-icon rct-icon-expand-close'])[1]"
    );
    this.firsticon = page.locator(".rct-icon.rct-icon-expand-close");
    this.selectionResult = page.locator("//div[@id='result']");
  }

  async expandAllToggle() {
    await this.firsticon.click();
    for (let i = 0; i < 5; i++) {
      await this.expandIcon.click();
    }
  }
  async matchWithSelection() {
    let selection = [
      "Desktop",
      "Notes",
      "Commands",
      "React",
      "Classified",
      "General",
      "excelFile",
    ];
    let selectionResultText = await this.selectionResult.allTextContents();
    selectionResultText = selectionResultText.map((item) => item.toLowerCase());
    selection = selection.map((item) => item.toLowerCase());

    console.log(typeof selectionResultText, typeof selection);
    //const selectionLower = selectionResultText.toLowerCase();
    console.log(selectionResultText, selection);
    let match;
    for (let i = 0; i < selection.length; i++) {
      // @ts-ignore
      if (selectionResultText[0].includes(selection[i])) {
        console.log("String Matched");
        match = true;
      } else {
        console.log("Not Matched");
        match = false;
        break;
      }
    }
    return match;
  }
}
module.exports = { CheckBox };
