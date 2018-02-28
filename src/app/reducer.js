const initialState = {
    portfolio: {
        fetching: false,
        error: null,
        items: []
    },
    brands: {
        fetching: false,
        error: null,
        items: []
    }
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case 'fetchBrands':
            return {
                ...state,
                brands: {
                    fetching: true,
                    error: null,
                    items: []
                }
            }
        
        case 'fetchBrandsSuccess':
            return {
                ...state,
                brands: {
                    fetching: false,
                    error: null,
                    items: action.brands
                }
            }

        case 'fetchPortfolio':
            return {
                ...state,
                portfolio: {
                    fetching: true,
                    error: null,
                    items: []
                }
            }
        
        case 'fetchPortfolioSuccess':
            return {
                ...state,
                portfolio: {
                    fetching: false,
                    error: null,
                    items: action.portfolio
                }
            }        

        default:
            return state;
    }
};

export default rootReducer;