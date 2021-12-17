import React, {useState,useEffect,useDispatch} from 'react'
import { connect } from 'react-redux'
import {updateSkuList} from '../redux/reducer'
import axios from 'axios'
import SkuParser from './SkuParser'




export const PoBuilder = (props) => {
    const [sku,setSku] = useState('')
    const [skuSubmit, submitSku] = useState(false)
    const [parts,setParts] = useState([])
    const [input,setInput] = useState('')
    const [skuList, setSkuList] = useState([])
    const [po,setPoFromGlobal] = useState(props.currentPo)
    const [alert, setAlert] = useState(false)
    const [hidden, setHidden] = useState('hidden')
    const [line,setLine] = useState('')
    const [text,setText] = useState('')

    useEffect(() => {
        axios.post('/api/getpo',{po}).then(res=>{
            if(res.data == 'Not Listed'){
             return
            }else{
 
                let newData = res.data.map(unit =>{
                    unit.parts = eval(unit.parts)
                    return unit
                })
                setSkuList(newData)
            }
      })
    }, [])
    const handleSkuSearch = (e) =>{
        if(skuSubmit){
            return
        }
        e.preventDefault()
        setParts([])
        axios.post('/api/skusearch',{SKU:sku}).then(res =>{
            if(res.data === 'No SKU'){
                window.alert('Incorrect SKU')
                clearState()
            }else{
                res.data.forEach(part => {
                    let type = part.Group
                    if((type === 'CR2X')||(type ==='CR6X')||(type ==='CR5X')||(type ==='CR8X')||(type ==='CR9X')||(type ==='CR1X')){
                        type = 'Reader'
                    }else if(type === 'BTR'){
                        type = 'Battery'
                    }else if(type === 'MX'){
                        type = 'Modem'
                    }else if(type === 'CR7X'){
                        type = 'Sled'
                    }else if(type === 'CHR'){
                        type = 'Charger'
                    }
                    setParts(parts => [...parts,{
                        model: part.Part,
                        scanned: false,
                        serial_number: '',
                        group: type
                    }])
                })
            }
    })
    if(parts){
        submitSku(true)
    }
}

 function serialNumberCheck(e){
 
       e.preventDefault()
       if((input.match(/^[0-9]{4}[0-9\x5f][0-9]{4}[A-Z]$/))||(input.match(/^[0-9]{9}[A-Z]{1}$/))){ //Battery
            parts.map((part,i)=>{
                if(part.group === 'Battery'){
                    if(!part.serial_number){
                       let updateSn = [...parts]
                       updateSn[i].serial_number = input     
                       updateSn[i].scanned = true                
                       setParts(updateSn)
                    }
                }
            })
            setInput('')
       }else if(input.match(/^[0-9]{4}[A-Z][0-9]{4}$/)){ // Charger-Base
        parts.map((part,i)=>{
            if(part.group === 'Charger'){
                if(!part.serial_number){
                   let updateSn = [...parts]
                   updateSn[i].serial_number = input     
                   updateSn[i].scanned = true                  
                   setParts(updateSn)
                }
            }
        })
        setInput('')
       }else if(input.match(/(^R|^5)/)){ // Modem
        parts.map((part,i)=>{
            if(part.group === 'Modem'){
                if(!part.serial_number){
                   let updateSn = [...parts]
                   updateSn[i].serial_number = input     
                   updateSn[i].scanned = true                  
                   setParts(updateSn)
                }
            }
        })
        setInput('')
       }else if(input.match(/^[0-9]{10}$/)){ //Sled
        parts.map((part,i)=>{
            if(part.group === 'Sled'){
                if(!part.serial_number){
                   let updateSn = [...parts]
                   updateSn[i].serial_number = input   
                   updateSn[i].scanned = true                    
                   setParts(updateSn)
                }
            }
        })
        setInput('')
       }if((input.match(/^[0-9]{10}$/))||(input.match(/^[0-9]{8}$/))){   
        parts.map((part,i)=>{
            if(part.group === 'Reader'){
                if(!part.serial_number){
                   let updateSn = [...parts]
                   updateSn[i].serial_number = input   
                   updateSn[i].scanned = true                    
                   setParts(updateSn)
                }
            }
        })
        setInput('')
       }
    checkSkuFinish()
}
function checkSkuFinish(){
    let counter = 0
    parts.forEach(part=>{
        if(part.scanned && part.serial_number){
            counter ++
        }
    })
    if(counter === parts.length){
        const toDbList = parts.map(part=>{

            return ({
                model: part.model,
                serial_number: part.serial_number
            })
        })
        axios.post('/api/addpo',{
            "po": po,
            "sku": sku,
            "parts": toDbList,
            "line": line
        }).then(res=>{
       
            setSkuList([...skuList,{sku: sku, parts:parts,line:line}]) 
            clearState()
        })

      
    }
    
}

function clearState(){
    setSku('')
    submitSku(false)
    setParts([])
    setInput('')
    setLine()
}

function finishSo(){
    props.history.push('/')
}

const snList = parts.map((part,i)=>{
 return(
   
     
    <li style={{'display': 'flex'}} key={i}> {part.group}: {part.serial_number ? <h4 style={{'color':'gray'}} >    {part.model}:  </h4>:<h4 style={{'color':'red'}}>   {part.model}:  </h4>} <h4> <strong style={{'color':'gray','paddingLeft': '5px'}}>    {part.serial_number}</strong></h4></li>
   
 )
})


    const newList = (data) => {
        setSkuList(data)
    }


    return (
        <div className='builder' >
            <div className='skulist'  >
                <h2>SO #{po}</h2>
                <h2>Scanned SKU's</h2>
                <SkuParser  skuList={skuList} newList={newList} />
            </div>
            <div className='currentsku' >
                
                {skuSubmit? 
                    <form onSubmit={serialNumberCheck}>
                        <h2>Scan serial number</h2>
                        <input
                            autoFocus
                            value={input}
                            onChange={e=>setInput(e.target.value)}
                        />
                    <ul>
                        
                    {snList}
                    </ul>
                    <button onClick={handleSkuSearch} >Clear Serial Numbers</button>
                    </form>

                    :
                    <div>
                        
                        {line? <form onSubmit={(e)=>{
                            if(!skuSubmit){
                                handleSkuSearch(e)
                            }
                            }} >
                        <h2>Scan SKU</h2>
                        <input
                            autoFocus
                            value={sku}
                            onChange={e=>setSku(e.target.value)}
                        />
                    </form>:
                    <form onSubmit={e=>{
                        e.preventDefault()
                        setLine(text)
                        setText('')
                    }} >
                    <h2>Scan Line</h2>
                    <input
                        autoFocus
                        value={text}
                        onChange={e=>setText(e.target.value)}
                    />
                </form>
                    }
                    {line ?  <h4>Line Number: {line}</h4>:null}
                 
                    </div>
                }
            </div>
            <button onClick={()=>{
                setAlert(!alert)
                setHidden('alertDiv')}} >Finish SO</button>
              <div className={hidden} >
                    <h1>Are you finished with this sales order?</h1>
                    <div>
                    <button onClick={()=>{setAlert(!alert)
                    setHidden('hidden')}} className='button1'>Cancel</button>
                    <button className='button2' onClick={finishSo}>Finish SO</button>
                    </div>
                </div>
        </div>
    )
}

function mapStateToProps(state){
    return state
}



export default connect(mapStateToProps,{updateSkuList})(PoBuilder)
