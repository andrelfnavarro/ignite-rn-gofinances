import React from 'react';
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
import { Alert } from 'react-native';

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google.');
    }
  };

  const handleSignInWithApple = async () => {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google.');
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
          <SignInSocialButton
            onPress={handleSignInWithApple}
            title="Entrar com Apple"
            svg={AppleSvg}
          />
        </ButtonWrapper>
      </Footer>
    </Container>
  );
}
