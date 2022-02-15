import styled from 'styled-components/native';
import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';

import { Text } from '../components/StyledText';
import { Container } from '../components/Containers';
import ArrowIcon from '../assets/icons/arrow.svg';
import CartIcon from '../assets/icons/cart-white.svg';
import { Divider } from './HomeScreen';
import { Route } from '../navigation/route';
import { MainHeader } from '../components/Header';
import { CartContext } from '../context/CartContext';

const MainWrapper = styled.ScrollView`
    padding: 0 30px;
`;

const NavigationWrapper = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

const ImageWrapper = styled.Image`
    height: 300px;
    width: 50%;
    margin: 30px 0;
`;

const NameWrapper = styled.View`
    margin-top: 30px;
`;

const CategoryWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 30px 0 0 0;
`;

const ContentWrapper = styled.View`
    margin-top: 40px;
`;

const StickyBottom = styled.TouchableOpacity`
    flex-direction: row;
    background-color: black;
    height: 100px;
    width: 370px;
    margin: 20px;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;

interface Props {
    navigation: any,
    route: { params: any }
}

const DetailsScreen = ({ navigation, route }: Props) => {
    const { book } = route.params;
    const [tags, setTags] = useState<string>('')
    const [date] = useState<Date>(new Date(book.release_date))
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        let tagString = ''

        for (const { name } of book.tags) {
            if (tagString.length !== 0) {
                tagString = `${tagString}, ${name}`;
            } else {
                tagString = `${name}`;
            }
        }
        setTags(tagString);
    }, [])

    const onAddToCart = () => {
        if(book.available_copies) {
            addToCart(book)
            navigation.navigate(Route.CART)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Container>
                <MainHeader navigation={navigation} />
                <MainWrapper>
                    <NavigationWrapper onPress={() => navigation.navigate(Route.HOME)}>
                        <ArrowIcon />
                        <Text style={{ left: 20 }} fontWeight='bold'>Back</Text>
                    </NavigationWrapper>
                    <ImageWrapper source={{ uri: book.image_url }} />
                    <Text style={{ fontSize: 25 }} fontWeight='bold'>{`${book.title}`}</Text>
                    <NameWrapper>
                        <Text fontWeight='bold'>{book.authors[0].name}</Text>
                        <Text style={{ marginTop: 5 }}>{date.getFullYear()}</Text>
                    </NameWrapper>
                    <Divider />
                    <CategoryWrapper>
                        <View>
                            <Text fontWeight='bold'>Genre</Text>
                            <Text>{book.genres[0]?.name}</Text>
                        </View>
                        <View style={{ width: 150 }}>
                            <Text fontWeight='bold'>Tag</Text>
                            <Text>{tags}</Text>
                        </View>
                    </CategoryWrapper>
                    <CategoryWrapper>
                        <View>
                            <Text fontWeight='bold'>Publisher</Text>
                            <Text>{book.publisher}</Text>
                        </View>
                        <View style={{ width: 150 }}>
                            <Text fontWeight='bold'>Released</Text>
                            <Text>{date.toDateString()}</Text>
                        </View>
                    </CategoryWrapper>
                    <Divider />
                    <ContentWrapper>
                        <Text style={{ fontSize: 18 }} fontWeight='bold'>Big Magic: Creative Living Beyong Fear</Text>
                        <Text style={{ top: 30, fontSize: 14, lineHeight: 25 }}>{book.full_description}</Text>
                    </ContentWrapper>
                </MainWrapper>
            </Container>
            <StickyBottom onPress={onAddToCart}>
                <CartIcon />
                <View>
                    <Text style={{ fontSize: 20 }} fontWeight='bold' color='white'>Add to Cart</Text>
                    <Text color={book.available_copies > 0 ? '#1BC47D' : 'red'}>{book.available_copies > 0 ? `${book.available_copies} Copies Available` : 'Out of stock'}</Text>
                </View>
                <Text style={{ fontSize: 30 }} fontWeight='bold' color='white'>{`$${book.price}`}</Text>
            </StickyBottom>
        </View>
    )
}

export default DetailsScreen;
