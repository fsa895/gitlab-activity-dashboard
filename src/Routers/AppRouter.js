import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import App from './../App.js';


class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Route path="/" component={App} exact={true} />
                </HashRouter>
            </div>
        );
    }
};
export default AppRouter;