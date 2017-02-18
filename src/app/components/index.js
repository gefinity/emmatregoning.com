import $                from 'jquery';
import _                from 'lodash';
import React            from 'react';
import Nav              from 'app/components/nav';
import Home             from 'app/components/home';
import Portfolio        from 'app/components/portfolio';
import Brands           from 'app/components/brands';
import About            from 'app/components/about';
import Footer           from 'app/components/footer';

const scrollSpeed = 1000;

export default React.createClass({

    getDefaultProps () {
        return {
            brands: []
        }
    },

    render () {

        return (

            <div style={{height: '100%'}}>

                <div className='heroFixedBg'></div>

                <Nav />

                <Home windowWidth={this.props.windowWidth} />

                <Portfolio windowWidth={this.props.windowWidth} portfolio={this.props.portfolio} />                

                <Brands brands={this.props.brands} />

                <About />

                <Footer />

            </div>

        );
    }

});