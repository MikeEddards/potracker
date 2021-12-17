import React ,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import EditElement from './EditElement'
import axios from 'axios'
import SkuDelete from './SkuDelete'


export default function SkuListGenerator({item,newList}) {

    const [isActive, setActive] = useState(false)
    const [deleteAlert, setDeleteAlert] = useState('hidden')
    // model: "CR2701-100-XXX"
    // serial_number: "20246821"

  
    const partList = item.list.map(unit=>{
        // 9859
     
        unit.parts = eval(unit.parts)
        return (    
            <div className='skuListContainer'>
                <h4>Line: {unit.line}</h4>
            <li className='skuListLi'>
                
                {
                    unit.parts.map(part=>{
                     
                        return (
                            <div className='model' >
                                <div className='first'>
                                <strong> Model: </strong> {part.model}
                                </div>
                                <div className='second'>
                                <strong> Serial Number:</strong> {part.serial_number}
                                </div>
                            </div>
                        )
                    })
                }
            </li>
            <div >
                <SkuDelete id={unit.id} po={unit.po} newList={newList} />
            </div>    
           
            </div>
        )
    })



    return (
        <div >
          <h4 onClick={()=>{setActive(!isActive)}} >
             SKU: {item.sku} Amount: {item.list.length}
          </h4>
          <ul>
              {isActive ? partList:null}
          </ul>
        </div>
    )
}
