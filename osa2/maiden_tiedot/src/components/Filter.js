import React from 'react'

const FilterForm = ({filter, handler}) => {
  return(
    <div>
      find countries:<input 
        value={filter} 
        onChange={handler}
        />
    </div>  
  )
}

export default FilterForm