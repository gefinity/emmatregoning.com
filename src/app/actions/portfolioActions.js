import dispatcher               from 'app/dispatcher';
import portfolioService         from 'app/services/portfolioService';

export default {
    
    getPortfolio () {
        dispatcher.dispatch({
            actionType: 'getPortfolio'
        });
        dispatcher.createServiceAction(portfolioService.fetchPortfolio(), 'getPortfolioSuccess', 'getPortfolioError');
    },

};