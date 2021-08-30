import React from 'react';
import { Container } from './styles';
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {}

export function Input({ ...rest }: Props) {
  return <Container {...rest}></Container>;
}
