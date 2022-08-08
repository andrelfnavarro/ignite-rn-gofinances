import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { Register } from '.';
import theme from '../../global/styles/theme';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('Screens/Register', () => {
  it('should open category select modal when clicking on category button', async () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId('category-modal');
    expect(categoryModal.props.visible).toBe(false);

    fireEvent.press(getByTestId('category-select-button'));

    await waitFor(() => {
      expect(categoryModal.props.visible).toBe(true);
    });
  });
});
