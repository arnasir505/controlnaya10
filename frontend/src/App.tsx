import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import NewPost from './pages/NewPost/NewPost';
import News from './pages/News/News';

function App() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path='/' element={<News />} />
        <Route path='/new-post' element={<NewPost />} />
      </Routes>
    </>
  );
}

export default App;
