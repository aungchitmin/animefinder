//for genre box selection with v4
function AnimeCard({anime}) {
  const styles = {
    width: "180px",
    height: "250px",
    borderRadius: "15px 15px 0 0",
    border: "1px solid #0f0f0f"
}
  return (
      <div className="animecard">
          <a href={anime.url} target='_blank' rel="noreferrer"><img src={anime.images.webp.image_url} alt="animeImage" style={styles} /></a>
          <h4 className="animetitle">{anime.title}</h4>
      </div>
  )
}
export default AnimeCard