import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {useAuth} from '../../hooks/Auth';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProviderLists,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProviderListTitle,

} from './styles';


export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [ providers, setProviders] = useState<Provider[]>([]);
  const {signOut, user} = useAuth();
  const {navigate} = useNavigation();

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
      console.log(response.data);
    })
  }, [])


  const navigationToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);


  const navigationToCreateAppointment = useCallback((providerId: string)=> {
    navigate('CreateAppointment', { providerId });
  }, [navigate])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem Vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigationToProfile}>
          <UserAvatar source={{uri: user.avatar_url}} />
          {console.log(user.avatar_url)}
        </ProfileButton>

      </Header>
      <ProviderLists
        data={providers}
        keyExtractor={(provider => provider.id)}
        ListHeaderComponent={
          <ProviderListTitle>Cabeleireiros</ProviderListTitle>
        }
        renderItem={({item: provider}) => (
          <ProviderContainer onPress={()=> navigationToCreateAppointment(provider.id)}>
            <ProviderAvatar source={{uri: provider.avatar_url}}/>
            {/* {console.log(provider.avatar_url)} */}
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name='calendar' size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name='clock' size={14} color="#ff9000" />
                <ProviderMetaText>8h as 18h</ProviderMetaText>
              </ProviderMeta>

            </ProviderInfo>
          </ProviderContainer>
        )}
       />
    </Container>
  );
}



export default Dashboard;
