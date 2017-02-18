import $                    from 'jquery';
import _                    from 'lodash';
import React                from 'react';
import Footer               from 'app/components/footer';
import {
    Router,
    Link,
    hashHistory
} from 'react-router';
import {
    maxWidthExpandContent
} from 'constants';
import getImageSource       from 'app/getImageSource';

export default React.createClass({

    getDefaultProps () {
        return {
            portfolioItem: {}
        };
    },

    onBack (e) {
        e.preventDefault();
        hashHistory.push(`/`);
    },

    render () {

        let expandedItem = this.props.portfolioItem;

        return (
            <div className='page expanded'>

                <div className='expandedTitle'>
                    <div>
                        <a href onClick={this.onBack}>
                            <img alt src={require('images/back-to-portfolio.svg')} />
                        </a>
                        <h1>{expandedItem.title}</h1>
                        <Link to='/' className='logo'>
                            <img src={require('images/logo-32-x-32.svg')} width='32' />
                        </Link>
                    </div>
                </div>

                <div className='expandedInner'>

                    {(expandedItem.rows || []).map((row, index) => {
                        return (
                            <div className='row' key={'row-'+index}>

                                {row.cols.map((col, index) => {

                                    // TODO thinking about converting to flex instead of using % of other units
                                    //      let flexWidth = parseInt(col.width.replace('%', ''), 10)/100;
                                    // would need to swap width for flex prop on each col
                                    //      width: col.width
                                    //      flex: flexWidth

                                    if (col.bgImageSrc) {

                                        let src = col.bgImageSrc;
                                        if (_.isArray(col.bgImageSrc)) {
                                            // multiple image sources available with minWidth properties
                                            src = getImageSource(this.props.windowWidth, col.bgImageSrc);
                                        }

                                        if (src) {
                                            return (
                                                <div className='col' key={'col-'+index} style={{width: col.width, backgroundColor: col.bgColor, color: col.color}}>
                                                    <img src={src} alt={col.alt} />
                                                </div> 
                                            );
                                        }

                                    } else if (col.text) {

                                        return (
                                            <div className={col.class ? 'col ' + col.class : 'col'} key={'col-'+index} style={{width: col.width}}>
                                                <div>
                                                    <div className='item-text-line'></div>
                                                    {col.title &&
                                                        <h3>
                                                            {col.title}
                                                        </h3>
                                                    }
                                                    {/* allow html stuff like <b> in the text */}
                                                    <p dangerouslySetInnerHTML={{__html: col.text}}></p>
                                                </div>
                                            </div>
                                        );

                                    }

                                })}
                            </div>
                        );
                    })}

                </div>

                <Footer />

            </div>
        );

    },

});