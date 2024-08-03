
import './App.css';
import Routers from './routers/Routers';
import { AuthProvider } from './store/GlobalStore';


function App() {
  return (
    <>
      <AuthProvider>
        <Routers />

      </AuthProvider>

    </>

  );
}

export default App;
