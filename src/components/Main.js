import React,{useState,useEffect} from 'react'
import '../App.css'
import {FaSearch} from "react-icons/fa";

const Main = ()=>{

    let [articles,setArticles] = useState([]); 
    let [search,setSearch] = useState("");
    let [totalResults,setTotalResults] = useState("")

    useEffect(()=>{
        let url="https://newsapi.org/v2/everything?q=bitcoin&apiKey=2b9b5e0fe55f4d04be20930706d66b1a"

        fetch(url)
        .then((response)=>response.json())
        .then((news)=>{
            setArticles(news.articles);
            console.log(news)
        })
    },[])

    function readValue(value){
        setSearch(value);
    }

    const searchNews=()=>{
        let url=`https://newsapi.org/v2/everything?q=${search}&apiKey=2b9b5e0fe55f4d04be20930706d66b1a`

        fetch(url)
        .then((response)=>response.json())
        .then((news)=>{
            setArticles(news.articles);
            setTotalResults(news.totalResults);
            console.log(news)
        })
    }


    return(
        <div className="container">
            <div className="Padd">
            <div class="logo">
                <div className="padding">
                    NE<span className="span">WS</span>
                </div>
            </div>
                <div className="filter">
                    <input type="search" onChange={(event)=>{readValue(event.target.value)}} placeholder=" Search here.. ">
                    </input>
                    <button type="submit"  onClick={searchNews}><FaSearch className="style"/></button>
                </div>
                <div className="head">
                    <h1>Latest News & Articles:-</h1>
                    <h2>Total Results : {totalResults}</h2>
                </div>
                
            {
                articles.length === 0 ?(<h2> No Data Found.. :(</h2>) :
                articles.map((article,index)=>(
                    <div key={index} className="article">
                        <div className="article-Padd">
                            <div className="news-img">
                                <img  src={article.urlToImage} alt="..."/>
                            </div>
                            <div className="news-details">
                                <h3>{article.title}</h3>
                                <p>~{article.author}</p>
                                <p>{article.description}</p>
                                <a href={article.url} rel="noreferrer" target="_blank">Read  Full  Article</a>
                            </div>
                        </div>
                   </div>
                ))
            }

            </div>
        </div>
    )
}
export default Main
