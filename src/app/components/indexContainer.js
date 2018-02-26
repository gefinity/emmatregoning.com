import React                from 'react';
import brandsStore          from '../../app/stores/brandsStore';
import brandsActions        from '../../app/actions/brandsActions';
import portfolioStore       from '../../app/stores/portfolioStore';
import portfolioActions     from '../../app/actions/portfolioActions';

export default function (ComposedComponent) { 
    return React.createClass({

        getInitialState () {
            return {
                brands: brandsStore.get() || [],
                portfolio: portfolioActions.getPortfolio() || [],
            };
        },

        componentDidMount () {        
            if (!brandsStore.fetching && !brandsStore.lastUpdated) {
                brandsActions.getBrands();
            }
            brandsStore.addChangeListener(this.onBrandsChange);

            if (!portfolioStore.fetching && !portfolioStore.lastUpdated) {
                portfolioActions.getPortfolio();
            }
            portfolioStore.addChangeListener(this.onPortfolioChange);
        },

        componentWillUnmount () {
            brandsStore.removeChangeListener(this.onBrandsChange);
            portfolioStore.removeChangeListener(this.onPortfolioChange);
        },

        onBrandsChange () {
            this.setState({
                brands: brandsStore.get()
            });
        },

        onPortfolioChange () {
            this.setState({
                portfolio: portfolioStore.get()
            });
        },

        render () {
            return <ComposedComponent   {...this.props}
                                        portfolio={this.state.portfolio}
                                        brands={this.state.brands}
                                        />;
        }

    });
};