import styled from 'styled-components/native';
import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useQuery } from '@apollo/client';

import { BookType } from '../types'
import { Text } from '../components/StyledText';


import { Container } from '../components/Containers';
import Book from '../components/Book';
import { MainHeader } from '../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchContext } from '../context/SearchContext';
import { GET_BOOKS } from '../queries';
import { Route } from '../navigation/route';

export const Divider = styled.View`
    background-color: #F0F0F0;
    height: 2px;
    margin-top: 25px;
`;

const DividerWrapper = styled.View`
    padding: 0 30px;
`;

const SliderWrapper = styled(GestureRecognizer)`
    height: 300px;
    flex-direction: row;
    align-items: center;
    justify-content: center
    background-color: #FCFCFC
`;

const Image = styled.Image`
    height: 300px;
`;

const ImageWrapper = styled.TouchableOpacity`
    width: 40%;
    height: 300px;
    margin-right: 5px;
`;

const DotWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 40px;
`;

const Dot = styled.View<{ color?: string }>`
    background-color: ${({ color }) => color};
    height: 12px;
    width: 12px;
    border-radius: 50px;
    margin: 0 5px;
`;

const ImageNavigationWrapper = styled.TouchableOpacity`
    height: 300px;
    background-color: white;
    width: 30px
    position: absolute;
    opacity: 0.8;
    align-items: center;
    justify-content: center;
`;

const PreviousWrapper = styled(ImageNavigationWrapper)`
    left: 0px;
`;

const NextWrapper = styled(ImageNavigationWrapper)`
    right: 0px;
`;

const HomeScreen = ({ navigation }: any) => {
    const { searchValue } = React.useContext(SearchContext);

    const [books, setBooks] = useState<any>([]);
    const [filterredBooks, setFilterredBooks] = useState<any>([]);
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [previousImage, setPreviousImage] = useState<number>(9);
    const [NextImage, setNextImage] = useState<number>(1);

    const { loading, data } = useQuery(GET_BOOKS);


    useEffect(() => {
        if (searchValue) {
            const searchResult = books?.filter((book: BookType) => {
                return book.title.toLowerCase().includes(searchValue) ||
                    book.authors[0].name.toLowerCase().includes(searchValue)
                // book.genres.filter(genre => genre.name.toLowerCase().includes(searchValue)) 
            })
            setFilterredBooks(searchResult)
        }
    }, [searchValue])


    useEffect(() => {
        setBooks(data?.books)
    }, [data])

    const onSwipeLeft = () => {
        if (currentImage < 9) {
            const current = currentImage + 1;
            setCurrentImage(() => currentImage + 1)
            setPreviousImage(() => current - 1);
            setNextImage(() => NextImage + 1);
        } else {
            setCurrentImage(() => 0)
            setPreviousImage(() => 9);
            setNextImage(() => 1);

        }
    }

    const onSwipeRight = () => {
        if (currentImage > 1) {
            const current = currentImage - 1;
            setCurrentImage(() => currentImage - 1)
            setPreviousImage(() => current - 1);
            setNextImage(() => NextImage - 1);
        }
        else {
            setCurrentImage(() => 0)
            setPreviousImage(() => 9);
            setNextImage(() => 1);
        }
    }

    return (
        <Container>
            <MainHeader navigation={navigation} />
            {!loading ?
                <ScrollView>
                    {(books?.length > 0 && !searchValue) &&
                        <View>
                            <SliderWrapper onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft}>
                                <ImageWrapper onPress={() => navigation.navigate({ name: Route.DETAILS, params: { book: books[previousImage] } })}>
                                    <Image source={{ uri: books[previousImage].image_url }} />
                                </ImageWrapper>
                                <ImageWrapper onPress={() => navigation.navigate({ name: Route.DETAILS, params: { book: books[currentImage] } })}>
                                    <Image source={{ uri: books[currentImage].image_url }} />
                                </ImageWrapper>
                                <ImageWrapper onPress={() => navigation.navigate({ name: Route.DETAILS, params: { book: books[NextImage] } })}>
                                    <Image source={{ uri: books[NextImage].image_url }} />
                                </ImageWrapper>
                                <NextWrapper onPress={onSwipeLeft}><Text fontWeight='bold' style={{ fontSize: 20 }}>{'>'}</Text></NextWrapper>
                                <PreviousWrapper onPress={onSwipeRight}><Text fontWeight='bold' style={{ fontSize: 20 }}>{'<'}</Text></PreviousWrapper>
                            </SliderWrapper>
                            <DotWrapper>
                                {books.slice(10).map((book: BookType, index: number) => (
                                    <Dot key={book.id} color={index === currentImage ? 'green' : '#bbb'} />
                                ))}
                            </DotWrapper>
                        </View>
                    }
                    <DividerWrapper>
                        <Text fontWeight='bold' >{(searchValue && searchValue.length > 0) ? `${filterredBooks.length} results found \`${searchValue}\`` : 'All Books'}</Text>
                        <Divider />
                    </DividerWrapper>
                    {!searchValue ?
                        books?.length > 0 && books.map((book: BookType) => (
                            <Book key={book.id} navigation={navigation} book={book} />
                        )) :
                        filterredBooks?.length > 0 && filterredBooks.map((book: BookType) => (
                            <Book key={book.id} navigation={navigation} book={book} />
                        ))
                    }
                </ScrollView>
                : null}
        </Container>
    )
}

export default HomeScreen;
