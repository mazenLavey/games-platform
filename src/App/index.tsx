import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from 'layouts/RootLayout';
import Home from 'pages/Home';
import TicTakToe from 'pages/TicTakToe';
import NewTicTakToeGame from 'pages/TicTakToe/NewTicTakToeGame';
import JoinTicTakToeGame from 'pages/TicTakToe/JoinTicTakToeGame';
import TicTakToeGameBoard from 'pages/TicTakToe/TicTakToeGameBoard';
import Blackjack from 'pages/Blackjack';
import NewBlackjackGame from 'pages/Blackjack/NewBlackjackGame';
import JoinBlackjackGame from 'pages/Blackjack/JoinBlackjackGame';
import BlackjackGameBoard from 'pages/Blackjack/BlackjackGameBoard';
import routes from 'routes';
import 'normalize.css';
import './index.scss';

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={routes.home} element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.ticTakToePage} element={<TicTakToe />}>
          <Route path={routes.newTicTakToeGame} element={<NewTicTakToeGame />} />
          <Route path={routes.joinTicTakToeGame} element={<JoinTicTakToeGame />} />
          <Route path={routes.ticTakToeGameBoard} element={<TicTakToeGameBoard />} />
        </Route>
        <Route path={routes.blackjackPage} element={<Blackjack />}>
          <Route path={routes.newBlackjackGame} element={<NewBlackjackGame />} />
          <Route path={routes.joinBlackjackGame} element={<JoinBlackjackGame />} />
          <Route path={routes.blackjackGameBoard} element={<BlackjackGameBoard />} />
        </Route>
        <Route path='*' element={<Navigate to={routes.home} replace />} />
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
