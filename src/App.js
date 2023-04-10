import './App.css';
import Create from './component/Create';
import Read from './component/Read';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Update from './component/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Create />}></Route>
          <Route exact path='/read' element={<Read />}></Route>
          <Route exact path='/update/:id' element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
