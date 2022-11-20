// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/Spots";
import CreateSpot from './components/CreateSpot/CreateSpot'
import SpotDetail from "./components/Spots/SpotDetail";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route exact path='/'>
            <AllSpots />
          </Route>
          <Route exact path='/spots/create'>
            <CreateSpot />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetail />
          </Route>
        </Switch>
    </>
  );
}

export default App;