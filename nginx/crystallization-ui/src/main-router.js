import React from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
import Home from './components/home';
import ProcessMap from './components/process-map';

const MainRouter = () => (
  <div>
    <Switch>
      <Route exact path='/' component={withRouter(Home)}></Route>
      <Route path='/ProcessMap' component={withRouter(ProcessMap)}></Route>
    </Switch>
  </div>
);

export default MainRouter;
