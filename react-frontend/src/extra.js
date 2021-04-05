import React ,{useState} from 'react'


function TableComp({tableData}) {
    
    const TotalLength = tableData.length()
    const ItemPerPagination = 10
    const [Pagination, setPagination] = useState(1);
    // const [Totallength, setPagination] = useState(1);
    
    const reducePagination = ()=>{
        if(Pagination > 1){
            setPagination(Pagination-1)
        }
    }
    const addPagination = ()=>{
        if(TotalLength < Math.ceil(TotalLength/ItemPerPagination) ){
            setPagination(TotalLength+1)
        }
    }
    const selectPagination = (itm)=>{
        setPagination(itm)}
    }

    return (
        <div>
           
           <h3>Data from API</h3>
              
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                
                    <tr>
                        <td>July</td>
                        <td>Dooley</td>
                        <td>july@example.com</td>
                    </tr>
                </tbody>
            </table>
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" onClick={reducePagination} >Previous</button>
                </li>
                <li className={"page-item "+ Pagination== 1 ? "active" : ""}>
                    <button className="page-link" onClick={()=> selectPagination(1)} >1</button>
                </li>
                <li className={"page-item "+ Pagination== 2 ? "active" : ""}>
                    <button className="page-link" onClick={()=> selectPagination(2)} >2</button>
                </li>
                <li className={"page-item "+ Pagination== 3 ? "active" : ""}>
                    <button className="page-link" onClick={()=> selectPagination(2)} >3</button>
                </li>
                <li className="page-item">
                    <button className="page-link" onClick={addPagination}>Next</button>
                </li>
            </ul>
            
        </div>
    )
}

export default TableComp
