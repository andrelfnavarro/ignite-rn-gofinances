import React from 'react';
import { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Input } from '../../components/Form/Input';
import {
  FormTransactionTypes,
  TransactionTypeButton,
} from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    FormTransactionTypes | ''
  >('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const handleSelectTransactionType = (type: FormTransactionTypes) => {
    setSelectedTransactionType(type);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
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

          <CategorySelectButton
            onPress={handleOpenSelectCategoryModal}
            title={category.name}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
