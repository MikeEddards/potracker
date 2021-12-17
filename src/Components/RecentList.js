import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateCurrPo } from '../redux/reducer'
import { useHistory} from 'react-router-dom'

export function RecentList(props) {
    const history = useHistory()
    const [isActive, setIsActive] = useState(false)
    
    return (
        <div>
            <h3  onClick={()=>{
                setIsActive(!isActive)}}
                style={{cursor: "pointer"}}
                >{props.so.po}</h3>
            {isActive ? 
            <div className="soList">
                <button className="button1"
                onClick={()=>{
                    props.updateCurrPo(props.so.po)
                    history.push('/builder')

                }}
                >Edit</button>
                <button onClick={()=>{
                setIsActive(!isActive)}}>Cancel</button>
            </div>:null}
        </div>
    )
}
function mapStateToProps(state){
    return state
}


export default connect(mapStateToProps,{updateCurrPo})(RecentList)