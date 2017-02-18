
import $                from "jquery";
import React            from "react";
import AnimationGroup   from "app/components/animationGroup";
import "velocity-animate";

let duration = 300;

export default React.createClass({

    getDefaultProps: function () {
        return {
            src: []
        };
    },

    getInitialState: function () {
        return {
            activeIndex: 0,
            emptyImage: undefined
        };
    },

    componentDidMount: function () {

        this.transitions = 0;

        // preload slides
        this.props.src.forEach((imageSrc) => {
            let image = new Image();
            image.src = imageSrc;
        });

    },

    next: function (e) {

        e.preventDefault();
        if (this.transitions) {
            return;
        }
        let activeIndex = this.state.activeIndex;
        this.setState({
            activeIndex: activeIndex + 1 < this.props.src.length ? ++activeIndex : 0
        });

    },

    prev: function (e) {

        e.preventDefault();
        if (this.transitions) {
            return;
        }
        let activeIndex = this.state.activeIndex;
        this.setState({
            activeIndex: activeIndex - 1 >= 0 ? --activeIndex : activeIndex = this.props.src.length-1
        });

    },

    onClickPager: function (index) {
        if (this.transitions) {
            return;
        }
        this.setState({
            activeIndex: index
        });
    },

    cycleEnter: function (component, node, done) {
        this.transitions++;
        $(node).velocity(
            {
                "opacity": [1, 0]
            },
            {
                duration: duration,
                complete: () => {
                    this.transitions--;
                    done();
                }
            }
        );
    },

    cycleLeave: function (component, node, done) {
        this.transitions++;
        let img = $(node).children("img:first");
        $(node).css(
            {
                position: "absolute",
                width: img.width(),
                height: img.outerHeight(),
                left: "50%",
                "margin-left": -img.width()/2
            }
        ).velocity(
            {
                "opacity": [0, 1]
            },
            {
                duration: duration,
                complete: () => {
                    this.transitions--;
                    done();
                }
            }
        );
    },

    render: function () {
        let images = this.props.src;
        return (
            <div className="carousel" style={{height: this.props.maxHeight}}>
                <AnimationGroup component="div" className="slides">
                    <a href key={this.state.activeIndex} onClick={this.next} transitionEnter={this.cycleEnter} transitionLeave={this.cycleLeave}>
                        <img src={images[this.state.activeIndex] || this.state.emptyImage} alt />
                    </a>
                </AnimationGroup>
                {images.length > 1 ?
                    <div>
                        <a href className="prev" onClick={this.prev}>
                            <img alt="" src="images/left_arrow.png" />
                        </a>
                        <a href className="next" onClick={this.next}>
                            <img alt="" src="images/right_arrow.png" />
                        </a>
                        {/*
                        <div className="pager-holder">
                            <div className="dynamic-width-center">
                                <div>
                                    <ul className="pager">
                                        {images.map((image, index) => {
                                            return <li key={index} className={index === this.state.activeIndex ? "active" : ""} onClick={this.onClickPager.bind(this, index)}></li>;
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        */}
                        <div className="signpost">
                            <ul className="pager">
                                {images.map((image, index) => {
                                    return <li key={index} className={index === this.state.activeIndex ? "active" : ""} onClick={this.onClickPager.bind(this, index)}></li>;
                                })}
                            </ul>
                        </div>
                    </div>
                : undefined}
            </div>
        );
    }

});