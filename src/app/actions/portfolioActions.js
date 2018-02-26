import dispatcher               from '../dispatcher';
import portfolioService         from '../services/portfolioService';

export default {
    
    getPortfolio () {
        dispatcher.dispatch({
            actionType: 'getPortfolio'
        });
        dispatcher.createServiceAction(portfolioService.fetchPortfolio(), 'getPortfolioSuccess', 'getPortfolioError');
    },

};