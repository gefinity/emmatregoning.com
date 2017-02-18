import React    from 'react';
import $        from 'jquery';

const scrollSpeed = 1000;

export default React.createClass({

    scrollTo (selector, e) {
        e.preventDefault();
        let el = $(selector);

        let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support 'wheel'
            document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
            'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox

        el.velocity('scroll', {
            duration: scrollSpeed,
            easing: 'easeOutQuint',
            complete: () => {
                $(window).off(wheelEvent + ' touchmove.scrollFighting');
            }
        });

        // detect wheel and touchmove events and stop any app scrolling to avoid scroll fighting:
        $(window).on(wheelEvent + ' touchmove.scrollFighting', () => {
            el.velocity('stop');
        });

    },

    onMouseOver (e) {

        let underline = this.refs.underline;
        let target = $(e.target);
        let {top, left} = target.position();
        let w = target.width();

        let padding = target.outerWidth() - target.width(); 

        $(underline).css({
            left: left + padding/2,
            width: w,
            transition: 'width .2s ease-in-out'
        });

    },

    onMouseOut (e) {

        let underline = this.refs.underline;
        let target = $(e.target);
        $(underline).css({
            width: 0,
            transition: 'inherit'
        });

    },

    render () {
        return (
            <div className='nav'>
                <a href className='navLogo' onClick={this.scrollTo.bind(this, '.app')}>
                    <img src={require('images/logo-32-x-32.svg')} />
                </a>
                <nav>
                    <span ref='underline' className='underline'></span>
                    <div>
                        <a href onClick={this.scrollTo.bind(this, '.app')} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>What I do</a>
                    </div>
                    <div>
                        <a href onClick={this.scrollTo.bind(this, '#portfolio')} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>Work</a>
                    </div>
                    <div>
                        <a href onClick={this.scrollTo.bind(this, '#brands')} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>Clients</a>
                    </div>
                    <div>
                        <a href onClick={this.scrollTo.bind(this, '#about')} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>About</a>
                    </div>
                </nav>
            </div>
        );
    }

});