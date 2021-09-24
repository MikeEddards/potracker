import React, {useState} from 'react'
import { connect } from 'react-redux'

export const PoBuilder = (props) => {
    const [sku,setSku] = useState('')
    const [parts,setParts] = useState([])
    const [input,setInput] = useState('')
    console.log(props)


    const handleSkuSearch=(e)=>{

    }

    return (
        <div className='builder' >
            <div className='skulist' >
                <h2>PO #{props.currentPo}</h2>

            </div>
            <div className='currentsku' >
                {sku? 
                    <form>
                        <h2>Scan serial number</h2>
                        <input
                            autoFocus

                        />
                    </form>
                    :
                    <form onSubmit={handleSkuSearch} >
                        <h2>Scan SKU</h2>
                        <input
                            autoFocus

                        />
                    </form>
                }
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return state
}



export default connect(mapStateToProps)(PoBuilder)
