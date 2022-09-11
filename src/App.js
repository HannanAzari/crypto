
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import SideBar from './components/SideBar';

function App() {
  const [crypto,setCrypto] = useState('bitcoin')
  const [img,setImg] = useState('')
  const [name,setName] = useState('')
  const [symbol,setSymbol] = useState('')
  const [link,setLink] = useState('')
  const [eur,setEur] = useState('')
  const [usd,setUsd] = useState('')
  const [des,setDes] = useState('') 
  const [flag,setFlag] = useState(false) 
  
  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/${crypto}`;
    axios.get(url).then(res => {
      
      setImg(res.data.image.large);
      setName(res.data.name);
      setSymbol(res.data.symbol);
      setLink(res.data.links.homepage[0]);
      setEur(res.data.market_data.current_price.eur);
      setUsd(res.data.market_data.current_price.usd);
      setDes(JSON.stringify(res.data.description.en));
      setFlag(true)
    });
    setCrypto('')
  }, []);

  const handleSubmit = () => {
    const url = `https://api.coingecko.com/api/v3/coins/${crypto}`;
    axios.get(url).then(res => {
      setFlag(true)
      setImg(res.data.image.large);
      setName(res.data.name);
      setSymbol(res.data.symbol);
      setLink(res.data.links.homepage[0]);
      setEur(res.data.market_data.current_price.eur);
      setUsd(res.data.market_data.current_price.usd);
      setDes(JSON.stringify(res.data.description.en))
    })
    setCrypto('')
  }
  
  
  


  const createMarkup = () => {
    return {__html:des}
  }

  return (
    <div className="App">
      <SideBar />
      <h1 className='title'>
        CryptoCurrency Search
      </h1>
      <div className='search'>
        <input 
          type='text' 
          value={crypto} 
          onChange={(e)=>setCrypto(e.target.value)}
          placeholder='Enter the name of Crypto'
          required 
        />
      </div>
      <button onClick={handleSubmit} type='submit' className='btn'>Submit</button>
      {flag && <div className='container'>
        <div className='crypto-info'>
          <img src={img} alt='crypto' width='150' />
          <br />
          <h1 className='crypto-title'>{name}</h1>
          <h2>{symbol}</h2>
          <h2><a className='link' href={link}>{link}</a></h2>
          <br />
          <h2>Euro Price : <i className='fas fa-euro-sign' />{eur}</h2>
          <h2>USD Price : <i className='fas fa-dollar-sign' />{usd}</h2>
        </div>
        <div className='des'>
          <div  dangerouslySetInnerHTML={createMarkup()}>
          
          </div>
          
        </div>
      </div> }
    </div>
  );
}

export default App;
