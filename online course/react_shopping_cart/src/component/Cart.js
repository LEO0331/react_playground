import React, {Component} from 'react'
import Currency from "../utility";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import {connect} from 'react-redux';
import {removeFromCart, createOrder, clearOrder} from "../actions";

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
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a,c) => a+c.price*c.count, 0)
        };
        this.props.createOrder(order);
        console.log(order);
    };
    closeModal = () => {
        this.props.clearOrder();
    }
    render() {
        const {cartItems, order} = this.props; //const cartItems = this.props.cartItems;
        let showCart; //https://react-cn.github.io/react/tips/if-else-in-JSX.html
        if (cartItems.length === 0) { //{cartItems.length === 0 ? (<div>) : (<div>)}
            showCart = <div className="cart cart-header">Cart is empty</div>
        } else {
            showCart = <div className="cart cart-header">You have {cartItems.length} kind(s) of product(s) in the cart</div>
        }
        return (
            <div>
                {showCart}
                {order && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-btn" onClick={this.closeModal}>x</button>
                            <div className="order-detail">
                                <h3 className="message">Congrat! Your order has been placed.</h3>
                                <h2>Order {order._id}</h2>
                                <ul>
                                    <li>
                                        <div>Name:</div>
                                        <div>{order.name}</div>
                                    </li>
                                    <li>
                                        <div>Email:</div>
                                        <div>{order.eamil}</div>
                                    </li>
                                    <li>
                                        <div>Address:</div>
                                        <div>{order.address}</div>
                                    </li>
                                    <li>
                                        <div>Date:</div>
                                        <div>{order.createdAt}</div>
                                    </li>
                                    <li>
                                        <div>Total:</div>
                                        <div>{Currency(order.total)}</div>
                                    </li>
                                    <li>
                                        <div>Cart Items:</div>
                                        <div>
                                            {order.cartItems.map(item => (
                                                <div>
                                                    {item.count} {" x "} {item.title}
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Zoom>
                    </Modal>
                )}
                <div>
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
                    {cartItems.length !== 0 && (
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
            </div>
        );
    }
}

export default connect(
    (state) => ({
        order: state.order.order,
        cartItems: state.cart.cartItems,
    }),
    {
        removeFromCart, createOrder, clearOrder
    }
)(Cart);
/*
function mapStateToProps(state){ 
	return {
        cartItems: state.cart.cartItems,
        order: state.order.order
    };
}
export default connect(mapStateToProps, {removeFromCart, createOrder, clearOrder})(Cart);
*/