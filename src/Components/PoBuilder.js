import React, {useState} from 'react'
import { connect } from 'react-redux'
import {updateSkuList} from '../redux/reducer'
import axios from 'axios'


export const PoBuilder = (props) => {
    const [sku,setSku] = useState('')
    const [skuSubmit, submitSku] = useState(false)
    const [parts,setParts] = useState([])
    const [input,setInput] = useState('')
    const [skuCountList, setSkuCount] = useState([])
    const [po,setPoFromGlobal] = useState(props.currentPo)

 


    const handleSkuSearch = (e) =>{
        e.preventDefault()
        setParts([])
        axios.post('/api/skusearch',{SKU:sku}).then(res =>{
            // console.log(res.data)
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
                    partNumber: part.Part,
                    scanned: false,
                    serialNumber: '',
                    group: type
                }])
            })
    })
    if(parts){
        submitSku(true)
    }
    
 
}
  async function serialNumberCheck(e){
       e.preventDefault()
       if((input.match(/^[0-9]{4}[0-9\x5f][0-9]{4}[A-Z]$/))||(input.match(/^[0-9]{9}[A-Z]{1}$/))){ //Battery
            parts.map((part,i)=>{
                if(part.group === 'Battery'){
                    if(!part.serialNumber){
                       let updateSn = [...parts]
                       updateSn[i].serialNumber = input     
                       updateSn[i].scanned = true                
                       setParts(updateSn)
                    }
                }
            })
            setInput('')
       }else if(input.match(/^[0-9]{4}[A-Z][0-9]{4}$/)){ // Charger-Base
        parts.map((part,i)=>{
            if(part.group === 'Charger'){
                if(!part.serialNumber){
                   let updateSn = [...parts]
                   updateSn[i].serialNumber = input     
                   updateSn[i].scanned = true                  
                   setParts(updateSn)
                }
            }
        })
        setInput('')
       }else if(input.match(/(^R|^5)/)){ // Modem
        parts.map((part,i)=>{
            if(part.group === 'Modem'){
                if(!part.serialNumber){
                   let updateSn = [...parts]
                   updateSn[i].serialNumber = input     
                   updateSn[i].scanned = true                  
                   setParts(updateSn)
                }
            }
        })
        setInput('')
       }else if(input.match(/^[0-9]{10}$/)){ //Sled
        parts.map((part,i)=>{
            if(part.group === 'Sled'){
                if(!part.serialNumber){
                   let updateSn = [...parts]
                   updateSn[i].serialNumber = input   
                   updateSn[i].scanned = true                    
                   setParts(updateSn)
                }
            }
        })
        setInput('')
       }if((input.match(/^[0-9]{10}/))||(input.match(/^[0-9]{8}/))){
           console.log('here')
        parts.map((part,i)=>{
            if(part.group === 'Reader'){
                if(!part.serialNumber){
                   let updateSn = [...parts]
                   updateSn[i].serialNumber = input   
                   updateSn[i].scanned = true                    
                   setParts(updateSn)
                }
            }
        })
        setInput('')
       }
       console.log('did')
    checkSkuFinish()
}
function checkSkuFinish(){
    let counter = 0
    parts.forEach(part=>{
        if(part.scanned && part.serialNumber){
            counter ++
        }
    })
    if(counter === parts.length){
        console.log('commplete')
        const toDbList = parts.map(part=>{
            return ({
                po: po,
                sku: sku,
                model: part.partNumber,
                serial_number: part.serialNumber
            })
        })
        toDbList.forEach(async (item)=>{
            axios.post('/api/addpo',item).then(res=>{
                props.updateSkuList([...props.skuList,{sku: sku, parts:toDbList}])
            }).catch(err=>{
                console.log(err)
            })
        })
        
        
        countSku()
        clearState()
    }
}
countSku()
function countSku(){
  let skuCountList = []
    props.skuList.forEach((part,i)=>{
        skuCountList.push(part.sku)
    })
    for(let i = 0; i < skuCountList.length;i++){

    }
    console.log(skuCountList)
}
// [
//     {
//         "CR2611-PKCMU": [
//             {
//                 "po": "555444",
//                 "sku": "CR2611-PKCMU",
//                 "model": "CR2611-XXX",
//                 "serial_number": "20246821"
//             },
//             {
//                 "po": "555444",
//                 "sku": "CR2611-PKCMU",
//                 "model": "CRA-A104-XXX",
//                 "serial_number": "1211K1340"
//             },
//             {
//                 "po": "555444",
//                 "sku": "CR2611-PKCMU",
//                 "model": "CRA-B5",
//                 "serial_number": "1687_1312D"
//             }
//         ]
//     },
//     {
//         "CR2611-PKCMU": [
//             {
//                 "po": "555444",
//                 "sku": "CR2611-PKCMU",
//                 "model": "CR2611-XXX",
//                 "serial_number": "20246821"
//             },
//             {
//                 "po": "555444",
//                 "sku": "CR2611-PKCMU",
//                 "model": "CRA-A104-XXX",
//                 "serial_number": "1211K1340"
//             },
//             {
//                 "po": "555444",
//                 "sku": "CR2611-PKCMU",
//                 "model": "CRA-B5",
//                 "serial_number": "1687_1312D"
//             }
//         ]
//     }
// ]
function clearState(){
    setSku('')
    submitSku(false)
    setParts([])
    setInput('')
}
// const [skuCountList, setSkuCount] = useState([])




const snList = parts.map((part,i)=>{
 
 return(
     <li key={i}>{part.group} {part.partNumber}: <strong>{part.serialNumber}</strong></li>
 )
})
console.log(props)
    // CR2611-PKCXA  1687_1312D test sku
    // console.log(snList)
    return (
        <div className='builder' >
            <div className='skulist' >
                <h2>PO #{po}</h2>
                <h3>sku placeholder</h3>
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
                    </form>

                    :
                    <form onSubmit={handleSkuSearch} >
                        <h2>Scan SKU</h2>
                        <input
                            autoFocus
                            value={sku}
                            onChange={e=>setSku(e.target.value)}
                        />
                    </form>
                }
            </div>
            <button>Finish PO</button>
        </div>
    )
}

function mapStateToProps(state){
    return state
}



export default connect(mapStateToProps,{updateSkuList})(PoBuilder)
