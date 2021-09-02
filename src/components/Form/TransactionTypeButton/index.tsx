import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title, Icon, Button } from './styles';

export type FormTransactionTypes = 'positive' | 'negative';

interface Props extends RectButtonProps {
  title: string;
  type: FormTransactionTypes;
  isSelected: boolean;
}

const icons = {
  positive: 'arrow-up-circle',
  negative: 'arrow-down-circle',
};

export function TransactionTypeButton({
  title,
  type,
  isSelected,
  ...rest
}: Props) {
  return (
    <Container type={type} isSelected={isSelected}>
      <Button {...rest}>
        <Icon type={type} name={icons[type]} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
