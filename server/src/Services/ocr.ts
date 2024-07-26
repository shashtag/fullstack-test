// Constructor to initialize the OCR class with an image
export class OCR {
  image: string;
  constructor({ image }) {
    this.image = image;
  }

  // Method to read text from the image
  async readTextFromImage(): Promise<string> {
    // Simulate a random error for demonstration purposes
    if (Math.floor(Math.random() * 2 + 1) === 1)
      throw new Error("Oops! Could not read the image please try again");

    // Generate a mock OCR response
    let r = Math.random().toString(36);
    return "This is a mock text as a mock OCR response : " + r;
  }

  // Method to validate the image before processing
  async validateImage(): Promise<void> {
    // Check if the image is provided
    if (!this.image || this.image.length === 0) {
      throw new Error("Kindly upload an image to proceed.");
    }

    // Check if the image size is less than 5MB
    if (this.getImageSize() > 5) {
      throw new Error("Image size should be less than 5MB");
    }
  }

  // Private method to calculate the size of the image
  private getImageSize(): number {
    var stringLength = this.image.length - "data:image/png;base64,".length;

    var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    return sizeInBytes / 1024 / 1024;
  }
}
