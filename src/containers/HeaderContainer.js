import {connect} from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';

import Config from '../config';

import Header from '../components/Header';

const ROOT_URL=Config.ROOT_URL;

export const SEARCH_PRODUCTS='products?name_like=';

const mapStateToProps = (state) => {


    return{
        searchProducts:state.Products,
    }

};

const mapDispatchToProps = dispatch => {

    return {

        searchProducts:(input) => {

            return axios.get(`${ROOT_URL}${SEARCH_PRODUCTS}${input}`)

                .then(res => {

                    const prodcuts = res.data;

                    dispatch(actions.getAllProducts(prodcuts));
                    dispatch(actions.addToCompare([]));

                });

        },

    }

};



const headerContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default headerContainer;