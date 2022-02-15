import styled from 'styled-components/native';
import { TouchableOpacity, Platform } from 'react-native';
import React, { useState, useContext } from 'react';
import { CartContext  } from '../context/CartContext';
import { Text } from '../components/StyledText';

import SearchIcon from '../assets/icons/search.svg';
import BookIcon from '../assets/icons/books.svg';
import CartIcon from '../assets/icons/cart.svg';
import LogoIcon from '../assets/icons/brand-lite.svg';
import { SearchHeader } from './SearchHeader';
import { Route } from '../navigation/route';

export const Header = styled.TouchableOpacity`
    background-color: #FFFFFF;
    justify-content: space-between;
    padding: 15px 0;
    margin-bottom: 20px;
    flex-direction: row;
    margin-top: ${Platform.OS === 'android' ? '30px' : '0px'}
`;

const InnerHeading = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 50%;
`;

const CartWrapper = styled.TouchableOpacity`
    flex-direction: row;
`;

const CartCount = styled.View`
    background-color: #1BC47D;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 15px;
    bottom: 10px;
`;

export const MainHeader = ({ navigation }: any) => {
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const {items} = useContext(CartContext);

    const onSearchClick = () => {
        setShowSearch(true);
        navigation.navigate(Route.HOME);
    }

    if (showSearch) return <Header><SearchHeader navigation={navigation} setShowSearch={setShowSearch} /></Header>;
    return (
        <Header>
            <InnerHeading onPress={() => navigation.navigate(Route.HOME)}>
                <LogoIcon />
            </InnerHeading>
            <InnerHeading>
                <TouchableOpacity onPress={onSearchClick}>
                    <SearchIcon />
                </TouchableOpacity>
                <BookIcon />
                <CartWrapper onPress={() => navigation.navigate(Route.CART)}>
                    <CartIcon />
                    <CartCount><Text fontWeight='bold' color='white'>{items.length}</Text></CartCount>
                </CartWrapper>
            </InnerHeading>
        </Header>
    )
};
