import { Route, Redirect, Switch } from 'react-router-dom'
import LandingPage from './components/landing_page/LandingPage';
import Home from './components/home/Home';
import DogDetail from './components/dog_detail/DogDetail';
import CreateDog from './components/create_dog/CreateDog';
import Loader from './components/loader/Loader';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/detail/id=:id" render={({ match }) => <DogDetail id={match.params.id}/>}/>
      <Route exact path="/create-dog" component={CreateDog}/>
      <Redirect from="/home*" to="/home"/>
      <Route path="*" component={Loader} />
    </Switch>
  );
}

export default App;
