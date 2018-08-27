import React from 'react'

const Search = (props) => {
    return(
    <form>
        <div>
            rajaa näytettäviä <input onChange={props.handleSearch} />
        </div>

    </form>
    )
}

export default Search