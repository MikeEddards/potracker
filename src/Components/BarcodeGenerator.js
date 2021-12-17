import React from 'react'
import { useBarcode } from 'react-barcodes'

export default function BarcodeGenerator({data, index}) {
    // console.log(data)
    const { inputRef } = useBarcode({
        value: data,
        format: "CODE39",
        
        options: {
          height: 25,
          background: '#ffffff',
          displayValue: false
        }
      });

      return <svg ref={inputRef} />;
}
