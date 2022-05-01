//for v3 search bar
function AnimeCard({anime}) {
    const styles = {
        width: "180px",
        height: "250px",
        borderRadius: "15px 15px 0 0",
        border: "1px solid #0f0f0f"
    }
    return (
        <div className="animecard">
            <a href={anime.url} target='_blank' rel="noreferrer"><img src={anime.image_url} alt="animeImage" style={styles} /></a>
            <div className="animetitle">{anime.title}</div>
        </div>
    )
  }
  export default AnimeCard