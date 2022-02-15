import React, { createContext, useState } from 'react';

import { BookType } from '../types';

interface ContextType {
    items: BookType[], 
    setItems: any, 
    addToCart: (book: BookType) => void, 
    getSubTotal: () => string, 
    subtractFromCart: (book: BookType) => void, 
    removeFromCart: (book: BookType) => void
}

export const CartContext = createContext<ContextType>(null);

interface Props {
    children: React.ReactNode
}
export const CartProvider = ({ children }: Props) => {
    const [items, setItems] = useState([]);

    const addToCart = (book: BookType) => {
        if(book.available_copies > 0) {
            setItems((prevItems: any) => {
                const item = prevItems.find((item: BookType) => (item.id == book.id));
                if (!item) {
                    return [...prevItems, {
                        id: book.id,
                        image_url: book.image_url,
                        title: book.title,
                        price: book.price,
                        authors: book.authors[0].name,
                        quantity: 1,
                        available_copies: book.available_copies,
                        totalPrice: book.price
                    }];
                }
                else {
                    return prevItems.map((item: BookType) => {
                        if (item.id == book.id) {
                            item.quantity++;
                            item.totalPrice += book.price;
                        }
                        return item;
                    });
                }
            });
        }
    }

    const subtractFromCart = (book: BookType) => {
        if(book.quantity === 1) {
            removeFromCart(book)
        } else {
            setItems((prevItems: any) => {
                const item = prevItems.find((item: BookType) => (item.id == book.id));
                if (item) {
                    return prevItems.map((item: BookType) => {
                        if (item.id == book.id) {
                            item.quantity--;
                            item.totalPrice -= book.price;
                        }
                        return item;
                    });
                }
            });   
        }
    }

    const removeFromCart = (book: BookType) => {
        setItems((prevItems) => {
            return prevItems.filter((item: BookType) => item.id !== book.id);
        });
    }

    function getSubTotal() {
        return items.reduce((sum: number, item: BookType) => (sum + item.totalPrice), 0).toFixed(2);
    }

    return (
        <CartContext.Provider value={{ items, setItems, addToCart, getSubTotal, subtractFromCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}
