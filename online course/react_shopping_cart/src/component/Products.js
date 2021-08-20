import React, {Component} from 'react';

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
                                    <button className="btn primary">Add to cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

function Currency(num){
    return "$"+Number(num.toFixed(1)).toLocaleString()+" "; //fixed-point notation
}

export default Products;