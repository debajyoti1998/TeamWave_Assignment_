import React ,{useState,useEffect} from 'react'


function TableComp({tableData ,url}) {

    
    
    const TotalLength = tableData.length;
    const ItemPerPagination = 10
    const [Pagination, setPagination] = useState(1);
    const [shownpagination, setShownpagination] = useState([]);
    const [CurrenttableItems, setCurrenttableItems] = useState([]);
   
    
    const reducePagination = ()=> {
        if(Pagination > 1){
            setPagination(Pagination-1)
        }
    }
    const addPagination = ()=> {
        if(Pagination < Math.ceil(TotalLength/ItemPerPagination) ){
            setPagination(TotalLength+1)
        }
    }
    const selectPagination = (itm)=>{
        setPagination(itm)
    }

    useEffect( () => {
        
        // -------------- pagination handling
        var temp_arry=[]
        var total_pag = Math.ceil(TotalLength/ItemPerPagination)
        if(total_pag>3 && Pagination >3){
            for(var i=Pagination-2 ;i<= Pagination ;i++){
                temp_arry.push(i)
            }
        }
        else{
            for(var j=1 ;j<= total_pag ;j++){
                temp_arry.push(j)
            }
        }
        setShownpagination(temp_arry)


        // -------------- table item handling 
        
        var tableContent=[]
        var maxItem = Pagination*ItemPerPagination
        var minItem = maxItem-ItemPerPagination+1
        

        for(var k= minItem ; k<= maxItem ;k++){
            if (k > TotalLength-1) { break; }
          
            tableContent.push({
                "q_id":tableData[k].question_id,
                "a_id":tableData[k].answer_id,
                "owner":tableData[k].owner.link,
                'accepted':tableData[k].is_accepted
            })
            
        }
        setCurrenttableItems(tableContent)

    }, [Pagination,TotalLength,tableData])
    

    return (
        <div>
           
           <h3>Data from API :</h3>
           <h6> URL : {url}</h6>
              
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Question ID</th>
                        <th>Answer ID</th>
                        <th>Owner</th>
                        <th>Accepted</th>
                    </tr>
                </thead>
                <tbody>
                    {CurrenttableItems.map( (v,index) =>{
                        return(
                        <tr key={'table-'+index}>
                            <td>{v.q_id}</td>
                            <td>{v.a_id}</td>
                            <td>{v.owner}</td>
                            <td>{v.accepted ? 'Yes' : 'No'}</td>
                        </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" onClick={reducePagination} >Previous</button>
                </li>
                {
                    shownpagination.map( v => {
                        return(
                            <li key={v} className={"page-item "+(Pagination=== v ? "active" : "")}>
                                <button className="page-link" onClick={()=> selectPagination(v)} > {v} </button>
                            </li>
                        )
                    })
                }
                {/* <li className={"page-item "+(Pagination=== 1 ? "active" : "")}>
                    <button className="page-link" onClick={()=> selectPagination(1)} >1</button>
                </li>
                <li className={"page-item "+ Pagination=== 2 ? "active" : ""}>
                    <button className="page-link" onClick={()=> selectPagination(2)} >2</button>
                </li>
                <li className={"page-item "+ Pagination=== 3 ? "active" : ""}>
                    <button className="page-link" onClick={()=> selectPagination(2)} >3</button>
                </li> */}
                <li className="page-item">
                    <button className="page-link" onClick={addPagination}>Next</button>
                </li>
            </ul>
            
        </div>
    )
}

export default TableComp
