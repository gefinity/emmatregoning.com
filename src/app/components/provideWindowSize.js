import _     from 'lodash';
import React from 'react';

export default function (ComposedComponent, options = {}) {

    let onWidth = typeof options.width !== 'undefined' ? options.width : true;
    let onHeight = typeof options.height !== 'undefined' ? options.height : true;

    return React.createClass({

        getInitialState () {
            return Object.assign(this.getWindowSize(),  {
            });
        },

        getWindowSize () {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },

        onResize (e) {
            let newSize = this.getWindowSize();
            let widthChanged = newSize.width !== this.state.width;
            let heightChanged = newSize.height !== this.state.height;
            if ((widthChanged && onWidth) || (heightChanged && onHeight)) {
                this.setState(newSize);
            }
        },

        componentDidMount () {
            //this.onResize = _.debounce(this.onResize, 500);
            window.addEventListener('resize', this.onResize);
        },

        componentWillUnmount () {
            window.removeEventListener('resize', this.onResize);
        },

        render () {
            return <ComposedComponent   {...this.props}
                                        windowWidth={this.state.width}
                                        windowHeight={this.state.height}
                                        />;
        }

    });

};