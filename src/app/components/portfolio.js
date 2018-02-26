import React                from 'react';
import _                    from 'lodash';
import {
    Router,
    hashHistory
} from 'react-router';
import Item                 from './item';
import imagesLoaded         from 'imagesLoaded';
import TransitionGroup      from 'react-addons-transition-group';
import {
    maxWidthExpandContent
} from 'constants';
import getImageSource       from '../getImageSource';

const preloadTimeout = 2000;

export default React.createClass({

    getDefaultProps () {
        return {
            portfolio: []
        };
    },

    getInitialState () {
        return {
            loadingIndex: null
        }
    },

    render () {
        return (
            <section id='portfolio'>

                <div className='sectionHeader'>
                    <h2>My Work</h2>
                    <p>
                        This is a collection of projects that I’ve worked on recently. Choose a tile below to find out more about the project and my involvement.
                    </p>
                </div>

                <TransitionGroup component='div' id='tiles' className='portfolioItems'>
                    {this.props.portfolio.map((portfolioItem, index) => {
                        return <Item key={'portfolioItem'+index} portfolioItem={portfolioItem} onExpand={this.onExpand} loading={this.state.loadingIndex === index ? true : false} />;
                    })}
                </TransitionGroup>

            </section>
        );
    },

    onExpand (item, e) {

        let index = this.props.portfolio.indexOf(item);

        let images = [];
        let imagesPaths = item.imageCache;

        this.setState({
            loadingIndex: index
        });

        imagesPaths.forEach((path, i) => {
            let src = path;
            // when multiple images are available, render will choose based on windowWidth whenever
            // resize happens but... try to cache the one that would be the best fit now and non others for this slot
            if (_.isArray(path)) {
                src = getImageSource(this.props.windowWidth, path);
            }
            if (src) {
                let newImage = new Image();
                newImage.src = src;
                images.push(newImage);
            }
        });

        let preload = imagesLoaded(images);
        let timeout = setTimeout(() => {
            preload.off('done');
            hashHistory.push(`/portfolio/${index}`);
        }, preloadTimeout);
        preload.on('done', (instance) => {
            clearTimeout(timeout);
            hashHistory.push(`/portfolio/${index}`);
        });

    }

});