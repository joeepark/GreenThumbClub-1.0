import React from 'react';
import { useEffect, useReducer } from 'react';

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
            <div className="products">
                {/* Map each element in the data.js so they have their own box */}
                {products.map(element => (
                    // Make the product image and name clickable to the product page
                    <div className="product" key={element.slug}>
                        <a href={`/product/${element.slug}`}>
                            <img src={element.image} alt={element.name} />
                        </a>
                        <div className="product-info">
                            <a href={`/product/${element.slug}`}>
                                {/* Show name, price, add to cart */}
                                <p>{element.name}</p>
                            </a>
                            <p>{element.price}</p>
                            <button>Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Homepage;