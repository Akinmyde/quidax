import styled from 'styled-components/native';
import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';

import { Text } from '../components/StyledText';
import { Container } from '../components/Containers';
import ArrowIcon from '../assets/icons/arrow.svg';
import CartIcon from '../assets/icons/cart-white.svg';
import PlusIcon from '../assets/icons/plus.svg';
import MinusIcon from '../assets/icons/minus.svg';
import { Divider } from './HomeScreen';
import { Header } from '../components/Header';
import { CartHeader } from '../components/CartHeader';
import { CartContext } from '../context/CartContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Card = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
`;

const CardWrapper = styled.ScrollView`
    padding: 10px 20px;
`;

const ImageWrapper = styled.Image`
    height: 170px;
    width: 28%;
    margin: 0px 0;
`;

const QuantityWrapper = styled.View`
    background-color: #F0F0F0;
    height: 45px;
    width: 130px;
    align-items: center;
    justify-content: space-between;
    padding: 1px;
    margin-top: 10px;
    flex-direction: row;
`;

const InnerQuantity = styled.TouchableOpacity<{ color?: string }>`
    background-color: ${({ color }) => color || '#FCFCFC'};
    height: 100%;
    width: 32%;
    align-items: center;
    justify-content: center
`;

const TextWrapper = styled.View`
    flex-direction: column;
    margin-top: 10px;
    justify-content: space-between;
`;

const CardFooter = styled.View`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding-bottom: 10px;
`;

const CheckoutContainer = styled.View`
    flex-direction: row;
    background-color: black;
    height: 100px;
    width: 370px;
    margin-top: 30px;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
`;

const FlexWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

const CartScreen = ({ navigation }: any) => {
    const {items, getSubTotal, addToCart, subtractFromCart, removeFromCart} = useContext(CartContext);
    
    return (
        <Container>
            <Header>
                <CartHeader navigation={navigation} />
            </Header>
            <CardWrapper>
                {items.map(book => (
                    <View key={book.id}>
                        <Card key={book.id}>
                            <ImageWrapper source={{ uri: book.image_url }} />
                            <TextWrapper>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 120 }}>
                                        <Text style={{ fontSize: 16, paddingBottom: 5 }} fontWeight='bold'>{book.title.length > 13 ? `${book.title.slice(0, 13)}...` : book.title}</Text>
                                        <Text>{book.authors}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ textAlign: 'right', fontSize: 16 }}>${book.price}</Text>
                                        <QuantityWrapper>
                                            <InnerQuantity onPress={() => subtractFromCart(book)}><MinusIcon /></InnerQuantity>
                                            <InnerQuantity color='#FFFFFF'><Text>{book.quantity}</Text></InnerQuantity>
                                            <InnerQuantity onPress={() => addToCart(book)}><PlusIcon /></InnerQuantity>
                                        </QuantityWrapper>
                                    </View>
                                </View>
                                <CardFooter>
                                    <TouchableOpacity onPress={() => removeFromCart(book)}>
                                        <Text>Remove</Text>
                                    </TouchableOpacity>
                                    <Text fontWeight='bold' style={{ fontSize: 16 }}>${(book.totalPrice).toFixed(2)}</Text>
                                </CardFooter>
                            </TextWrapper>
                        </Card>
                        <Divider />
                    </View>
                ))}
                <FlexWrapper>
                    <Text style={{ fontSize: 16 }}>Subtotal</Text>
                    <Text style={{ fontSize: 30 }}>${getSubTotal()}</Text>
                </FlexWrapper>
                <CheckoutContainer>
                    <CartIcon />
                    <Text style={{ fontSize: 25 }} fontWeight='bold' color='white'>Proceed to Checkout</Text>
                </CheckoutContainer>
            </CardWrapper>
        </Container>
    )
}

export default CartScreen;
