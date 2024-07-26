import { render, screen } from "@testing-library/react";
import Loader from "../../../src/Components/Common/Loader";

describe("Loader Component", () => {
  it("should display the loader when loading is true", () => {
    render(<Loader loading={true} />);
    const loaderElement = screen.getByRole("loading");
    expect(loaderElement).toBeInTheDocument();
  });

  it("should not display the loader when loading is false", () => {
    render(<Loader loading={false} />);
    const loaderElement = screen.queryByRole("loading");
    expect(loaderElement).not.toBeInTheDocument();
  });
});
