import React, {Component} from 'react';
import Currency from "../utility";
//https://www.zybuluo.com/re-start/note/1548768 fix react-reveal installation error through --legacy-peer-deps or --force
import Fade from "react-reveal/Fade"; //https://www.react-reveal.com/examples/
import Modal from "react-modal"; //https://codepen.io/claydiffrient/pen/KNxgav
import Zoom from "react-reveal/Zoom"; //https://www.npmjs.com/package/react-reveal
import {connect} from 'react-redux';
import fetchProducts from "../productActions";

class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            product: null
        }
        //this.handleOpenModal = this.handleOpenModal.bind(this);
        //this.handleCloseModal = this.handleCloseModal.bind(this);
    };
    componentDidMount(){ 
    	this.props.fetchProducts();
  	}
    handleOpenModal = (product) => {
        this.setState({product}); //fill in current product
    }
    handleCloseModal = () => {
        this.setState({product: null});
    }
    render(){
        const {product} = this.state;
        return(
            <div>
                <Fade bottom cascade>
                    <ul className="products">
                        {this.props.products.map(p => (
                            <li key={p._id}>
                                <div className="product">
                                    <a href={"#"+p._id} onClick={() => this.handleOpenModal(p)}>
                                        <img src={p.image} alt={p.title} />
                                        <p>{p.title}</p>
                                    </a>
                                    <div className="price">
                                        <div>{Currency(p.price)}</div>
                                        <button onClick={() => this.props.addToCart(p)} className="btn primary">Add to cart</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fade>
                {product && (
                    <Modal isOpen={true} onRequestClose={this.handleCloseModal}>
                        <Zoom>
                            <button className="close-btn" onClick={this.handleCloseModal}>x</button>
                            <div className="product-detail">
                                <img src={product.image} alt={product.title} />
                                <div className="product-description">
                                    <p><strong>{product.title}</strong></p>
                                    <p>{product.description}</p>
                                    <p>Available Sizes:{" "}
                                        {product.availableSizes.map(s => (
                                            <span>
                                                {" "}
                                                <button className="btn">{s}</button>
                                            </span>
                                        ))}
                                    </p>
                                    <div className="price">
                                        <div>{Currency(product.price)}</div>
                                        <button className="btn primary" onClick={() => {
                                                this.props.addToCart(product)
                                                this.handleCloseModal()
                                        }}>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
            </div>
        );
    }
}

function mapStateToProps(state){ 
	return {products: state.products.items};
}
export default connect(mapStateToProps, fetchProducts)(Products);

/*
use callback if passing parameter at eventlistener func
https://stackoverflow.com/questions/65848052/callback-function-on-button-onclick-in-react-functional-component
*/