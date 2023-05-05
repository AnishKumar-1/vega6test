import { Route, Routes } from 'react-router-dom';
import './App.css';
import Addcaption from './Addcaption';
import Searchpage from './Searchpage';
function App() {
  return (
    <div className="App">
  
    <Routes>
      <Route path="/add-captions/:id" element={<Addcaption/>}/>
      <Route path='/' element={<Searchpage/>}/>
    </Routes>
   
    </div>
  );
}

export default App;
