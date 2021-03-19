import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StackBannerRow from "../StackBannerRow";

const CONTENT = "content";
const content = <div>{CONTENT}</div>;

describe("StackBannerRow", () => {
  it("renders stack banner row properly.", () => {
    const { getByText } = render(<StackBannerRow content={content} />);

    getByText(CONTENT);
  });

  it("handles onClick action", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <StackBannerRow onClick={onClick} content={content} />
    );

    fireEvent.click(getByText(CONTENT));

    expect(onClick).toHaveBeenCalled();
  });
});
