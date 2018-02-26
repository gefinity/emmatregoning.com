import $ from 'jquery';

let brandsSrc = '_config/brands.json';
if (process.env.__DEV__) {
    brandsSrc = 'testConfig/brands.json';
}

export default {
    fetchBrands () {
        return new Promise((resolve, reject) => {
            $.ajax({
                dataType: 'json',
                url: brandsSrc+'?cacheBust='+Date.now(),
                success: (response) => {
                    let brands = [];
                    response.forEach((brandsConfig) => {
                        let basePath = brandsConfig.basePath;
                        brands = brandsConfig.images.map((image) => {
                            return basePath + '/' + image;
                        });
                    });
                    resolve({
                        brands: brands
                    });
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject({
                        error: errorThrown
                    });
                }
            });
        });
    }
};