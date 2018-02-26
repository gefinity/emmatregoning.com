import $                        from 'jquery';
import React                    from 'react';
import {Router}                 from 'react-router';
import reactDom                 from 'react-dom';
import TransitionGroup          from 'react-addons-transition-group';
import Velocity                 from 'velocity-animate';

const transitionSpeed = 0;

let AnimationWrapper = React.createClass({

    componentWillLeave (next) {
        let node = reactDom.findDOMNode(this);
        // let left = this.props.path === '/';

        // $(node).addClass('animating-page');

        Velocity(node, 'stop');
        Velocity(node,
            {
                //translateX: left ? -$(window).width() : $(window).width()
                opacity: 0
            },
            {
                duration: transitionSpeed,
                complete: next
            }
        );
    },
    componentWillEnter (next) {
        let node = reactDom.findDOMNode(this);
        // let left = this.props.path !== '/';    

        // $(node).addClass('animating-page');

        Velocity(node, 'stop');
        Velocity(node, {
            //translateX: left ? $(window).width() : -$(window).width(),
            opacity: 0
        }, {
            duration: 0
        })
        Velocity(node, {
            //translateX: 0
            opacity: 1
        }, {
            duration: transitionSpeed,
            complete: () => {
                // remove transform at the end to stop it breaking child position:fixed etc
                // $(node).css({
                //     transform: 'none'
                // });
                next();
            }
        });
    },

    componentDidEnter () {
        let node = reactDom.findDOMNode(this);
        //$(node).removeClass('animating-page');
    },

    render () {
        return this.props.children;
    },

});

export default React.createClass({

    render () {
        
        let path = this.props.location.pathname;

        return (
            <TransitionGroup component='div' className='app'>
                <AnimationWrapper key={path} path={path}>
                    {this.props.children}
                </AnimationWrapper>
            </TransitionGroup>
        );

    }

});