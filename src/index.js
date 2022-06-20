import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './Components/App';
import Profile from './Components/Profile';
import Home from './Components/Home';
import Search from './Components/Search';
import Library from './Components/Library';
import LikedSongs from './Components/LikedSongs';
import Playlist from './Components/Playlist';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="library" element={<Library />} />
            <Route path="likedsongs" element={<LikedSongs />} />
            <Route path='profile' element={<Profile />} />
            <Route path='playlist/:id' element={<Playlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);