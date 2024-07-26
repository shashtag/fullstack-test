import { describe, it, expect, vi, Mock } from "vitest";
import { Request, Response } from "express";
import recognizeText from "../../src/Controllers/ocr";
import { OCR } from "../../src/Services/ocr";
import { logger } from "../../src/config";

vi.mock("../../src/Services/ocr");
vi.mock("../../src/config");

describe("recognizeText", () => {
  it("should extract text from image and return it in response", async () => {
    const req = {
      body: {
        image: "test-image-data",
      },
    } as Request;

    const res = {
      json: vi.fn(),
    } as unknown as Response;

    const mockOCR = {
      validateImage: vi.fn().mockResolvedValue(true),
      readTextFromImage: vi.fn().mockResolvedValue("extracted text"),
    };

    (OCR as unknown as Mock).mockImplementation(() => mockOCR);

    const { recognizeText: abc } = recognizeText;
    await abc(req, res);

    expect(mockOCR.validateImage).toHaveBeenCalled();
    expect(mockOCR.readTextFromImage).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: "extracted text" });
  });

  it("should handle errors and return 500 status code", async () => {
    const req = {
      body: {
        image: "test-image-data",
      },
    } as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const mockOCR = {
      validateImage: vi.fn().mockRejectedValue(new Error("Validation error")),
      readTextFromImage: vi.fn(),
    };

    (OCR as unknown as Mock).mockImplementation(() => mockOCR);

    const { recognizeText: abc } = recognizeText;

    await abc(req, res);

    expect(mockOCR.validateImage).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith("Validation error");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Validation error" });
  });
});
