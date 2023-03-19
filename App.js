import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useEffect,useState,useRef} from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Main from './Main';


function App({data}) {
  const [datasearch, setdatasearch] = useState(data);
  const [imgarr, setimgarr] = useState([]);
  const content = useRef(null);
  useEffect(()=> {
    //method key cat/mountain/ sort per_page:40 format xml/json
    const urldata = {
      method: "flickr.photos.search",
      api_key: "bdcb383c125f9453319d6a56f8ae0da9",
      text: datasearch,
      sort: "",
      per_page: 20,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
    const searchurl = new URLSearchParams(urldata);
    const url = `https://api.flickr.com/services/rest/?${searchurl}`
    axios.get(url).then((resp)=> {
      const dataarr = resp.data.photos.photo.map((imgData)=> {
        return geturl(imgData, 'q');
      });
      setimgarr(dataarr);
    })
  }, [datasearch])
  const geturl = (img, size)=> {
    let url = `https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}`
    if(size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <div className='one'>
    <h1>Snap shot</h1>
    <div>
    <input id='input' onChange={(e)=> {content.current = e.target.value} }/>
    <button onClick={()=> {setdatasearch(content.current)}}>Search</button>
    <section className='nav'>
      <Link to="/"><button onClick={()=> {setdatasearch("mountains")}}>Mountains</button></Link>
      <Link to="/beaches"><button onClick={()=> {setdatasearch("beaches")}}>Beaches</button></Link>
      <Link to="/birds"><button onClick={()=> {setdatasearch("birds")}}>Birds</button></Link>
      <Link to="/food"><button onClick={()=> {setdatasearch("food")}}>Food</button></Link>
    </section>
    </div>
    <section className='image-container'>
      
        {imgarr.map((imageurl, key)=> {
          return (
            <article className='flickr-image'>
              <img src={imageurl} key={key}/>
            </article>
          )
          
        })}
      
    </section>
    </div>
  );
}

export default App;
