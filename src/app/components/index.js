import $                from 'jquery';
import _                from 'lodash';
import React            from 'react';
import Nav              from './nav';
import Home             from './home';
import Portfolio        from './portfolio';
import Brands           from './brands';
import About            from './about';
import Footer           from './footer';

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