import React ,{useState} from 'react';
import axios from 'axios';
import './App.css';
import FormCompnent from './components/form'
import TableComp from './components/tabledata'

function App(){
    const [tabledata, settabledata] = useState([]);
    const [stackoverflowURL, setURL] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const formPost = async (data)=>{
        
        setLoading(true)
        try{
            var res = await axios.post("http://127.0.0.1:8000/api/v1/stackoverflow/",data)
            // console.log(res)
            setLoading(false)
            if(res.status === 200|| res.status===201)  {                
                if( res.data && res.data.success === 1 &&  res.data.data && res.data.data.items){
                    setURL(res.data.url)
                    settabledata(res.data.data.items)
                    
                }
                else{
                    setError('Issue: No data found ') 
                }
            }
            else{   
                if(!res.data){ console.log('response object not defined ')} 
                if(!res.data.success){ console.log('response.success object not defined ')}
                if(!res.data.data){ console.log('response.data object not defined ')}
                if(!res.data.data.items){ console.log('response.data.items object not defined ')}
                setError('Issue: No proper response ') 
            }
            
            
        }
        catch( err){
            console.log(err)
            setLoading(false);
            setError('Error: server not responding ') 
        }

        
    }


    return (
        <div className="container mt-3">
            <FormCompnent formPost={formPost} />
            <hr/>

            { 
                loading 
                ?
                <div>
                    <h3>Loading ...</h3>
                </div>
                :
                <div>
                    
                    {
                        error 
                        ?
                        <h3>{error}...</h3>
                        :
                        <div>
                            {
                                tabledata.length === 0
                                ?
                                <h3>No data found ...</h3>
                                :
                                <TableComp tableData={tabledata} url={stackoverflowURL}/>
                            }
                        </div>
                        
                        
                        
                    }
                </div>
          
            }
          
        </div>
    );
}

export default App;