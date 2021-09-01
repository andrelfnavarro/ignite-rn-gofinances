import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, Title, Icon } from './styles';

export type FormTransactionTypes = 'up' | 'down';

interface Props extends RectButtonProperties {
  title: string;
  type: FormTransactionTypes;
  isSelected: boolean;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

export function TransactionTypeButton({
  title,
  type,
  isSelected,
  ...rest
}: Props) {
  return (
    <Container type={type} isSelected={isSelected} {...rest}>
      <Icon type={type} name={icons[type]} />
      <Title>{title}</Title>
    </Container>
  );
}
