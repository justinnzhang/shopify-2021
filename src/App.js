import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

// Pages
import Landing from './pages/index.jsx';
import Main from './pages/search.jsx';
import Summary from './pages/summary.jsx';
import NotFound from './pages/404.jsx';

const App = () => {
  return (
    <Router>
      <AppProvider i18n={enTranslations}>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/search' component={Main} />
          <Route exact path='/summary' component={Summary} />

          <Route component={NotFound} />
        </Switch>
      </AppProvider>
    </Router>
  );
};

export default App;
