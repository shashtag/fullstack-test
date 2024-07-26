import "@testing-library/jest-dom/vitest";

// Mock URL.createObjectURL
globalThis.URL.createObjectURL = vi.fn();
