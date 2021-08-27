import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  LogoutIcon,
  HightlightCardList,
  Transactions,
  TransactionsTitle,
  TransactionsList,
} from './styles';

export interface TransactionsListDataProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const transactionsData: TransactionsListDataProps[] = [
    {
      id: 'transaction-1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      date: '10/04/2021',
      amount: 'R$ 13.000,00',
      category: { name: 'Vendas', icon: 'dollar-sign' },
    },
    {
      id: 'transaction-2',
      type: 'negative',
      title: 'Mansur Lanches',
      date: '13/04/2021',
      amount: 'R$ 59,00',
      category: { name: 'Alimentação', icon: 'coffee' },
    },
    {
      id: 'transaction-3',
      type: 'negative',
      title: 'Aluguel do apartamento',
      date: '18/04/2021',
      amount: 'R$ 1.200,00',
      category: { name: 'Casa', icon: 'shopping-bag' },
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/32081314?v=4',
              }}
            />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>André</UserName>
            </User>
          </UserInfo>

          <LogoutIcon name="power" />
        </UserWrapper>
      </Header>

      <HightlightCardList>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 13 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 06 de abril"
        />
      </HightlightCardList>

      <Transactions>
        <TransactionsTitle>Listagem</TransactionsTitle>

        <TransactionsList
          data={transactionsData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
