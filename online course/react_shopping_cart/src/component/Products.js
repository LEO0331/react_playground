import React, {Component} from 'react';
import Currency from "../utility";
//https://www.zybuluo.com/re-start/note/1548768 fix react-reveal installation error through --legacy-peer-deps or --force
import Fade from "react-reveal/Fade"; //https://www.react-reveal.com/examples/
import Modal from "react-modal"; //https://codepen.io/claydiffrient/pen/KNxgav
import Zoom from "react-reveal/Zoom"; //https://www.npmjs.com/package/react-reveal

class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false
        }
        //this.handleOpenModal = this.handleOpenModal.bind(this);
        //this.handleCloseModal = this.handleCloseModal.bind(this);
    };
    handleOpenModal = () => {
        this.setState({showModal: true});
    }
    handleCloseModal = () => {
        this.setState({showModal: false});
    }
    render(){
        const {showModal} = this.state;
        return(
            <div>
                <Fade bottom cascade>
                    <ul className="products">
                        {this.props.products.map(p => (
                            <li key={p._id}>
                                <div className="product">
                                    <a href={"#"+p._id} onClick={this.handleOpenModal}>
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
                </Fade>
                {showModal && (
                    <Modal isOpen={this.state.showModal}>
                        <Zoom>
                            <div>show</div>
                        </Zoom>
                    </Modal>
                )}
            </div>
        );
    }
}

export default Products;

/*
use callback if passing parameter at eventlistener func
https://stackoverflow.com/questions/65848052/callback-function-on-button-onclick-in-react-functional-component
*/