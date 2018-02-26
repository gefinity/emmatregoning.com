import React                from 'react';
import $                    from 'jquery';
import reactDom             from 'react-dom';

const tooltipTimeoutTime = 2000;

export default React.createClass({

    getInitialState () {
        return {
            tooltip: false
        };
    },

    hideTooltip () {

        clearTimeout(this.tooltipTimeout);
        this.setState({
            tooltip: false
        });

    },

    onTooltip (state) {
        
        if (state) {

            clearTimeout(this.tooltipTimeout);
            this.setState({
                tooltip: true
            });

        } else {

            clearTimeout(this.tooltipTimeout);
            this.tooltipTimeout = setTimeout(() => {
                this.setState({
                    tooltip: false
                });
            }, tooltipTimeoutTime);

        }

    },

    render () {

        return (

            <section id='about'>

                <img alt src='images/me@2x.png' className='profile' />

                <div className='sectionHeader'>
                    <h2>About</h2>
                    <p>
                        I’m a senior digital designer who has created beautiful responsive web designs for a range of big and small clients. I’ve worked on entertainment and fashion focused briefs as well as corporate briefs for energy, financial and security clients.
                        <br /><br />
                        My favourite design software to use is Sketch. I use Invision and Marvel for prototyping and Zeplin to share the design with developers.
                    </p>
                </div>

                <div className='about-skills'>

                    <h3>
                        Tools I like to work with…
                    </h3>

                    <div className='skills-list'>
                        <img alt src='images/sketch@2x.png' width='30' />
                        <img alt src='images/ps@2x.png' width='30' />
                        <img alt src='images/invision@2x.png' width='30' />
                        <img alt src='images/marvel@2x.png' width='66' />
                        <img alt src='images/zeplin@2x.png' width='40' />
                        <img alt src='images/slask@2x.png' width='30' />
                    </div>

                </div>

                <div className='about-contacts'>

                    <div className='contacts'>

                        <a href='https://uk.linkedin.com/in/emma-tregoning-3a0a0011' target='_blank' title='LinkedIn' onMouseOver={this.hideTooltip}>
                            <img alt src='images/linkedin.svg' />
                        </a>

                        <a href='mailto:emma@lovebirddigital.com' title='Email' onMouseOver={this.hideTooltip}>
                            <img alt src='images/email.svg' />
                        </a>

                        <a href='tel://447793068958' title='Mobile' onMouseOver={this.onTooltip.bind(this, true)} onMouseOut={this.onTooltip.bind(this, false)}>
                            <img alt src='images/phone.svg' />
                            {this.state.tooltip &&
                                <div className='tooltipDot'></div>
                            }
                        </a>

                    </div>

                    <div className={this.state.tooltip ? 'tooltip visible' : 'tooltip'}>
                        <a href='tel://447793068958'>
                            <span>(+44)</span> 07793068958
                        </a>
                    </div>

                </div>

            </section>

        );
    }

});