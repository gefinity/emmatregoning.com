import React                from 'react';
import portfolioStore       from '../../app/stores/portfolioStore';
import portfolioActions     from '../../app/actions/portfolioActions';

export default function (ComposedComponent) {
    
    return React.createClass({

        getInitialState () {
            return {
                portfolio: portfolioActions.getPortfolio() || [],
            };
        },

        componentDidMount () {        
            if (!portfolioStore.fetching && !portfolioStore.lastUpdated) {
                portfolioActions.getPortfolio();
            }
            portfolioStore.addChangeListener(this.onPortfolioChange);
        },

        componentWillUnmount () {
            portfolioStore.removeChangeListener(this.onPortfolioChange);
        },

        onPortfolioChange () {
            this.setState({
                portfolio: portfolioStore.get()
            });
        },

        render () {
            return <ComposedComponent   {...this.props}
                                        portfolioItem={this.state.portfolio[this.props.params.index]}
                                        />;
        }

    });
};