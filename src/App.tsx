import React from 'react';
import './App.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Profesionals from './components/Professionals'


const queryClient = new QueryClient()

function App() {
  return (
  <QueryClientProvider client={queryClient}>
  
     <Profesionals></Profesionals>
    </QueryClientProvider>
  );
}

export default App;
