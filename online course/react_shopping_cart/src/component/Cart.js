import React, {Component} from 'react'
import Currency from "../utility";

export default class Cart extends Component {
    render() {
        const cartItems = this.props.cartItems; //const {artItems} = this.props
        let showCart; //https://react-cn.github.io/react/tips/if-else-in-JSX.html
        if (cartItems.length === 0) { //{cartItems.length === 0 ? (<div>) : (<div>)}
            showCart = <div className="cart cart-header">Cart is empty</div>
        } else {
            showCart= <div className="cart cart-header">You have {cartItems.length} product(s) in the cart</div>
        }
        return (
            <div>
                {showCart}
                <div className="cart">
                    <ul className="cart-item">
                        {cartItems.map(item => ( //return
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}/>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {Currency(item.price)} x {item.count}{" "}
                                        <button className="btn" onClick={() => {this.props.removeItem(item)}}>Remove</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
        )
    }
}
