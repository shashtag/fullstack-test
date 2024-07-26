import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { toast } from "react-toastify";

import { act } from "@testing-library/react";
import sendImgToBackend from "../../../../src/Components/ImageInput/Utils/sendImgToBackend";

const mock = new MockAdapter(axios);
vi.mock("react-toastify", () => ({
  toast: vi.fn(),
}));

describe("sendImgToBackend", () => {
  it("should set preview URL and text on successful API call", async () => {
    const setPreviewUrl = vi.fn();
    const setText = vi.fn();
    const setLoading = vi.fn();
    const reader = { result: "data:image/png;base64,example" } as FileReader;

    mock
      .onPost("http://localhost:8000/ocr")
      .reply(200, { message: "OCR text" });

    await act(async () => {
      await sendImgToBackend(
        "base64Img",
        setPreviewUrl,
        setText,
        setLoading,
        reader,
      );
    });

    expect(setPreviewUrl).toHaveBeenCalledWith(reader.result);
    expect(setText).toHaveBeenCalledWith("OCR text");
    expect(setLoading).toHaveBeenCalledWith(false);
  });

  it("should handle API call failure", async () => {
    const setPreviewUrl = vi.fn();
    const setText = vi.fn();
    const setLoading = vi.fn();
    const reader = { result: "data:image/png;base64,example" } as FileReader;

    mock
      .onPost("http://localhost:8000/ocr")
      .reply(400, { error: "Error message" });

    await act(async () => {
      await sendImgToBackend(
        "base64Img",
        setPreviewUrl,
        setText,
        setLoading,
        reader,
      );
    });

    expect(toast).toHaveBeenCalledWith("Error message", {
      theme: "dark",
      type: "error",
    });
    expect(setPreviewUrl).toHaveBeenCalledWith(null);
    expect(setText).toHaveBeenCalledWith("");
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});
