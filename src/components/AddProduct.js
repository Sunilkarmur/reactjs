import React, {Component} from 'react';
import FormErrors from './../components/FormErrors';

export default class AddProduct extends Component {

    constructor (props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            image: '',
            formErrors: {name: '', price: '', image: ''},
            formValid: false

        }
    }

    handleUserInput (e) {
        // console.log(e.target.value);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {

        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.name;
        let priceValid = this.state.price;
        let imageValid = this.state.image;

        switch(fieldName) {
            case 'name':
                nameValid = value.length >= 6;
                fieldValidationErrors.name = nameValid ? '' : ' is invalid';

                break;
            case 'price':
                priceValid = !isNaN(value);
                fieldValidationErrors.price = priceValid ? '': ' is not a valid number';
                break;
            case 'image':
                imageValid = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(value);
                fieldValidationErrors.image = imageValid ? '': ' is not a valid image url';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            nameValid: nameValid,
            priceValid: priceValid,
            imageValid: imageValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.nameValid && this.state.priceValid && this.state.imageValid});
    }

    submit(e){


        if(this.state.formValid){

            this.props.addProducts(this.state.name,this.state.price,this.state.image)
                .then((response)=>{
                        if(response === true){
                            this.props.history.push("/")
                        }
                    }

                )
            ;


        }
    }

    render() {

        return (
            <div className="container mt-5 ">
                <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
                </div>
                <form className="demoForm">
                    <h2>Add Product</h2>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control"
                               name="name" value={this.state.name}
                               onChange={(event) => this.handleUserInput(event)}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" className="form-control"
                               name="price" value={this.state.price}
                               onChange={(event) => this.handleUserInput(event)}

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input type="url" className="form-control"
                               name="image" value={this.state.image}
                               onChange={(event) => this.handleUserInput(event)}

                        />
                    </div>

                    <button type="button" onClick={(e) => this.submit(e)} className="btn btn-primary" disabled={!this.state.formValid}>
                        Sign up
                    </button>
                </form>
            </div>
        );

    }

}