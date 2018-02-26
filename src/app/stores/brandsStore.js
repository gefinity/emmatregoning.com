import baseStore        from '../lib/baseStore';
import dispatcher       from '../dispatcher';

let brands = [];
let fetching = false;
let lastUpdated = 0;
let error = null;

let brandsStore = Object.assign({}, baseStore, {

    get () {
        return brands;
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
 
brandsStore.registerCallbacks(dispatcher, {
    getBrands (action) {
        fetching = true;
    },
    getBrandsError (action) {
        fetching = false;
        error = action.error;
        this.emitChange();
    },
    getBrandsSuccess (action) {
        fetching = false;
        lastUpdated = performance.now();
        brands = action.payload.brands;
        this.emitChange();
    }
});

export default brandsStore; 