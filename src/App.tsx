import { Suspense, useState } from 'react';
import './App.css';
import { CountriesList } from './components/CountriesList';
import { Loading } from './components/Loading';
import { Modal } from './components/Modal';
import { Settings } from './components/Settings';
import { columns as initialColumns } from './config/constants';
import type { Columns } from './types/columns';

function App() {
  const [openSetting, setOpenSettings] = useState(false);
  const [columns, setColumns] = useState<Columns>(initialColumns);

  return (
    <>
      <button onClick={() => setOpenSettings(!openSetting)}>Settings</button>

      <Suspense fallback={<Loading />}>
        <CountriesList columns={columns} />
      </Suspense>

      <Modal isOpen={openSetting} onClose={() => setOpenSettings(false)}>
        <Settings columns={columns} onChange={setColumns} />
      </Modal>
    </>
  );
}

export default App;
