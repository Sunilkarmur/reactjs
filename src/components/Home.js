import React, { Component } from 'react';
import Loader from 'react-loader';
import _ from 'lodash';
import Config from './../config';
import ProductListingContainer from '../containers/ProductListingContainer';
import CompareProductList from '../components/CompareProductList';
import {Link} from 'react-router-dom';

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            dataSources : [],
            sortBy:false
        }

    }

    componentDidMount(){

        this.props.fetchAllProducts();

    }

    componentWillReceiveProps(nextProps){

        this.setState({
            dataSources:nextProps.Products
        })
    }



    sortingAscending(e){

        let sortData = this.props.Products;
        let sort = sortData.sort((obj1, obj2) => {
            // Ascending: first age less than the previous i.Fare.TotalFareWithOutMarkUp
            if (e.target.value === "ascprice") {
                return obj1.price - obj2.price;
            }

                return obj2.price - obj1.price;

        });

        this.setState({
            dataSources:sort,
            sortBy:!this.state.sortBy
        })


    }



    render(){

        if(_.isEmpty(this.props.Products)){
            return(
                <Loader loaded={false} options={Config.options} className="spinner" />
            );
        }

        return(
            <div className="product-list-wrapper">



                <div className="container mt-4 ">

                    <div className="row">
                        <div className="col-md-3 ">
                            <select className="form-control float-right mt-5 col-md-12"
                                    onChange={(e) => this.sortingAscending(e)}>
                                <option value="0">Sorting</option>
                                <option value="ascprice">Asc By Price</option>
                                <option value="descname">Desc BY Price</option>
                            </select>

                        </div>

                        <div className="col-md-3 ">
                            <div className="form-control float-right mt-5 col-md-12">
                            <Link to="/add">Add New Product</Link>
                            </div>
                        </div>

                    </div>

                    <div className="row mt-4">

                        <ProductListingContainer
                            sortBy={this.state.sortBy}
                            dataSources={this.state.dataSources}
                        />

                    </div>
                    <div className="row mt-5">
                    <CompareProductList
                            dataSources={this.props.compareProducts}
                        />
                    </div>
                </div>
            </div>
        );

    }

}