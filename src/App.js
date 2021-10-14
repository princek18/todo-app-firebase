import './App.css';
import { Header } from './Components/Header/Header';
import {Footer} from './Components/Footer/Footer';
import { MainComponent } from './Components/MainComponent';

function App() {
  return (
    <div className="App">
      <Header/>
      <MainComponent/>
      <Footer/>
    </div>
  );
}

export default App;
