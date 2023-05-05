import React, { memo, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const [inputval, setval] = useState('');
    const [results, setResults] = useState([]);

    const handlechange = (event) => {

        setval(event.target.value);

    }
    const getval = async (event) => {
        event.preventDefault();
        const url = `https://api.unsplash.com/search/photos?query=${inputval}&client_id=Jhbq_p0lX5TQ3GefLzACyCDEf4QrBHHCzQTexIl4T4E`;
        const response = await axios.get(url);
      
        for (let i = 0; i < response.data.results.length; i++) {

            // setResults(response.data.results[i].urls.thumb);
            setResults(prevResults => [...prevResults, response.data.results[i]]);


        }
       
        
    }



    return (
        <>
            <header>
                <p>My name is: anish kumar</p>
                <p>My email is : kumaranish0815@gmail.com</p>
            </header>
            <div className='inputboxcontainer'>
                <div className='inputsub'>
                    <input type='text' placeholder='search image' value={inputval} onChange={handlechange} /><AiOutlineSearch onClick={getval} />
                </div>
            </div>



            <div className='container' style={{ marginTop: "40px",marginBottom:"40px" }}>
                <div className='row mt-4'>
                    {
                        results.map((data) => {
                            return (
                                <div className='col-md-3 col-lg-3 col-xl-3 col-sm-12 mt-4' key={data.id}>
                                    <div className="card" style={{ width: "15rem" }}>
                                        <img className="card-img-top" src={data.urls.thumb} alt="Card image cap" />
                                        <div className="card-body">
                                         <Link to={`/add-captions/${data.id}`} className="btn btn-primary btn-block" style={{width:"100%"}}>Add Captions</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
                      


        </>
    )
}

export default memo(Header)
