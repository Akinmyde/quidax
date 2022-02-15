import React, { createContext, useState } from 'react';

interface ContextType {
    searchValue: string,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export const SearchContext = createContext<ContextType>(null);

export const SearchProvider = ({ children }: any) => {
    const [searchValue, setSearchValue] = useState<string>('')

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </SearchContext.Provider>
    )
}
