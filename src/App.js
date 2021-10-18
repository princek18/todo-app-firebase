import './App.css';
import { auth } from './Components/firebase_db';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Header } from './Components/Header/Header';
import {Footer} from './Components/Footer/Footer';
import { Login } from './Components/Login/Login';
import { MainComponent } from './Components/MainComponent';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <Header/>
      {user ? <MainComponent/> : <Login/>}
      <Footer/>
    </div>
  );
}

export default App;
