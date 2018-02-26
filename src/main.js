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
import App                  from './app/components/app';
import provideWindowSize    from './app/components/provideWindowSize';
import indexContainer       from './app/components/indexContainer';
import Index                from './app/components/index';
import contentContainer     from './app/components/contentContainer';
import Content              from './app/components/content';
import 'babel-polyfill';

ReactDom.render((
    <Router history={hashHistory} render={applyRouterMiddleware(useScroll())}>
        <Route path='/' component={App} >
            <IndexRoute component={provideWindowSize(indexContainer(Index), {height: false})} />
            <Route path='/portfolio/:index' component={provideWindowSize(contentContainer(Content), {height: false})} />
        </Route>
    </Router>
), document.getElementsByClassName('app')[0]);