import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function EditElement({unit}) {
   
    const [hidden, setHidden] = useState('hidden')
    const [list,setList] = useState(unit)

    console.log(list)
    function handleSave(){

    }

    return (
        <div >
            <FontAwesomeIcon className='editIcon' style={{marginLeft: "1rem"}} icon={faEdit} onClick={()=>{
            setHidden('alertEdit')
            }}/>
            <div className={hidden}>
                
                <div className='editSoDiv'>
                <h2>SO:</h2>
                <h3>{unit.po}</h3>
                <input placeholder={unit.po} />
                </div>
                <div className='editPartsDiv'>
                <h2>Parts:</h2>
                <ul>{unit.parts.map(part=>{return (
                    
                    <li>
                        <h3>Model: {part.model} Serial Number: {part.serial_number}</h3>
                        <div className='editInput'>
                            <input placeholder={part.serial_number} />
                        </div>
                    </li>
                    
                )})}</ul>
                </div>
                <div className='editButtonContainer'>
                <button className='button1' >Save</button>
                <button onClick={()=>{
                    setHidden('hidden')
                    }} >Cancel</button>
                <FontAwesomeIcon icon={faTrashAlt} size='2x' className='trash'/>
                </div>
            </div>  
            
        </div>
    )
}
