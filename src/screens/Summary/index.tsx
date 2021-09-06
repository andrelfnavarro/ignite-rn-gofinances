import React, { useEffect, useState, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';
import { Container, Header, Title, Content, ChartContainer } from './styles';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/core';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  total: number;
  color: string;
  percentage: string;
}

const dataKey = '@gofinances:transactions';

export function Summary() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const theme = useTheme();
  const componentJustMounted = useRef(true);

  const loadData = async () => {
    const storedData = await AsyncStorage.getItem(dataKey);
    const currentData = storedData ? JSON.parse(storedData) : [];

    console.log(currentData);

    const expenses = currentData.filter(
      (expense: TransactionData) => expense.type === 'negative'
    );

    const expensesTotal = expenses.reduce(
      (acc: number, expense: TransactionData) => {
        return acc + +expense.amount;
      },
      0
    );

    console.log(expensesTotal);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
          categorySum += +expense.amount;
        }
      });

      categorySum > 0 &&
        totalByCategory.push({
          key: category.name,
          name: category.name,
          total: categorySum,
          percentage: `${((categorySum / expensesTotal) * 100).toFixed(0)}%`,
          totalFormatted: categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),

          color: category.color,
        });
    });

    setTotalByCategories(totalByCategory);
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!componentJustMounted.current) {
        loadData();
      }

      componentJustMounted.current = false;
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <ChartContainer>
        <VictoryPie
          colorScale={totalByCategories.map(category => category.color)}
          data={totalByCategories}
          x="percentage"
          y="total"
          labelRadius={64}
          style={{
            labels: {
              fontSize: RFValue(18),
              fontWeight: 'bold',
              fill: theme.colors.shape,
            },
          }}
        />
      </ChartContainer>
      <Content>
        {totalByCategories.map(item => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
