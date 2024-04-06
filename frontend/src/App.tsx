import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import NewPost from './pages/NewPost/NewPost';
import News from './pages/News/News';
import FullPost from './pages/FullPost/FullPost';

function App() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path='/' element={<News />} />
        <Route path='/new-post' element={<NewPost />} />
        <Route path='/news/:id' element={<FullPost />} />
        <Route path='*' element={<h1>Not Found!</h1>} />
      </Routes>
    </>
  );
}

export default App;
