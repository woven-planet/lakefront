import React from "react";
import { render } from "@testing-library/react";
import Checkbox from "../Checkbox";
import { ReactComponent as Check } from "../assets/check.svg";

describe("Checkbox", () => {
  it("renders un-checked checkbox and no label by default", () => {
    const { queryByRole } = render(<Checkbox />);

    expect(queryByRole("checkbox")).toBeInTheDocument();
  });

  it("renders un-checked checkbox with label when label provided", () => {
    const label = "Checkbox";
    const { queryByRole, getByText } = render(<Checkbox label={label} />);

    getByText(label);
    expect(queryByRole("checkbox")).toBeInTheDocument();
  });

  it('renders checked checkbox when "checked" prop is true', () => {
    const { container } = render(<Checkbox checked />);
    
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders indeterminate checkbox when "indeterminate" prop is true', () => {
    const { container } = render(<Checkbox indeterminate />);
    
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders provided svg when "checkedIcon" is provided', () => {
    const { container } = render(<Checkbox checked checkedIcon={<Check />} />);
    
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it.todo("triggers handler when checkbox is changed");

  it.todo("prevents handler trigger when disabled prop is true");

  it("FAILS UNTIL TEST ARE WRITTEN", () => {
    expect("TODO").toBe("COMPLETE");
  });
});
