import React, { Component } from 'react';
import _ from 'lodash';
import Compare from './../components/ProductCompare';

export default class ProductListing extends Component {

    constructor(props){
        super(props);
        this.state={
            dataSources:[]
        }

    }

    componentDidMount(){

        this.setState({
            dataSources:this.props.dataSources
        })
    }

    componentWillReceiveProps(nextProps){

        this.setState({
            dataSources:nextProps.dataSources
        })
    }

    addToCompare(response,i){
        
        let dataSources = this.state.dataSources;
        dataSources[i].is_used=response;

        this.setState({
            dataSources:dataSources
        },()=>{           

            let filter = _.map(this.state.dataSources,(obj,index)=>{

                if( obj.is_used == true){
                    return obj;
                }
            })

            var filtered = _.reject(filter, _.isUndefined);

            this.props.addToCompare(filtered);
        })
    }

    render(){

        return _.map(this.state.dataSources,(product, i)=>{

            return(
                <div className="col-md-3" key={i}>
                        <div className="card card--shadow mt-4">
                            <div className="card-body ">
                                <div className="row">
                                    <div className="col-md-12 border-bottom  text-center p-3">
                                        <img src={product.image} alt={product.name} className="product_img border-bottom"/>
                                    </div>
                                    <div className="col-md-12 mt-3 text-center border-top-0">
                                        <h5 className="product_title">{product.name}</h5>
                                        <h6>{product.price}</h6>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <p className="product_desc text-center">
                                        <Compare 
                                            productInfo={product}
                                            addToCompare={(response)=>{
                                               this.addToCompare(response,i);                                                
                                            }}
                                        />
                                        </p>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
            )
        });

    }

}