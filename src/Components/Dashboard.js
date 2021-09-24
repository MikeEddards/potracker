
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { updatePos,updateCurrPo } from '../redux/reducer'



export const Dashboard = (props) => {
    const [po,setPoList] = useState([])
    const [newPo,setNewPo] =useState('')
    
    useEffect(()=>{
        axios.get('/api/getpolist').then(res=>{
            props.updatePos(res.data)
            setPoList(res.data)
        })
    },[])
   const recentPo = po.map(po=>{
       return(
        <div key={po.id}>
            <h3 >{po.po}</h3>
        </div>
       )
      })
    const handleSubmit = (e) =>{
        e.preventDefault()
        props.updateCurrPo(newPo)
        props.history.push('/builder')
    }

    return (
        <div>
            <div className='dashMain'>
                <div className='leftDiv'>
                    <h2>
                        Recent PO's
                    </h2>
                    {recentPo}
                </div>
                <div className='rightDiv'>
                    <form className='inputContainer' onSubmit={handleSubmit}>
                    <h1>Scan PO</h1>
                    <input 
                    autoFocus
                    value={newPo}
                    onChange={e=>setNewPo(e.target.value)}
                    />
                    </form>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return state
}


export default connect(mapStateToProps,{updatePos,updateCurrPo})(Dashboard)
