
import React, { Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'
import Mapbox from './Mapbox'

class routers extends Component {
    render() {
        return (
        <Provider store={store}>
            <div>
                <Router>
                       <Route exact path={""}><Mapbox /></Route>
                       <Switch>
                            <Route  path={"/log/:id"} children={<Mapbox  />} />
                       </Switch>

                </Router>
            </div>
        </Provider>
        );
    }
}

export default routers;