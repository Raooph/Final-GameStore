import "./Search-Box.css";
export const SearchBox=({searchTerm, setSearchTerm})=>{
    return(
        <div className="search-box">
            <input 
              type="text" 
              placeholder="Search for games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
    )
}