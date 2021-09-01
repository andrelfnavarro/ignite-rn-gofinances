import React from 'react';
import { Container, Title } from './styles';
import { RectButtonProperties } from 'react-native-gesture-handler';

interface Props extends RectButtonProperties {
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
