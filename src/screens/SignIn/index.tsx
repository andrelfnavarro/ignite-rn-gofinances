import React, { useState } from 'react';
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  ButtonWrapper,
} from './styles';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      return;
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google.');
      setLoading(false);
    }
  };

  const handleSignInWithApple = async () => {
    try {
      setLoading(true);
      await signInWithApple();
      return;
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google.');
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg height={RFValue(68)} width={RFValue(120)} />

          <Title>
            Controle suas {'\n'} finanças de forma {'\n'} muito simples
          </Title>

          <SignInTitle>
            Faça seu login com {'\n'} uma das contas abaixo
          </SignInTitle>
        </TitleWrapper>
      </Header>

      <Footer>
        <ButtonWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            title="Entrar com Google"
            svg={GoogleSvg}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              onPress={handleSignInWithApple}
              title="Entrar com Apple"
              svg={AppleSvg}
            />
          )}
        </ButtonWrapper>

        {loading && (
          <ActivityIndicator
            color={theme.colors.shape}
            size="small"
            style={{ marginTop: 16 }}
          />
        )}
      </Footer>
    </Container>
  );
}
