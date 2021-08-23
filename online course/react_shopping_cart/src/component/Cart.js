import React, {Component} from 'react'
import Currency from "../utility";
import Fade from "react-reveal/Fade";
import {connect} from 'react-redux';
import {removeFromCart} from "../productActions";

class Cart extends Component {
    constructor(props){ //state = {showCheckout: false,};
        super(props);
        this.state = {
          showCheckout: false,
          name: "",
          email: "",
          address: ""
        };
    }
    handleInput = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    createOrder = e => {
        e.preventDefault();
        const order = {
            name: this.props.name,
            email: this.props.email,
            address: this.props.address,
            cartItems: this.props.cartItems
        };
        this.props.createOrder(order);
    };
    render() {
        const cartItems = this.props.cartItems; //const {artItems} = this.props
        let showCart; //https://react-cn.github.io/react/tips/if-else-in-JSX.html
        if (cartItems.length === 0) { //{cartItems.length === 0 ? (<div>) : (<div>)}
            showCart = <div className="cart cart-header">Cart is empty</div>
        } else {
            showCart= <div className="cart cart-header">You have {cartItems.length} in the cart</div>
        }
        return (
            <div>
                {showCart}
                <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-item">
                            {cartItems.map(item => ( //return
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {Currency(item.price)} x {item.count}{" "}
                                            <button className="btn" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
                {cartItems.length!==0 && (
                    <div>
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total:{" "}
                                    {Currency(cartItems.reduce((a, c) => a + c.price*c.count, 0))}
                                </div>
                                <button className="btn primary" onClick={() => this.setState({showCheckout: true})}>Process</button>
                            </div>
                        </div>
                        {this.state.showCheckout && (
                            <Fade right cascade>
                                <div className="cart">
                                    <form onSubmit={this.createOrder}> 
                                        <ul className="form-container">
                                            <li>
                                                <label>Email</label>
                                                <input name="email" type="email" required onChange={this.handleInput} placeholder="Please enter email"></input>
                                            </li>
                                            <li>
                                                <label>Name</label>
                                                <input name="name" type="text" required onChange={this.handleInput} placeholder="Please enter name"></input>
                                            </li>
                                            <li>
                                                <label>Address</label>
                                                <input name="address" type="text" required onChange={this.handleInput} placeholder="Please enter address"></input>
                                            </li>
                                            <li>
                                                <div className="btn-style-1">
                                                    <button className="btn" type="reset">Reset</button>
                                                    <button className="btn primary" type="submit">Checkout</button>
                                                </div>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </Fade>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state){ 
	return {
        cartItems: state.cart.cartItems
    };
}

export default connect(mapStateToProps, {removeFromCart})(Cart);