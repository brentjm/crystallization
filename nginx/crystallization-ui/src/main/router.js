import React from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
import Home from '../home/home';
import ProcessMap from '../process-map/process-map';

const MainRouter = () => (
  <div>
    <Switch>
      <Route exact path='/' component={withRouter(Home)}></Route>
      <Route path='/ProcessMap' component={withRouter(ProcessMap)}></Route>
    </Switch>
  </div>
);

export default MainRouter;
