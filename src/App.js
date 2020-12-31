import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

// styles
import './global.scss';

// React components
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Pokemon from './pages/Pokemon/Pokemon';

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/pokemon/:name' component={Pokemon} />
            </Switch>
        </Router>
    );
};

export default App;
