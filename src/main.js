import React                from 'react';
import ReactDom             from 'react-dom';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory,
    applyRouterMiddleware,
} from 'react-router';
import {useScroll}          from 'react-router-scroll';
import {
    createStore,
    applyMiddleware
} from 'redux';
import { Provider }         from 'react-redux';
import thunk                from 'redux-thunk';
import { createLogger }     from 'redux-logger'

import PageTransition       from './app/components/pageTransition';
import provideWindowSize    from './app/components/provideWindowSize';
import indexContainer       from './app/components/indexContainer';
import Index                from './app/components/index';
import contentContainer     from './app/components/contentContainer';
import Content              from './app/components/content';
import reducer              from './app/reducer';
import 'babel-polyfill';

const logger = createLogger({
    //diff: true,
});  

const store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
)

ReactDom.render((
    <Provider store={store}>
        <Router history={hashHistory} render={applyRouterMiddleware(useScroll())}>
            <Route path='/' component={PageTransition} >
                <IndexRoute component={provideWindowSize(indexContainer(Index), {height: false})} />
                <Route path='/portfolio/:index' component={provideWindowSize(contentContainer(Content), {height: false})} />
            </Route>
        </Router>
    </Provider>
), document.getElementsByClassName('app')[0]);