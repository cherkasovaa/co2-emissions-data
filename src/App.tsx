import { Suspense } from 'react';
import './App.css';
import { CountriesList } from './components/CountriesList';
import { Loading } from './components/Loading';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <CountriesList />
    </Suspense>
  );
}

export default App;
