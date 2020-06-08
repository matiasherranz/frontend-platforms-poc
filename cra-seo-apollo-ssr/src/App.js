import React from 'react';

import './App.css';
import { Switch, Route } from 'react-router-dom';
import { ClientSideComponent } from 'react-prerendered-component';
import { Navigation } from './components/Navigation';
import { routes } from './routes';

const App = () => (
  <div className="App">
    <ClientSideComponent>
      <Navigation />
    </ClientSideComponent>
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          exact={route.exact}
          path={route.path}
          render={props => {
            const Content = route.content;
            const Seo = route.seo;

            return (
              <>
                {Seo && <Seo {...props} />}
                <ClientSideComponent>
                  <Content {...props} />
                </ClientSideComponent>
              </>
            );
          }}
        />
      ))}
    </Switch>
  </div>
);

export default App;
