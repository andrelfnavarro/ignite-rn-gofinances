import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '../../../global/styles/theme';
import { Input } from '.';

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('Components/Form/Input', () => {
  it('must have border when active', () => {
    const { getByTestId } = render(
      <Input
        testID="input"
        active
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
      />,
      {
        wrapper: Providers,
      }
    );

    const inputComponent = getByTestId('input');

    expect(inputComponent.props.style[0].borderColor).toEqual(
      theme.colors.attention
    );

    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
