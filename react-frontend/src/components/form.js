import React ,{useState} from 'react'


function FormCompnent({formPost}) {
    const [Page, setPage] = useState("");
    const [Pagesize, setPagesize] = useState("");
    const [Fromdate, setFromdate] = useState("");
    const [Todate, setTodate] = useState("");
    const [OrderValue, setOrderValue] = useState("desc");
    const [MinDate, setMinDate] = useState("");
    const [MaxDate, setMaxDate] = useState("");
    const [SortValue, setSortValue] = useState("activity");
    
    const FormonSubmit = (e) =>{
        e.preventDefault();
        let post_data={}
        
        if(Page!=='') {post_data['page'] = Page }
        if(Pagesize!=='') {post_data['pagesize'] = Pagesize }
        if(Fromdate!=='') {post_data['fromdate'] = Fromdate }
        if(Todate!=='') {post_data['todate'] = Todate }
        post_data['order'] = OrderValue 
        if(MinDate!=='') {post_data['min'] = MinDate }
        if(MaxDate!=='') {post_data['max'] = MaxDate }
        post_data['sort'] = SortValue 

        formPost(post_data)
    }

    return (
        <div>
            <form onSubmit={e => FormonSubmit(e)}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Page</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Page" value={Page} onChange={e => setPage(e.target.value)}/>
                        </div>
                    </div>
                    
                    <div className="col-sm-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Pagesize</span>
                            </div>
                            <input type="text" className="form-control" placeholder="pagesize" value={Pagesize} onChange={e => setPagesize(e.target.value)}/>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Fromdate</span>
                            </div>
                            <input type="date" className="form-control" placeholder="fromdate" value={Fromdate} onChange={e => setFromdate(e.target.value)}/>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Todate</span>
                            </div>
                            <input type="date" className="form-control" placeholder="todate" value={Todate} onChange={e => setTodate(e.target.value)} />
                        </div>
                    </div>

                    
                    <div className="col-sm-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Order</span>
                            </div>
                            <select className="form-control" value={OrderValue} onChange={e => setOrderValue(e.target.value)}>
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                    </div>


                    <div className="col-sm-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Min</span>
                            </div>
                            <input type="date" className="form-control" placeholder="min" value={MinDate} onChange={e => setMinDate(e.target.value)}/>
                        </div>
                    </div>


                    <div className="col-sm-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Max</span>
                            </div>
                            <input type="date" className="form-control" placeholder="max" value={MaxDate} onChange={e => setMaxDate(e.target.value)}/>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Sort</span>
                            </div>
                            <select className="form-control" value={SortValue} onChange={e => setSortValue(e.target.value)}>
                                <option value="activity">Activity</option>
                                <option value="votes">Votes</option>
                                <option value="creation">Creation</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-sm-12">
                        <div style={{textAlign: 'right'}}>
                            <button type="submit" className="btn btn-outline-success"> Submit</button>
                        </div>
                        
                    </div>

                </div>
                

                
            </form>
            
        </div>
    )
}

export default FormCompnent
