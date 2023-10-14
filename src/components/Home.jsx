// import React, { useEffect, useState } from 'react'
// import "./Home.scss"
// import axios from 'axios'
// import { Link } from 'react-router-dom'

// const apikey = 'd224d471ec6edd94c87cd5c99d088dd5'
// const url = "https://api.themoviedb.org/3"
// const imgUrl = "https://image.tmdb.org/t/p/original"
// const upcoming = "upcoming"
// const nowPlaying = "now_playing"
// const popular = "popular"
// const topRated = "top_rated"

// const Card = ({ img }) => {
//     return (
//         <div className='card'>
//             <img src={img} alt="cover" />
//         </div>
//     )
// }
// const Row = ({
//     title,
//     arr = []
// }) => {
//     return (
//         <div className='row'>

//             <h2>{title}</h2>
//             <div>
//                 {
//                     arr.map((item, index) => (
//                         <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
//                     ))
//                 }

//             </div>

//         </div>
//     )
// }

// const Home = () => {

//     const [upcomingMovies, setUpcomingMovies] = useState([])
//     const [nowPlayingMovies, setNowPlayingMovies] = useState([])
//     const [popularMovies, setPopularMovies] = useState([])
//     const [topRatedMovies, setTopRatedMovies] = useState([])
//     const [genre, setGenre] = useState([])

//     useEffect(() => {
//         const fetchUpcoming = async () => {
//             const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`);
//             setUpcomingMovies(results)
//         };
//         const fetchNowPlaying = async () => {
//             const { data: { results } } = await axios.get(`${url}/${nowPlaying}?api_key=${apikey}`);
//             setNowPlayingMovies(results)
//         };
//         const fetchPopular = async () => {
//             const { data: { results } } = await axios.get(`${url}/${popular}?api_key=${apikey}`);
//             setPopularMovies(results)
//         };
//         const fetchTopRated = async () => {
//             const { data: { results } } = await axios.get(`${url}/${topRated}?api_key=${apikey}`);
//             setTopRatedMovies(results)
//         };
//         const getAllGenre = async () => {
//             const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
//             setGenre(genres)
//             // console.log(genres);
//         };
//         getAllGenre();

//         fetchUpcoming();
//         fetchNowPlaying();
//         fetchPopular();
//         fetchTopRated();
//     }, [])

//     return (
//         <>
//             <section className='home'>
//                 <div className="banner">
//                     <img src={`${imgUrl}/${popularMovies[0].poster_path}`} alt="" />

//                 </div>

//                 <Row title={"UpComing"} arr={upcomingMovies} />
//                 <Row title={"Now Playing"} arr={nowPlayingMovies} />
//                 <Row title={"Popular"} arr={popularMovies} />
//                 <Row title={"Top Rated"} arr={topRatedMovies} />

//             <div className="genreBox">

//                 {genre.map((item)=>(
//                     <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
//                 ))}
//             </div>

//             </section>
//         </>
//     )
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
const apikey = 'd224d471ec6edd94c87cd5c99d088dd5';
const url = 'https://api.themoviedb.org/3';
const imgUrl = 'https://image.tmdb.org/t/p/original';
const endpoints = {
    upcoming: 'movie/upcoming',
    nowPlaying: 'movie/now_playing',
    popular: 'movie/popular',
    topRated: 'movie/top_rated',
    genres: 'genre/movie/list',
};

const Card = ({ img }) => {
    return (
        <div className='card'>
            <img src={img} alt="cover" />
        </div>
    );
};

const Row = ({ title, arr = [] }) => {
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div>
                {arr.map((item, index) => (
                    <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const fetchData = async (endpoint, stateSetter) => {
            try {
                const response = await axios.get(`${url}/${endpoint}`, {
                    params: {
                        api_key: apikey,
                    },
                });
                stateSetter(response.data.results);
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
            }
        };

        fetchData(endpoints.upcoming, setUpcomingMovies);
        fetchData(endpoints.nowPlaying, setNowPlayingMovies);
        fetchData(endpoints.popular, setPopularMovies);
        fetchData(endpoints.topRated, setTopRatedMovies);

        // Fetch genres
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`${url}/${endpoints.genres}`, {
                    params: {
                        api_key: apikey,
                    },
                });
                setGenre(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
    }, []);

    return (
        <>
            <section className='home'>
                <div className="banner" style={{

                    backgroundImage: popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})` : " rgb(28, 25, 25);"
                }}>
                    {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
                    {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
                    <div>
                        <button><BiPlay/>Play</button>
                        <button>My List <AiOutlinePlus/></button>
                    </div>
                </div>
                <Row title={"Upcoming"} arr={upcomingMovies} />
                <Row title={"Now Playing"} arr={nowPlayingMovies} />
                <Row title={"Popular"} arr={popularMovies} />
                <Row title={"Top Rated"} arr={topRatedMovies} />
                <div className="genreBox">
                    {genre.map((item) => (
                        <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;
