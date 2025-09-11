import React from 'react';
import { render } from '@testing-library/react';
import ButtonGroup from '../ButtonGroup'

describe('<ButtonGroup />', () => {
  it('renders ButtonGroup', () => {
    render(<ButtonGroup mode={'toggle'} buttonConfigs={[]} />);
    expect('test').toBe('implemented');
  });
});
