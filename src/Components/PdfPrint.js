import React from 'react'
import BarcodeGenerator from './BarcodeGenerator';
import { PdfExport, useGeneratePdf } from '@garage-panda/react-pdf-export';



export default function PdfPrint({list}) {

    const { generatePdf, containerRef } = useGeneratePdf();

    // console.log(list)
    let printList = list.map((item,i)=>{
        // console.log(item)
        let part = 3
        return (
            <div key={i} 
            style={{
                'width': '60vw',
                'display': 'block',
                'justifyContent': 'center',
                'flexDirection': 'column',
                'marginTop': '1vh'
            }}
            >
                <h2 style={{'marginLeft': '150px'}} ><u>{item.sku}</u></h2>
                <ul style={{
                    'marginLeft': '150px'
                }} >
                  
                    {item.list.map(part=>{
                        part.parts = eval(part.parts)
                        // console.log(part.parts)
                        return part.parts.map((unit,i) =>{
                            return (
                        
                                <li
                                    style={{
                                        'width': '25vw',
                                        'display': 'flex',
                                        'flexDirection': 'column',
                                        'justifyContent': 'center',
                                        'textAlign': 'center',
                                        'pageBreakInside': 'avoid'
                                    }}
                                >
                                   <BarcodeGenerator data={unit.serial_number} index={i}/>

                                <div
                                        style={{
                                        'display': 'flex',
                                        'justifyContent': 'space-evenly',
                                        'textAlign': 'center',
                                        'width': '30vw',
                                        }}
                                    >
                                        <h4>{unit.model}:</h4>
                                        <h4>{unit.serial_number}</h4>
                                    </div>
                                </li>
                            )
                        })
                        
                    })}
                </ul>

            </div>
        )
    })

    return (
        <div className='pdfcontainer'>
            <button onClick={generatePdf}>Print</button>
            <PdfExport containerRef={containerRef} className='pdf' >
                
                {printList}

            </PdfExport>
        </div>
        
    )
}