import React        from 'react';
import $            from 'jquery';
import reactDom     from 'react-dom';
import 'velocity-animate';

export default React.createClass({

    onExternalLink (e) {
        e.stopPropagation();
    },

    componentWillEnter (next) {
        let node = reactDom.findDOMNode(this);
        $(node).css({
            opacity: 0
        }).stop().velocity({
            opacity: 1
        }, {
            duration: 500,
            delay: $(node).index() * 50,
            complete: next
        });
    },

    render () {
        return (
            <div className={this.props.loading ? 'tile expanded' : 'tile'} key={this.props.portfolioItem.cid} onClick={this.props.onExpand.bind(null, this.props.portfolioItem)}>
                
                <img src={this.props.portfolioItem.thumb} alt />
                
                <div className='tileOverlay'>
                    
                    <div className='overlayColor'></div>

                    {this.props.loading &&
                        <img className='loading' src={require('images/item-loading.svg')} alt />
                    }

                    {!this.props.loading &&
                        <div className='overlayContent'>
                            <h3>
                                {this.props.portfolioItem.title}
                            </h3>
                            <button>Show me</button>
                        </div>
                    }

                </div>
            </div>
        );
    }

});