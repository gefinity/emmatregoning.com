import baseStore        from '../lib/baseStore';
import dispatcher       from '../dispatcher';

let portfolio = [];
let fetching = false;
let lastUpdated = 0;
let error = null;

let portfolioStore = Object.assign({}, baseStore, {
    
    get: function () {
        return portfolio;
    },

    get fetching () {
        return fetching;
    },

    get lastUpdated () {
        return lastUpdated;
    },

    get error () {
        return error;
    },

});

portfolioStore.registerCallbacks(dispatcher, {
    getPortfolio (action) {
        fetching = true;
    },
    getPortfolioError (action) {
        fetching = false;
        error = action.error;
        this.emitChange();
    },
    getPortfolioSuccess (action) {
        fetching = false;
        lastUpdated = performance.now();
        portfolio = action.payload.portfolio.map((item) => {
            return Object.assign({}, item, {
            });
        });
        this.emitChange();
    }
});

export default portfolioStore; 