import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import PdfPrint from './PdfPrint'



export default function PrintList() {

    const [soInput,setSoInput] = useState('')
    const [soList,setSoList] = useState([])
    const [hidden, setHidden] = useState('hidden')
    const [serverList, setServerList] = useState([])
    const [parsedList, setParsedList] = useState([])



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
async function  handlePrint(){
 
    let list = []
        for(const so of soList){
           await axios.post('/api/getpo',{po:so}).then(res=>{
                list = list.concat(res.data)              
            })
        }

        console.log(list)
         setServerList(list) 
        listParser(serverList)
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

    return (
        <div>
        <div className='soPrintContainer'>
            <div className='inputdiv'>
                <h2>Enter one or more SO's to Print</h2>
                <form onSubmit={handleSubmit} >
                <input autoFocus onChange={e=>setSoInput(e.target.value)} value={soInput} />
                    <ul>
                        {soList.length ? soList.map(so=>{return(<li key={so}>{so}</li>)}):null}
                    </ul>
                </form>
                {soList.length ? <div><button onClick={handlePrint}>Generate PDF</button> <button onClick={()=>{
                    setSoList([])
                    setParsedList([])
                    setServerList([])
                }}>Clear List</button></div> : null}
                

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
        {parsedList.length? <PdfPrint list={parsedList} />:null}
        
 </div>
    )
}
