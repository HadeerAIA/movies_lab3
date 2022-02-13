import React,{useEffect,useState} from 'react';
import Movie from './components/movie';
import './App.css';

const FEATURED_API = "https://api.themoviedb.org/3/movie/popular?api_key=7a1c19ea3c361a4d3cc53eb70ef8298c&page=4";
const SEARCH_API="https://api.themoviedb.org/3/search/movie?api_key=7a1c19ea3c361a4d3cc53eb70ef8298c&query="


function App() {
    const [movies,setMovies]=useState([]);
    const [searchTerm , setsearchTerm]=useState('');
    useEffect(()=> {
      fetch(FEATURED_API)
      .then((res)=>res.json())
      .then((data)=>{
        // console.log(data);
        setMovies(data.results);
      });
    },[]);

    const handleOnSubmit = (e) => {
      e.preventDefault();

      if(searchTerm){
        fetch(SEARCH_API+searchTerm)
      .then((res)=>res.json())
      .then((data)=>{
        setMovies(data.results);
      });

      setsearchTerm('');
      }
      
    };
    const handleOnChange = (e) =>{
      setsearchTerm(e.target.value);
    }

      return (
        <>
        <header>
          <form onSubmit={handleOnSubmit}>
            <input type="search" 
            placeholder='Search...' 
            className='search' 
            value={searchTerm}
            onChange={handleOnChange}
            />
          </form>
        </header>
        
        <div className='movie-container'>
            {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />
            )}
          </div>
          </>
      );
}

export default App;
