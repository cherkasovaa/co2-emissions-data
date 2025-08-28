import { Suspense, useState } from 'react';
import './App.css';
import { DataProvider } from './components/DataProvider';
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
      <Suspense fallback={<Loading />}>
        <DataProvider
          openSetting={openSetting}
          setOpenSettings={setOpenSettings}
          columns={columns}
        />
      </Suspense>

      <Modal isOpen={openSetting} onClose={() => setOpenSettings(false)}>
        <Settings columns={columns} onChange={setColumns} />
      </Modal>
    </>
  );
}

export default App;
