import React, {Component} from 'react';
import Currency from "../utility";

class Products extends Component{
    render(){
        return(
            <div>
                <ul className="products">
                    {this.props.products.map(p => (
                        <li key={p._id}>
                            <div className="product">
                                <a href={"#"+p._id}>
                                    <img src={p.image} alt={p.title}></img>
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
            </div>
        );
    }
}

export default Products;

/*
use callback if passing parameter at eventlistener func
https://stackoverflow.com/questions/65848052/callback-function-on-button-onclick-in-react-functional-component
*/