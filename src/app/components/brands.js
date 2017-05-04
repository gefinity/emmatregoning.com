import $                    from 'jquery';
import _                    from 'lodash';
import React                from 'react';

// https://github.com/akiran/react-slick
// http://kenwheeler.github.io/slick/
import Slider               from 'react-slick';

const NextArrow = React.createClass({
    render () {
        return (
            <button {...this.props} className='slick-next nextButton'><div></div></button>
        );
    }
});

const PrevArrow = React.createClass({
    render () {
        return (
            <button {...this.props} className='slick-prev prevButton'><div></div></button>
        );
    }
});
    
const slickCarouselSettings = {
    slidesToShow: 6,
    slidesToScroll: 6,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    focusOnSelect: false,
    pauseOnHover: true, // FIXME seems buggy
    speed: 500,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 580,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
            }
        }
    ],
}

export default React.createClass({

    getDefaultProps () {
        return {
            brands: {}
        };
    },

    // FIXME can't assign this to slider because the margin... 
    // covers the real controls
    // need another div or an overlay
    onClick () {

        if (this.refs.slider) {
            this.refs.slider.slickNext();
        }

    },

    render () {

        let brands = this.props.brands;

        const renderedBrands = brands.map((brand, index) => {
            return (
                <div key={index} className='slide' alt>
                    <div>
                        <img alt src={brand} />
                    </div>
                </div>
            );
        });

        return (
            <section id='brands'>

                <div className='sectionHeader'>
                    <h2>Clients &amp; Agencies</h2>
                    <p>
                        Here are some of the brands and creative agencies I’ve worked with over the years.
                    </p>
                </div>

                <div className='brandCarousel'>
                    <div className='slider'>
                        <div className='' > {/* onClick={this.onClick} */}
                            {brands.length &&
                                <Slider ref='slider' {...Object.assign({}, slickCarouselSettings, {
                                    nextArrow: <NextArrow />,
                                    prevArrow: <PrevArrow />,
                                })}>
                                    {renderedBrands}
                                </Slider>
                            }
                        </div>
                    </div>
                </div>

            </section>
        );

    },

});