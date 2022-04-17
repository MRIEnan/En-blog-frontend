import logo from './logo.svg';
import './App.css';
import Counter from './Pages/Counter';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import BlogsPages from './Pages/Blogs/BlogsPages';
import Blog from './Pages/Blog/Blog';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<BlogsPages/>}/>
          <Route path='/home' element={<BlogsPages/>}/>
          <Route path='/blogs' element={<BlogsPages/>}/>
          <Route path='/blog/:id' element={<Blog/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
  );
}

export default App;
