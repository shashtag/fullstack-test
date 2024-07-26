import { render, screen } from "@testing-library/react";
import ImgPreview from "../../src/Components/ImgPreview";

describe("ImgPreview", () => {
  it("should render with the correct background image", () => {
    const previewUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
    render(<ImgPreview previewUrl={previewUrl} />);

    const divElement = screen.getByRole("img-preview");
    expect(divElement).toHaveStyle({
      backgroundColor: "#7B937F",
      backgroundImage: `url(${previewUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    });
  });

  it("should render with a null background image", () => {
    render(<ImgPreview previewUrl={null} />);

    const divElement = screen.getByRole("img-preview");
    expect(divElement).toHaveStyle({
      backgroundColor: "#7B937F",
      backgroundImage: "url(null)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    });
  });
});
