import React from 'react'

const FilterForm = ({filter, handler}) => {
  return(
    <div>
      filter shown contacts:<input 
        value={filter} 
        onChange={handler}
        />
    </div>  
  )
}

export default FilterForm