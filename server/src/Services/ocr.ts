export class OCR {
  image: string;
  constructor({ image }) {
    this.image = image;
  }

  async readTextFromImage(): Promise<string> {
    if (Math.floor(Math.random() * 10 + 1) === 1)
      throw new Error("Oops! Could not read the image please try again");
    return "This is a mock text as a mock OCR response";
  }
}
