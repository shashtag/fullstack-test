import { logger } from "../config";

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

  async validateImage(): Promise<void> {
    if (!this.image) {
      throw new Error("Kindly upload an image to proceed.");
    }
    if (this.getImageSize() > 5) {
      throw new Error("Image size should be less than 5MB");
    }
  }

  private getImageSize(): number {
    var stringLength = this.image.length - "data:image/png;base64,".length;

    var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    return sizeInBytes / 1024 / 1024;
  }
}
