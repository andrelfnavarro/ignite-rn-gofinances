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

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';

export function SignIn() {
  console.log(RFPercentage(4));
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
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </ButtonWrapper>
      </Footer>
    </Container>
  );
}
