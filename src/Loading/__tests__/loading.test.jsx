import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
    it('renders with no label by default', () => {
        const { container } = render(<Loading />);
        const noDivs = container.firstChild.querySelectorAll('div');

        expect(noDivs).toHaveLength(0);
    });

    it('renders with label', () => {
        const label = 'Loading...';
        const { container, getByText } = render(<Loading label={label} />);
        const oneDiv = container.firstChild.querySelectorAll('div');

        expect(getByText(label)).toBeInTheDocument();
        expect(oneDiv).toHaveLength(1);
    });

    it('renders with svg prop', () => {
        const logo = () => <svg />;
        const { container } = render(<Loading svg={logo} />);

        const [svg] = container.querySelectorAll('svg');

        expect(svg.getAttributeNames()).toHaveLength(0);
    });

    it('renders with svg prop with height and width', () => {
        const logo = (props) => <svg {...props} />;
        const { container } = render(<Loading height={10} width={10} svg={logo} />);

        const [svg] = container.querySelectorAll('svg');

        expect(svg.getAttributeNames()).toHaveLength(2);
        expect(svg).toHaveAttribute('height', '10');
        expect(svg).toHaveAttribute('width', '10');
    });
});
