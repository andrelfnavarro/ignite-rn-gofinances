import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';

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
  const [data, setData] = useState<TransactionsListDataProps[]>([]);

  const loadStoredTransactions = async () => {
    const dataKey = '@gofinances:transactions';
    const storedInfo = await AsyncStorage.getItem(dataKey);
    const transactions = storedInfo ? JSON.parse(storedInfo) : [];

    const transactionsFormatted: TransactionsListDataProps[] = transactions.map(
      (item: TransactionsListDataProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        return {
          ...item,
          amount,
          date,
        };
      }
    );

    setData(transactionsFormatted);
  };

  useEffect(() => {
    loadStoredTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStoredTransactions();
    }, [])
  );

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

          <BorderlessButton onPress={() => console.warn(1)}>
            <LogoutIcon name="power" />
          </BorderlessButton>
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
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
