import { useEffect } from "react";
import { Route, Redirect, Switch } from 'react-router-dom'
import LandingPage from './components/landing_page/LandingPage';
import Home from './components/home/Home';
import DogDetail from './components/dog_detail/DogDetail';
import CreateDog from './components/create_dog/CreateDog';
import Error404 from './components/error_404/Error404';
import About from './components/about/About';

function App() {
  useEffect(() => {
    if(window.location.pathname !== "/") return;

    fetch(process.env.REACT_APP_BACKEND_BASE_URL, {
      method: "HEAD",
    })
      .catch(() => {});
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/detail/:id" render={({ match }) => <DogDetail id={match.params.id}/>}/>
      <Route exact path="/create-dog" component={CreateDog}/>
      <Route exact path="/about" component={About}/>
      <Redirect from="/home*" to="/home"/>
      <Route path="*" component={Error404} />
    </Switch>
  );
}

export default App;
