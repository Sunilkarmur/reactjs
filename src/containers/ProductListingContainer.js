import {connect} from 'react-redux';
import * as actions from '../actions';

import ProductListing from '../components/ProductListing';


const mapStateToProps = (state) => {


    return{
        compareProducts: state.Compare.list
    }

};

const mapDispatchToProps = dispatch => {

    return {

        addToCompare:(productInfo) => {

            dispatch(actions.addToCompare(productInfo));

        },

    }

};

const ProductListingContainer = connect(mapStateToProps, mapDispatchToProps)(ProductListing);

export default ProductListingContainer;