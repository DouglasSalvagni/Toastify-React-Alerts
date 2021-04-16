import { useContext, useEffect } from 'react';
import Toast from './components/Toaste';
import { ToastContext } from './components/Toaste';

function App() {


  return (
    <Toast>
      <div className="App">
        <header className="App-header">
          <Teste />
        </header>
      </div>
    </Toast>
  );
}

export default App;

function Teste() {

  const { newAlert } = useContext(ToastContext);

  function handleSuccess(e){
    e.preventDefault();
    newAlert("nova mensagem", "success", 9000)
  }

  function handleError(e){
    e.preventDefault();
    newAlert("nova mensagem", "error", 4000)
  }

  return(
    <div>
      <button onClick={(e) => handleSuccess(e)}>
        success
      </button><br/>
      <button onClick={(e) => handleError(e)}>
        Error
      </button>
    </div>
  )
}
