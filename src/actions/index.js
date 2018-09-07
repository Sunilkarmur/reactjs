export const getAllProducts = (prodcuts) => {

    return {
        type: 'GET_ALL_PRODUCTS',
        prodcuts
    }
};

export const addToCompare = (productInfo) => {
    return {
        type: 'ADD_TO_COMPARE',
        productInfo
    }
};
