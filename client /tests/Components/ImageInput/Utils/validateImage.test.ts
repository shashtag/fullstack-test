import { toast } from "react-toastify";
import { vi } from "vitest";
import validateImage from "../../../../src/Components/ImageInput/Utils/validateImage";

// Mock the toast function
vi.mock("react-toastify", () => ({
  toast: vi.fn(),
}));

describe("validateImage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return 0 and show error toast if no file is provided", () => {
    const result = validateImage(null as unknown as File);
    expect(result).toBe(0);
    expect(toast).toHaveBeenCalledWith(
      "Whoops! It seems you did not select an image. Please choose one to continue.",
      {
        theme: "dark",
        type: "error",
      },
    );
  });

  it("should return 0 and show error toast if file size exceeds 5MB", () => {
    const largeFile = new File(["a".repeat(5 * 1024 * 1024 + 1)], "large.png", {
      type: "image/png",
    });
    const result = validateImage(largeFile);
    expect(result).toBe(0);
    expect(toast).toHaveBeenCalledWith(
      "Please ensure that the file size is less than 5MB.",
      {
        theme: "dark",
        type: "error",
      },
    );
  });

  it("should return 1 if file is valid", () => {
    const validFile = new File(["a".repeat(1024)], "valid.png", {
      type: "image/png",
    });
    const result = validateImage(validFile);
    expect(result).toBe(1);
    expect(toast).not.toHaveBeenCalled();
  });
});
