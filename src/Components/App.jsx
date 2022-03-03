import '../Styles/App.css';
import Controls from './Controls';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App">
      <div className="top-container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="right-container">
          <div className='header'>
            <Header />
          </div>
          <div className="main">
            <Main />
          </div>
        </div>
      </div>
      <div className="controls-container">
        <Controls />
      </div>
    </div>
  );
}

export default App;