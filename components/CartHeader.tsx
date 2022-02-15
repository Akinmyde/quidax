import styled from 'styled-components/native';
import React from 'react';
import { Text } from '../components/StyledText';

import ArrowIcon from '../assets/icons/arrow.svg';
import CartIcon from '../assets/icons/cart.svg';
import { Route } from '../navigation/route';

const SearchWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between; 
    width: 100%;
`;

const FlexWrapper = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 35%;
`;

export const CartHeader = ({ navigation }: any) => (
    <SearchWrapper>
        <FlexWrapper onPress={() => navigation.push(Route.HOME)}>
            <ArrowIcon />
            <Text fontWeight='bold'>Back</Text>
        </FlexWrapper>
        <FlexWrapper>
            <Text style={{ fontSize: 16 }}>Your Cart</Text>
            <CartIcon />
        </FlexWrapper>
    </SearchWrapper>
)
