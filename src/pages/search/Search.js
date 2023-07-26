
import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormControl,Button } from 'react-bootstrap';
import MovieBox from '../../components/movieBox/movieBox';


const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=6b8e42e888defa4229bd530e32a0c3d8";
    const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=<<api_key_here>>&query";
const Search=()=>{
    
   
        const [movies, setMovies]=useState([]);
        const [query, setQuery]=useState('');
    
       
        
        useEffect(() => {
            fetch(API_URL)
            .then((res)=>res.json())
            .then(data=>{
              console.log(data);
              setMovies(data.results);
            })
          }, [])
        
        
          const searchMovie = async(e)=>{
            e.preventDefault();
            console.log("Searching");
            try{
              const url=`https://api.themoviedb.org/3/search/movie?api_key=6b8e42e888defa4229bd530e32a0c3d8&query=${query}`;
              const res= await fetch(url);
              const data= await res.json();
              console.log(data);
              setMovies(data.results);
            }
            catch(e){
              console.log(e);
            }
          }
        
          const changeHandler=(e)=>{
            setQuery(e.target.value);
          }

    return(
        <>
           <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
              type="search"
              placeholder="Movie Search"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>
            <div >
      {movies.length > 0 ?(
        <div >
        <div style={{display: 'flex', flexWrap:'wrap', justifyContent:'center'}}>
          {movies.map((movieReq)=>
          <MovieBox key={movieReq.id} {...movieReq}/>)}
            </div>
    </div>
      ):(
        <h2>Sorry...No Movies Found</h2>
      )}
    </div> 
        </>
    )
}


export default Search