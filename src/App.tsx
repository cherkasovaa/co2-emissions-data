import { Suspense, useState } from 'react';
import './App.css';
import { CountriesList } from './components/CountriesList';
import { Loading } from './components/Loading';
import { Modal } from './components/Modal';
import { Settings } from './components/Settings';
import { TopBar } from './components/TopBar';
import { columns as initialColumns } from './config/constants';
import type { Columns } from './types/columns';

function App() {
  const [openSetting, setOpenSettings] = useState(false);
  const [columns, setColumns] = useState<Columns>(initialColumns);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <>
      <TopBar
        isOpen={openSetting}
        onChange={setOpenSettings}
        onSearch={setSearchQuery}
      />
      <Suspense fallback={<Loading />}>
        <CountriesList searchQuery={searchQuery} columns={columns} />
      </Suspense>

      <Modal isOpen={openSetting} onClose={() => setOpenSettings(false)}>
        <Settings columns={columns} onChange={setColumns} />
      </Modal>
    </>
  );
}

export default App;
