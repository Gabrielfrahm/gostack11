import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useAuth} from '../../hooks/Auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import {Container , Title, Description , OKButton, OKButtonText,  } from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const {params} = useRoute();
  const {reset} = useNavigation();

  const routeParams = params as RouteParams;

  const handleOkPress = useCallback(()=> {
    reset({
      routes: [
        {
          name: 'Dashboard',
        }
      ],
      index: 0
    })
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(routeParams.date, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {locale: ptBr})
  }, [routeParams.date])

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OKButton onPress={handleOkPress}>
        <OKButtonText>OK</OKButtonText>
      </OKButton>
    </Container>
  );
}



export default AppointmentCreated;
