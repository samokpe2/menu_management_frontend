import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import Layout from './components/templates/Layout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <Layout />
      <ToastContainer />
    </RecoilRoot>
  </QueryClientProvider>
  
);

export default App;
