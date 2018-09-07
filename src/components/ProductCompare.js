import React, { Component } from 'react';



export default class ProductCompare extends Component {

    constructor(props){
        super(props);
        this.state={
            compareProducts:[],
            buttonName: false
        }

    }

    addItemToCompare(){
        this.props.addToCompare(true);
    }

    removeItemFromCompare(){
        this.props.addToCompare(false);
    }

    render(){                          

            if(this.props.productInfo.is_used){
                return(
                    <button type="button" className="btn btn-danger" onClick={() => this.removeItemFromCompare()}>Remove From Compare</button>  
                ) 
            }

            return(
                <button type="button" className="btn btn-primary" onClick={() => this.addItemToCompare()}>Add To Compare</button>  
            )      
    }

}