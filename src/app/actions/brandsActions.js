import dispatcher               from 'app/dispatcher';
import brandsService            from 'app/services/brandsService';

export default {
    
    getBrands () {
        dispatcher.dispatch({
            actionType: 'getBrands'
        });
        dispatcher.createServiceAction(brandsService.fetchBrands(), 'getBrandsSuccess', 'getBrandsError');
    }

};