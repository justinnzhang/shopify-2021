import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

// Pages
import Landing from './pages/index';
import Main from './pages/search';
import Summary from './pages/summary';

const App = () => {
  return (
    <Router>
      <AppProvider i18n={enTranslations}>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/search' component={Main} />
          <Route exact path='/summary' component={Summary} />
        </Switch>
      </AppProvider>
    </Router>
  );
};

export default App;
