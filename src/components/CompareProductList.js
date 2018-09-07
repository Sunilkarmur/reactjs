import React, { Component } from 'react';
import Loader from 'react-loader';
import _ from 'lodash';
import Config from './../config';
import ProductListingContainer from '../containers/ProductListingContainer';

export default class CompareProductList extends Component {


    renderCompareList(){
        console.log(this.props.dataSources);
        return _.map(this.props.dataSources,(product, i)=>{

            return(

                <tr key={i}>
                    <td><img src={product.image} alt={product.name} className="img-thumbnail compare_img"/></td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.color}</td>
                    <td className={product.condition == 'new'?'btn-success text-center':'btn-danger text-center'}>{product.condition}</td>
                </tr>
            )
        });

    }

    render(){

        if(_.isEmpty(this.props.dataSources)){            
            return(
                // <Loader loaded={false} options={Config.options} className="spinner" />
                <React.Fragment></React.Fragment>
            );
        }

        return(           

            <React.Fragment>
            <table className="table table-bordered">
<thead>
    <tr>
        <th>Images</th>
        <th>Name</th>
        <th>Price</th>
        <th>Color</th>
        <th>Condition</th>
    </tr>
</thead>
<tbody>
   
        {this.renderCompareList()}
   
</tbody>
            </table>
            </React.Fragment>

            
        )
    }
}