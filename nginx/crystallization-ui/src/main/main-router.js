import React from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
import Home from '../home/home';
import ProcessMap from '../process-map/process-map';
import Container from '../process-map/container';

const MainRouter = () => (
  <div>
    <Switch>
      <Route exact path='/' component={withRouter(Home)}></Route>
      <Route path='/ProcessMap' component={withRouter(Container)}></Route>
    </Switch>
  </div>
);

export default MainRouter;
