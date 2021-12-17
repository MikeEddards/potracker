import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function SkuDelete({id,po,newList}) {
    const [deleteAlert, setDeleteAlert] = useState('hidden')
    function handleDeleteButton(){
        setDeleteAlert('deleteAlert')
    }
    function deleteSku(id,po){
        axios.post('/api/deletesku',{id,po}).then(res=>{
            newList(res.data)
            setDeleteAlert('hidden')
        })
    }
    return (
        <div>
                 <FontAwesomeIcon icon={faTrash} size='1x' className='trash'   onClick={()=>handleDeleteButton()} />
                 <div className={deleteAlert} >
                    <h1>Delete SKU?</h1>
                    <div className='deleteButtons'>
                        <button onClick={()=> deleteSku(id,po)} >Confirm Delete</button>
                        <button className='button1' onClick={()=>setDeleteAlert('hidden')} >Cancel</button>
                    </div>
                </div>
        </div>
    )
}
