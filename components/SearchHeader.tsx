import styled from 'styled-components/native';
import { useContext, useState, useRef } from 'react';
import { TouchableOpacity } from 'react-native';

import { SearchContext } from '../context/SearchContext';
import ArrowIcon from '../assets/icons/arrow.svg';
import CloseIcon from '../assets/icons/close.svg';
import SearchIcon from '../assets/icons/search.svg';

const SearchWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px
`;

const SearchContainer = styled.View`
    background-color: #F0F0F0;
    height: 50px;
    width: 90%;
    flex-direction: row;
    padding: 1px;
    justify-content: space-between;
    align-items: center;
`;

const Input = styled.TextInput`
    width: 85%;
    height: 100%;
    background-color: white;
    padding: 10px;
    font-family: ubuntu;
    font-size: 16;
`;

const Close = styled(CloseIcon)`
    margin-right: 12px;
`;

const Search = styled(SearchIcon)`
    margin-right: 12px;
`;

interface Props {
    setShowSearch: (val: boolean) => void;
    navigation: any
}

export const SearchHeader = ({ setShowSearch, navigation }: Props) => {
    const { setSearchValue } = useContext(SearchContext);
    const inputRef = useRef(null);
    const [value, setValue] = useState<string>('')
    const [searchActive, setSearchActive] = useState<boolean>(true)

    const onBackClick = () => {
        setShowSearch(false);
        setSearchValue('');
    }

    const onSearchClick = () => {
        setSearchValue(value.toLowerCase());
        setSearchActive(false)
    }

    const onCancelClick = () => {
        setSearchValue('');
        setValue('')
        setSearchActive(true)
    }

    return (
        <SearchWrapper>
            <TouchableOpacity onPress={onBackClick}><ArrowIcon /></TouchableOpacity>
            <SearchContainer>
                <Input placeholderTextColor="black" value={value} placeholder='Book, genre, authors, e.t.c' onChangeText={(e) => setValue(e)} />
                {searchActive ? <TouchableOpacity onPress={() => onSearchClick()}><Search /></TouchableOpacity> :
                    <TouchableOpacity onPress={onCancelClick}><Close /></TouchableOpacity>
                }
            </SearchContainer>
        </SearchWrapper>
    )
}
