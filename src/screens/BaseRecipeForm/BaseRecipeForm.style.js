import styled from 'styled-components/native';
import Button from '../../components/Button';
import {LIGHT_BROWN} from '../../theme/colors';
import {FONT_FAMILY_ROBOTO_MEDIUM} from '../../theme/fonts';

export const ScrollContainer = styled.ScrollView`
  background-color: ${LIGHT_BROWN};
`;

export const Container = styled.ScrollView`
  padding: 10px 8%;
  background-color: ${LIGHT_BROWN};
`;

export const HeadText = styled.Text`
  font-size: 20px;
  font-family: ${FONT_FAMILY_ROBOTO_MEDIUM};
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const InputWrapper = styled.View`
  ${props => props.half && 'flex-basis: 49%'};
`;

export const SubmitBtn = styled(Button)`
  margin: 20px 0px;
`;
