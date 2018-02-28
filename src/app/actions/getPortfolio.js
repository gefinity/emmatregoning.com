import portfolioService from '../services/portfolioService';

export default function getBrands () {
    return (dispatch) => {

        dispatch({
            type: 'fetchPortfolio'
        });

        portfolioService.fetchPortfolio()
            .then((response) => {
                dispatch({
                    type: 'fetchPortfolioSuccess',
                    portfolio: response.portfolio
                });
            });

    }
}