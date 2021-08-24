import React, {Component} from 'react'; //abbrev: rcc
import {connect} from 'react-redux';
import {filterProduct, sortProduct} from "../actions";

class Filter extends Component {
    render() {
        return !this.props.filteredItems ? (<div>Loading...</div>) : (
            <div className="filter">
                <div className="filter-result">{this.props.filteredItems.length} Products</div>
                <div className="filter-sort">
                    Order{" "}
                    <select value={this.props.sort} onChange={e => this.props.sortProduct(this.props.filteredItems, e.target.value)}>
                        <option value="latest">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size">
                    Filter{" "}
                    <select value={this.props.size} onChange={e => this.props.filterProduct(this.props.products, e.target.value)}>
                        <option value="ALL">ALL</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>
        );
    }
}
export default connect(
    (state) => ({
        size: state.products.size,
        sort: state.products.sort,
        products: state.products.items,
        filteredItems: state.products.filteredItems,
    }),
    {
        filterProduct,
        sortProduct,
    }
)(Filter);
/*
function mapStateToProps(state){ //onChange
	return {
        products: state.products.items,
        size: state.products.size,
        sort: state.products.sort,
        filteredItems: state.products.filteredItems
    };
}
export default connect(mapStateToProps, {filterProduct, sortProduct})(Filter);
*/