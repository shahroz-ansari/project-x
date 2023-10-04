import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import 'react-toastify/dist/ReactToastify.css';

import IDBDataLoader from "./components/idb-data-loader";
import { router } from "./routes";
import {theme} from './theme'
import { store } from "./store";
import './db'

function App() {
  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <IDBDataLoader />
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
    />
  </ThemeProvider>
}

export default App;
