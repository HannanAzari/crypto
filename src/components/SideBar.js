import React, { useEffect, useState } from 'react'
import './sideBar.css'

const SideBar = () => {
    const [query, setQuery] = useState([])
    useEffect(()=> {
        fetch('https://lunarcrush.com/api3/coins/list', {
          headers: {
              'Authorization': 'Bearer <TOKEN>'
          }
        }).then(res => res.json())
        .then(data => {
          const items = data.data.slice(0, 100)
          setQuery(items)
          console.log(query)
        });
      }, [])

  return (
    <div className='side-bar'>

        <div className='list' >
            <div>
                <h2>TOP 100 COINS</h2>
                <hr />
            </div>
            

        </div>

        {query.map(item => {
                return (
                    <div className='list-item' key={item.id}>
    
                        <div>
                            <h3>{item.id}-{item.symbol}</h3>
                        </div>
                        <div>
                            <img src={item.logo} alt={item.name} width='30px' height='30px' />
                        </div>
                        <div>
                            <h3>{item.name}</h3>
                        </div>
                
                    </div>
                )
            })}
                    
        
    </div>
  )
}

export default SideBar