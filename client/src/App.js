import { Route, Redirect, Switch } from 'react-router-dom'
import LandingPage from './components/landing_page/LandingPage';
import Home from './components/home/Home';
import DogDetail from './components/dog_detail/DogDetail';
import CreateDog from './components/create_dog/CreateDog';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home/filter=:filter/page=:page" render={({ match }) => {
        return <Home filter={match.params.filter} page={match.params.page || 1}/>
      }}/>
      <Route exact path="/home/page=:page" render={({ match }) => {
        return isNaN(parseInt(match.params.page)) ? (
          <Redirect to="/"/>
          ) : (
            <Home page={match.params.page}/>
            )
          }}/>
      <Route exact path="/home/breed=:breed/page=:page" render={({ match }) => {
        return isNaN(parseInt(match.params.page)) ? (
          <Redirect to="/"/>
          ) : (
            <Home breed={match.params.breed} page={match.params.page}/>
            )
          }}/>
      <Route exact path="/home/detail/id=:id" render={({ match }) => {
        return <DogDetail id={match.params.id}/>
      }}/>
      <Route exact path="/home/create-dog" render={() => <CreateDog/>}/>
      <Redirect from="/home" to="/home/page=1" />
    </Switch>
  );
}

export default App;
