import React                from 'react';
import getBrands            from '../../app/actions/getBrands';
import getPortfolio         from '../../app/actions/getPortfolio';

import { connect }          from 'react-redux';

export default function (ComposedComponent) { 
    return connect(
        // mapStateToProps
        (state) => {
            return {
                portfolio: state.portfolio.items,
                brands: state.brands.items
            }
        },
        // mapDispatchToProps
        (dispatch) => {
            return {
                getBrands () {
                    dispatch(getBrands());
                },
                getPortfolio () {
                    dispatch(getPortfolio());
                }
            };
        }
    )(ComposedComponent);
}