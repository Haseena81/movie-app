import React,{useState,useEffect} from 'react';
import "./Header.css";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav,Form, FormControl,Button } from 'react-bootstrap';
import Cards from '../card/Card';
import MovieBox from '../movieBox/movieBox';

const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=6b8e42e888defa4229bd530e32a0c3d8";
const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=<<api_key_here>>&query";
const Header= () =>{
    const [movies, setMovies]=useState([]);
    const [query, setQuery]=useState('');

    const[searchingMovie, setSearchingMovie]=useState();
    
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
   return (
    <>
    <div className="header">
        <div className="headerLeft">
            <Link to="/" ><span>Home</span></Link>
            <Link to="/movies/popular" style={{textDecoration:"none"}}><span>Popular Top</span></Link>
            <Link to="/movies/top_rated" style={{textDecoration:"none"}}><span>Top rated</span></Link>
            <Link to="/movies/upcoming" style={{textDecoration:"none"}}><span>Upcoming</span></Link>
            <Link to="/search" style={{textDecoration:"none"}}><span>Search</span></Link>
          
         
            
        </div>
       

    </div>
   
</>
   )
}

export default Header