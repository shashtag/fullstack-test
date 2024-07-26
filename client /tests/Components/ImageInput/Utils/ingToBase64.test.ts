import imgToBase64 from "../../../../src/Components/ImageInput/Utils/imgToBase64";

describe("imgToBase64", () => {
  it("should convert data URL to base64 string", () => {
    const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
    const expectedBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAUA";

    const result = imgToBase64(img);

    expect(result).toBe(expectedBase64);
  });

  it("should handle non-base64 data URL", () => {
    const img = "data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==";
    const expectedBase64 = "SGVsbG8sIFdvcmxkIQ==";

    const result = imgToBase64(img);

    expect(result).toBe(expectedBase64);
  });

  it("should return the same string if no data URL prefix is present", () => {
    const img = "iVBORw0KGgoAAAANSUhEUgAAAAUA";
    const expectedBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAUA";

    const result = imgToBase64(img);

    expect(result).toBe(expectedBase64);
  });
});
