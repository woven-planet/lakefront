import React from "react";
import { render } from "@testing-library/react";
import Input from "../../Input/Input";

const LABEL = 'Label';

describe('Input', () => {
    describe('general rendering', () => {
        it('renders the label and its text', () => {
            const { container } = render(
                <Input label={LABEL} />
            );

            const [label] = container.querySelectorAll('label');

            expect(label).toHaveTextContent(LABEL);
        });

        it('should not render the label when no label prop present', () => {
            const { container } = render(
                <Input />
            );

            const [label] = container.querySelectorAll('label');

            expect(label).toBeFalsy();
        });
    });
});
