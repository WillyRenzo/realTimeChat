import React from 'react';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Join from './pages/Join';
import Chat from './pages/Chat';

export default function App(){
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={Join}/>
                <Route path="/chat" component={Chat}/>
            </Switch>
        </Router>
    );
}

