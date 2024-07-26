export class OCR {
  image: string;
  constructor({ image }) {
    this.image = image;
  }

  async readTextFromImage(): Promise<string> {
    if (Math.floor(Math.random() * 2 + 1) === 1)
      throw new Error("Oops! Could not read the image please try again");
    let r = Math.random().toString(36);
    return "This is a mock text as a mock OCR response : " + r;
  }
}
