
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { updatePos,updateCurrPo } from '../redux/reducer'
import RecentList from './RecentList'



export const Dashboard = (props) => {

    const [po,setPoList] = useState([])
    const [newPo,setNewPo] =useState('')
    const [hidden, setHidden] = useState('hidden')

    
    useEffect(()=>{
        axios.get('/api/getpolist').then(res=>{
            props.updatePos(res.data)
            setPoList(res.data)
        })
    },[])
   const recentPo = po.map((po,i)=>{
       return(
        <RecentList so={po} key={i}/>
       )
      })
  
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('/api/checkpo',{po:newPo}).then(res=>{
            if(res.data == false){
                props.updateCurrPo(newPo)
                props.history.push('/builder')
            }else if(res.data == true){
                setHidden('alertDiv')
            }
        })
    }
    
    return (
        <div>
            <div className='dashMain'>
                <div className='leftDiv'>
                    <button onClick={(e)=>{props.history.push('/posearch')}}>Search</button>
                    <h2>
                        Recent SO's
                    </h2>
                    
                    {recentPo}
                </div>
                <div className='rightDiv'>
                    <form className='inputContainer' onSubmit={handleSubmit}>
                    <h1>Scan SO</h1>
                    <input 
                    autoFocus
                    value={newPo}
                    onChange={e=>setNewPo(e.target.value)}
                    />
                    </form>
                </div>
                <div className='space'>
                    <button onClick={()=>props.history.push('/printlist')}>Print Serial Number List</button>
                    <button onClick={()=>props.history.push('/download')}>Download Excel</button>
                </div>
            </div>
            <div className={hidden} >
                    <h1>Sales Order Exists</h1>
                    <h3>Would you like to edit?</h3>
                    <div>
                    <button onClick={()=>{
                    setHidden('hidden')}} className='button1'>Cancel</button>
                    <button className='button2' onClick={()=>{
                                        props.updateCurrPo(newPo)
                                        props.history.push('/builder')
                    }} >Edit</button>
                    </div>
            </div>
          
        </div>
    )
}

function mapStateToProps(state){
    return state
}


export default connect(mapStateToProps,{updatePos,updateCurrPo})(Dashboard)
