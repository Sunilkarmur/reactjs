import {connect} from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';

import Config from '../config';

import AddProduct from '../components/AddProduct';

const ROOT_URL=Config.ROOT_URL;

export const ADD_PRODUCTS='products';

const mapStateToProps = (state) => {


    return{
        searchProducts:state.Products,
    }

};

const mapDispatchToProps = dispatch => {

    return {

        addProducts:(name,price,image) => {

            return axios.post(`${ROOT_URL}${ADD_PRODUCTS}`, {
                name,
                price,
                image
            })

                .then(res => {


                    return true;


                });

        },

    }

};



const addProductContainer = connect(mapStateToProps, mapDispatchToProps)(AddProduct);

export default addProductContainer;