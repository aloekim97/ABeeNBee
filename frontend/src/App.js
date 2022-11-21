// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/Spots";
import CreateSpot from './components/CreateSpot/CreateSpot'
import SpotDetail from "./components/Spots/SpotDetail";
import NewReview from "./components/Reviews/NewReview";
import UserSpots from "./components/Spots/UserSpots";
import EditSpot from "./components/Spots/EditSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route exact path='/'>
            <AllSpots />
          </Route>
          <Route exact path='/spots/create'>
            <CreateSpot />
          </Route>
          <Route exact path='/spots/user'>
            <UserSpots />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetail />
          </Route>
          <Route exact path='/spots/:spotId/reviews/newreview'>
            <NewReview />
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <EditSpot />
          </Route>
        </Switch>
    </>
  );
}

export default App;