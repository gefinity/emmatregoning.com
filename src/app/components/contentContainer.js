import React                from 'react';
import getPortfolio         from '../../app/actions/getPortfolio';

import { connect }          from 'react-redux';

export default function (ComposedComponent) {
    return connect(
        // mapStateToProps
        (state, ownProps) => {
            const index = parseInt(ownProps.params.index, 10);
            return {
                portfolioItem: state.portfolio.items[index] || null
            }
        },
        // mapDispatchToProps
        (dispatch) => {
            return {
                getPortfolio () {
                    dispatch(getPortfolio());
                }
            };
        }
    )(ComposedComponent);
};