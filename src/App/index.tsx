import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from 'layouts/RootLayout';
import Home from 'pages/Home';
import TicTakToe from 'pages/TicTakToe';
import NewTicTakToeGame from 'pages/TicTakToe/NewTicTakToeGame';
import JoinTicTakToeGame from 'pages/TicTakToe/JoinTicTakToeGame';
import GameBoard from 'pages/TicTakToe/GameBoard';
import Blackjack from 'pages/Blackjack';
import NewBlackjackGame from 'pages/Blackjack/NewBlackjackGame';
import JoinBlackjackGame from 'pages/Blackjack/JoinBlackjackGame';
import BlackjackGameBoard from 'pages/Blackjack/BlackjackGameBoard';
import 'normalize.css';
import './index.css';

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='tic-tak-toe' element={<TicTakToe />}>
          <Route path='new-game' element={<NewTicTakToeGame />} />
          <Route path='join-game' element={<JoinTicTakToeGame />} />
          <Route path=':id' element={<GameBoard />} />
        </Route>
        <Route path='blackjack' element={<Blackjack />}>
          <Route path='new-game' element={<NewBlackjackGame />} />
          <Route path='join-game' element={<JoinBlackjackGame />} />
          <Route path=':id' element={<BlackjackGameBoard />} />
        </Route>
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
