import {connect} from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';
import Home from '../components/Home';
import Config from '../config';

const ROOT_URL=Config.ROOT_URL;

export const FETCH_ALL_PRODUCTS='products';

const mapStateToProps = (state) => {


    return{
        Products:state.Products,
        compareProducts: state.Compare.list
    }

};

const mapDispatchToProps = dispatch => {

    return {

        fetchAllProducts:() => {

           return axios.get(`${ROOT_URL}${FETCH_ALL_PRODUCTS}`)            

                .then(res => {

                    const prodcuts = res.data;                    

                   dispatch(actions.getAllProducts(prodcuts));

                });

        },

        sortByPrice: (prodcuts)=> {

            dispatch(actions.getAllProducts(prodcuts));

        }

    }

};

const homeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default homeContainer;