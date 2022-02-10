import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { DownloadExcel } from "react-excel-export";

export default function Download() {
    const [soInput,setSoInput] = useState('')
    const [soList,setSoList] = useState([])
    const [hidden, setHidden] = useState('hidden')
    const [serverList, setServerList] = useState([])
    const [parsedList, setParsedList] = useState([])
    const [generate, setGenerate] = useState(false)
    const [data, setData] = useState([])



    useEffect(()=>{
        listParser(serverList)
        
    },[serverList])
 
    


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/checkpo',{po:soInput}).then(res=>{
            if(res.data == false){
                setHidden('alertDiv')
            }else if(res.data == true){
                let updateList = [...soList,soInput]
                setSoList(updateList)
                setSoInput('')
            }
        })
    }
async function  handleGenerate(){
    // so, line, sku, scan
  
    let list = []
        for(const so of soList){
           await axios.post('/api/getpo',{po:so}).then(res=>{
                list = list.concat(res.data)              
            })
        }
        setGenerate(true)

        let dataList = list.map(item =>{
            return {
                SO: item.po,
                Line: item.line,
                SKU: item.sku,
                Scan: eval(item.parts).map(unit=>{
                    return   `model: ${unit.model}, serial_number: ${unit.serial_number} `
                }).join()
                }
        })
    
        setData(dataList)
    }
    


    const listParser = (list) =>{
        let count = 0
        let holder = []
        let found = false
 
        list.forEach(skuList=>{

                holder.forEach(unit=>{
                    if(skuList.sku === unit.sku){
                        unit.list = [...unit.list,skuList]
                        found = true
                    }
                })
                if(!found){
                    holder.push({sku: skuList.sku, list: [skuList]})
                }
                found = false
           
        })
            holder.map(item=>{
            count = count + item.list.length
         
        })


        setParsedList(holder)

    }
    // const date = new Date(Date.now()).toDateString()

    return (
        <div>
        <div className='soPrintContainer'>
            <div className='inputdiv'>
                <h2>Enter one or more SO's to export</h2>
                <form onSubmit={handleSubmit} >
                <input autoFocus onChange={e=>setSoInput(e.target.value)} value={soInput} />
                    <ul>
                        {soList.length ? soList.map(so=>{return(<li key={so}>{so}</li>)}):null}
                    </ul>
                </form>
                {soList.length ? <div><button onClick={handleGenerate}>Generate</button> <button onClick={()=>{
                    setSoList([])
                    setParsedList([])
                    setServerList([])
                }}>Clear List</button></div> : null}
                {generate? 
                <DownloadExcel 
                    data={data}
                    fileName={new Date(Date.now()).toDateString()}
                />:null}
            

            </div>
            
        </div>
         <div className={hidden} >
         <h1>Sales Order Doesn't Exist</h1>
         <div>
         <button className='button2' onClick={()=>{
            setHidden('hidden')
            setSoInput('')
         }} >Okay</button>
         </div>
        </div>
        {/* {parsedList.length? <PdfPrint list={parsedList} />:null} */}
        
 </div>
    )
}
