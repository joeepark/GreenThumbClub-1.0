import React from 'react';
import { useEffect, useReducer } from 'react';
import Banner from '../images/GTC.png';

// React state
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state }
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload };
        case 'FETCH_FAIL':
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

// 3rd component of page
function Homepage() {
    const [{ products }, dispatch] = useReducer(reducer, {
        products: [],
        error: '',
    });
    useEffect(() => {
        dispatch({ type: 'FETCH_REQUEST' });
        console.log('FETCH_REQUEST')
        fetch('/api/products')
            .then(response => response.json())
            .then(response => {
                dispatch({ type: 'FETCH_SUCCESS', payload: response });
                console.log('FETCH_SUCCESS');
            })
            .catch(error => {
                dispatch({ type: 'FETCH_FAIL', payload: error });
                console.log('FETCH_FAIL');
            });
    }, []);

    return (
        < div >
            <div >
                <img src={Banner} className="banner" />
            </div>
            <h1>Featured Products</h1>
            <div className="products">
                {/* Map each element in the data.js so they have their own box */}
                {products.map(element => (
                    // Make the product image and name clickable to the product page
                    <div className="product" key={element.slug}>
                        <a href={`/product/${element.slug}`}>
                            <img src={element.image} alt={element.name} />
                        </a>
                        <div className="product-info">
                            <a href={`/product/${element.slug}`} className="link">
                                {/* Show name, price, add to cart */}
                                <strong><p>{element.name}</p></strong>
                            </a>
                            <p>{element.price}</p>
                            <button className="button">Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Homepage;