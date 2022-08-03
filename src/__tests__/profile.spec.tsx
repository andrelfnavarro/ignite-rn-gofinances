import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../screens/Profile';

describe('Profile', () => {
  it('should show correct text input placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();
  });

  it('should have correct input values placeholder', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('André');
    expect(inputSurname.props.value).toEqual('Navarro');
  });

  it('should show correct screen title', () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Profile Page');
  });
});
