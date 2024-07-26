import { vi } from "vitest";
import compressImage from "../../../../src/Components/ImageInput/Utils/compressImage";

describe("compressImage", () => {
  it("should call success callback with a compressed file", (done: () => void) => {
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const successCallback = vi.fn((compressedFile) => {
      expect(compressedFile).toBeInstanceOf(Blob);
      done();
    });

    compressImage(file, successCallback);
  });
});
