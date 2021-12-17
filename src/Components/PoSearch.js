import axios from 'axios'
import React, { useState }from 'react'
import SkuParser from './SkuParser'
import { useHistory} from 'react-router-dom'
import { updateCurrPo } from '../redux/reducer'
import { connect } from 'react-redux'

export  function PoSearch(props) {
    const [po,setPo] = useState('')
    const [list,setList] = useState([])
    const [serialNumber, setSerialNumber] = useState('')
    const [hidden, setHidden] = useState('hidden')
    const history = useHistory()
    const handlePoLookup = (e)=>{
        e.preventDefault()
        axios.post('/api/getpo',{po}).then(res=>{
           if(res.data == 'Not Listed'){
            setHidden('alertDiv')
           }else{

               let newData = res.data.map(unit =>{
                   unit.parts = eval(unit.parts)
                   return unit
               })
               setList(newData)
               setPo('')
           }
     })
    }
    const serialNumberSearch = (e) =>{
        e.preventDefault()
        // 1130041495
        axios.post('/api/snsearch',{sn:serialNumber}).then(res=>{
            // let newData = [...res.data]
            if(res.data == 'Not Listed'){
                setHidden('alertDiv')
            }else{

                let newData = res.data.map(unit =>{
                    unit.parts = eval(unit.parts)
                    return unit
                })
                setList(newData)
                setSerialNumber('')
            }
        })
    }

    return (
        <div className='poSearch'>
                       <div className='searchinput'>
                <form onSubmit={handlePoLookup}>
                    <input 
                    value={po}
                    onChange={e=>setPo(e.target.value)}
                    placeholder='Enter in Sales Order'/>
                </form>
                <h1>or</h1>
                <form onSubmit={serialNumberSearch} >
                    <input 
                    value={serialNumber}
                    onChange={e=>setSerialNumber(e.target.value)}
                    placeholder='Enter Serial Number'
                    />
                </form>
                
            </div>
            <div className='results'>
            
                <ul>
                <SkuParser skuList={list} />
                </ul>
                <div className='editButtons'>
                    {
                         
                         list.length ? <div>
                            <button onClick={()=>{
                                setList([])
                                }} >Cancel</button>
                            <button className='button1' onClick={()=>{
                                        props.updateCurrPo(list[0].po)
                                        history.push('/builder')
                    }} >Add to SO</button>
                        </div>:null
                    }

                </div>
            </div>
            
 
            
            <div className={hidden} >
                    <h1>Not Found</h1>
                    <div>
                    <button onClick={()=>{
                    setSerialNumber('')
                    setPo('')    
                    setHidden('hidden')}}>Okay</button>
                    </div>
            </div>
            
        </div>
    )
}
function mapStateToProps(state){
    return state
}


export default connect(mapStateToProps,{updateCurrPo})(PoSearch)