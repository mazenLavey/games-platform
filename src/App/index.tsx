import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from 'layouts/RootLayout';
import Home from 'pages/Home';
import TicTakToe from 'pages/TicTakToe';
import 'normalize.css';
import './index.css';

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<TicTakToe />} />
        {/* <Route path='tic-tak-toe' element={<TicTakToe />} /> */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
