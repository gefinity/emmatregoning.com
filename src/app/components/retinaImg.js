import React            from "react";
import imagesLoaded     from "imagesLoaded";

export default React.createClass({

    getInitialState: function () {
        return {
            retina: window.devicePixelRatio > 1
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.pickImage();
    },

    componentWillMount: function () {
        this.pickImage();
    },

    render: function () {
        let style = {
            backgroundImage: `url(${this.state.src})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            width: this.state.width,
            height: this.state.height
        };
        if (!this.state.src) {
            delete style.backgroundImage;
        }
        return (
            <div className={this.props.className} style={style} data-src={this.props.src} title={this.props.alt}></div>
        );
    },

    pickImage: function () {
        let img = new Image();
        if (this.state.retina) {
            img.src = this.props.retinaSrc || this.props.src;
        } else {
            img.src = this.props.src;
        }
        if (!img || !img.src) {
            return;
        }
        imagesLoaded(img, function (instance) {
            let useDedicatedRetinaImage = !!(this.props.retinaSrc);
            let {width, height} = instance.images[0].img;
            this.setState({
                src: instance.images[0].img.src,
                width: (!this.state.retina && useDedicatedRetinaImage) ? width : width/2,
                height: (!this.state.retina && useDedicatedRetinaImage) ? height : height/2
            });
        }.bind(this));
    }

});