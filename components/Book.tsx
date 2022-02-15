import styled from 'styled-components/native';
import { View } from 'react-native';
import { useState, useContext } from 'react';
import { Text } from '../components/StyledText';

import PeopleIcon from '../assets/icons/people.svg';
import HeartIcon from '../assets/icons/heart.svg';
import StarIcon from '../assets/icons/star.svg';
import StarGrayIcon from '../assets/icons/star-gray.svg';
import CartIcon from '../assets/icons/cart.svg';
import { Route } from '../navigation/route';
import { CartContext } from '../context/CartContext';
import { BookType } from '../types';

const BookContainer = styled.TouchableOpacity`
    justify-content: space-evenly;
    flex-direction: row;
    margin-top: 20px;
    padding: 20px 30px 20px 10px;
`;

const BookDescriptionWrapper = styled.View`
    margin-top: 20px;
`;

const ImageWrapper = styled.Image`
    height: 100%;
    width: 40%;
`;

const IconContainer = styled.View`
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const LeftIconWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

const FlexIconWrapper = styled.View`
    align-items: center;
`;

const RatingsWrapper = styled.View`
    flex-direction: row;
    margin-top: 5px;
`;

const Divider = styled.View`
    width: 1px;
    background-color: #F0F0F0;
    height: 100%;
    margin: 0 5px;
`;

const FlexWrapper = styled.TouchableOpacity`
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
`;

interface Props {
    book: BookType,
    navigation: any
}

const Book = ({ book, navigation }: Props) => {
    const [rating] = useState<number[]>([...Array(Math.round(book.rating)).keys()]);
    const { addToCart } = useContext(CartContext);

    const onNavigate = () => {
        navigation.navigate({ name: Route.DETAILS, params: { book } })
    }

    const onAddToCart = () => {
        if (book.available_copies) {
            addToCart(book)
            navigation.navigate(Route.CART)
        }
    }

    return (
        <BookContainer onPress={onNavigate}>
            <ImageWrapper source={{ uri: book.image_url }} />
            <BookDescriptionWrapper>
                <Text fontWeight='bold' style={{ marginBottom: 10, maxWidth: 170 }}>{book.title}</Text>
                <Text>{book.authors[0].name}</Text>
                <Text style={{ marginTop: 5 }}>{book.tags[0]?.name}</Text>
                <IconContainer>
                    <LeftIconWrapper>
                        <FlexIconWrapper>
                            <PeopleIcon />
                            <Text>{book.number_of_purchases}</Text>
                        </FlexIconWrapper>
                        <FlexIconWrapper>
                            <HeartIcon />
                            <Text>{book.likes}</Text>
                        </FlexIconWrapper>
                    </LeftIconWrapper>
                    <Divider />
                    <View>
                        <Text>Rating: {rating.length}.0</Text>
                        <RatingsWrapper>
                            {rating.length > 0 && rating.map(x => {
                                return (
                                    <StarIcon key={x} />
                                )
                            })}
                            {(rating.length <= 5) && [...Array(Math.round(5 - rating.length)).keys()].map(x => (
                                <StarGrayIcon key={x} />
                            ))}
                        </RatingsWrapper>
                    </View>
                </IconContainer>
                <FlexWrapper>
                    <Text>{`$${book.price}`}</Text>
                    <Text color={book.available_copies > 0 ? '#1BC47D' : 'red'} style={{ left: 20 }}>{book.available_copies > 0 ? `${book.available_copies} Copies Available` : 'Out of stock'}</Text>
                </FlexWrapper>
                {book.available_copies > 0 && (
                    <FlexWrapper onPress={onAddToCart}>
                        <CartIcon />
                        <Text fontWeight='bold' style={{ left: 10 }}>Add to Cart</Text>
                    </FlexWrapper>
                )}
            </BookDescriptionWrapper>
        </BookContainer>
    )
}

export default Book;
