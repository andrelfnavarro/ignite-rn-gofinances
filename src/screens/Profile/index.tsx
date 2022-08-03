import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export const Profile: React.FC = () => {
  return (
    <View>
      <Text testID="text-title">Profile Page</Text>

      <TextInput testID="input-name" placeholder="Nome" value="André" />

      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Navarro"
      />

      <Button onPress={() => {}} title="Salvar" />
    </View>
  );
};
