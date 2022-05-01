function Search(props) {
  return (

      <div className="searchformsticky">
        <form className="searchform" onSubmit={props.HandleSearch}>
            <input className="search"
                type="search"
                placeholder="Search for an anime.."
                required
                value={props.search}
                onChange={e => props.setSearch(e.target.value)}
                 />
            <input type="submit" className="searchbotton" value="Search"></input>
        </form>
      </div>
  )
}

export default Search