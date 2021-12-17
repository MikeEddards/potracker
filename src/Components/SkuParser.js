import React  from 'react'
import SkuListGenerator from "./SkuListGenerator"
export default function ({skuList, newList}){
        let count = 0
        let holder = []
        let found = false
      skuList.forEach(item=>{
            holder.forEach(unit=>{
                if(item.sku === unit.sku){
                    unit.list = [...unit.list,item]
                    found = true
                }
            })
            if(!found){
                holder.push({sku: item.sku, list: [item]})
            }
            found = false
        })
            holder.map(item=>{
            count = count + item.list.length
         
        })
        
        
        const skus = holder.map((item,i)=>{
            return (
                <SkuListGenerator item={item} skuList={skuList} newList={newList} index={i} />
            )
        })
        return (
            <div>
                <h4>Total Items: {count}</h4>
                <div className='sku'>
                {skus}
                </div>
            </div>
        )    
}