import React from 'react';

export default React.createClass({

    render () {
        return (

            <section id='home'>

                <div className='hero'>

                    <div className='heroMask' style={{borderWidth: `0 0 210px ${this.props.windowWidth}px`}}></div>

                    <div className='heroTitle'>
                        <div>
                            <h1>Made in Cornwall</h1>
                            <span>Designing in London</span>
                        </div>
                    </div>

                </div>

                <div className='whatIDo'>

                    <div className='whatIDoTitle'>
                        <h2>What I Do</h2>
                        <span>Freelance Senior Digital Designer, London</span>
                    </div>

                    <div className='whatIDoPoints'>
                        <div>
                            <div>
                                <span>01</span>
                            </div>
                            <p>
                                Hand draw scamps
                            </p>
                            <p>
                                Initial design exploration
                            </p>
                            <p>
                            </p>
                        </div>
                        <div>
                            <div>
                                <span>02</span>
                            </div>
                            <p>
                                Use Sketch to create responsive designs
                            </p>
                            <p>
                                Prototype design in Invision &amp; Marvel
                            </p>
                            <p>
                                Create digital styleguides
                            </p>
                        </div>
                        <div>
                            <div>
                                <span>03</span>
                            </div>
                            <p>
                                Use Zeplin to provide designs to devs
                            </p>
                            <p>
                                Work with the dev team to provide creative QA
                            </p>
                            <p>
                                That’s me done
                            </p>
                        </div>
                    </div>

                </div>

            </section>
            
        );
    }

});