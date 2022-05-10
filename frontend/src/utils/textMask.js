import React from "react";
import InputMask from 'react-input-mask';

export const CpfMask = (props) =>{
  return(
    <InputMask
      {...props}
      mask="999.999.999-99"
      maskChar={null}
    />
  )
}