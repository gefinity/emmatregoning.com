import dispatcher               from '../dispatcher';
import brandsService            from '../services/brandsService';

export default {
    
    getBrands () {
        dispatcher.dispatch({
            actionType: 'getBrands'
        });
        dispatcher.createServiceAction(brandsService.fetchBrands(), 'getBrandsSuccess', 'getBrandsError');
    }

};