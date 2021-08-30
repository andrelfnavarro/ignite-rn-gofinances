import React from 'react';
import { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { CategorySelect } from '../../components/Form/CategorySelect';
import { Input } from '../../components/Form/Input';
import {
  FormTransactionTypes,
  TransactionTypeButton,
} from '../../components/Form/TransactionTypeButton';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

export function Register() {
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    FormTransactionTypes | ''
  >('');

  const handleSelectTransactionType = (type: FormTransactionTypes) => {
    setSelectedTransactionType(type);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              isSelected={selectedTransactionType === 'up'}
              onPress={() => handleSelectTransactionType('up')}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              isSelected={selectedTransactionType === 'down'}
              onPress={() => handleSelectTransactionType('down')}
            />
          </TransactionTypes>

          <CategorySelect title="Categoria" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
