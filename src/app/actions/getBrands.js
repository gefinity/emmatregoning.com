import brandsService from '../services/brandsService';

export default function getBrands () {
    return (dispatch) => {

        dispatch({
            type: 'fetchBrands'
        });

        brandsService.fetchBrands()
            .then((response) => {
                dispatch({
                    type: 'fetchBrandsSuccess',
                    brands: response.brands
                });
            });

    }
}