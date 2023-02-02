import { fireEvent, render } from '@testing-library/react';
import FilterValueChips from '../FilterValueChips';

const VALUE = ['a', 'b'];

describe('FilterValueChips', () => {
    it('renders null when visible is false', () => {
        const { queryByText } = render(
            <FilterValueChips
                value={VALUE}
                name=''
                resetFilter={() => undefined}
                visible={false}
            />
        );
        
        expect(queryByText(VALUE[0])).not.toBeInTheDocument();
    });

    it('renders chips when visible is true', () => {
        const { queryByText } = render(
            <FilterValueChips
                value={VALUE}
                name=''
                resetFilter={() => undefined}
                visible
            />
        );
        
        expect(queryByText(VALUE[0])).toBeInTheDocument();
    });
});
