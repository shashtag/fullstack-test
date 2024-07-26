import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import TextDisplay from "../../src/Components/TextDisplay";

describe("TextDisplay Component", () => {
  it("renders the textarea with the correct text", () => {
    const setText = vi.fn();
    render(
      <TextDisplay loading={false} text='Hello, World!' setText={setText} />,
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue("Hello, World!");
  });

  it("disables the textarea when loading is true", () => {
    const setText = vi.fn();
    render(<TextDisplay loading={true} text='Loading...' setText={setText} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  it("calls setText on text change", () => {
    const setText = vi.fn();
    render(<TextDisplay loading={false} text='' setText={setText} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "New Text" } });
    expect(setText).toHaveBeenCalledWith("New Text");
  });
});
