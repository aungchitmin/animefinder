import {useState} from 'react';
import Search from './components/Search';
import Boxes from './components/Boxes';
import Boxresult from './components/Boxresult';
import data from './data';
import AnimeCard1 from "./components/AnimeCard1"
import AnimeCard2 from "./components/AnimeCard2"
import ScrollToTop from './components/ScrollToTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons'
const App = () => {
  const [search, setSearch] = useState("")
  const [animeList, setAnimeList] = useState([])
  const [genreData, setGenreData] = useState(data)
  const [newGenreData, setNewGenreData] = useState([])
  let genreArray = []
  let genreArrayString = ''
  const [genreAnime, setGenreAnime] = useState([])
  const [test, setTest] = useState([true, true])
  const [pageCount, setPageCount] = useState(1)
  const [genresearchcheck, setGenreSearchCheck] = useState('')
  
  //for search component, search button, fetching and flipper to show result
  function HandleSearch(e) {
    e.preventDefault();
    fetchAnime(search);
    setPageCount(prev => prev + 1)
    setTest([true, false])
  }

  //for genre search button, fetching and flipper
  function HandleGenre(e) {
    e.preventDefault();
    setGenreSearchCheck(genreArrayString)
    setPageCount(prev => prev + 1) //pagecount is increased but only prev value goes into fetchbyBoxes function
    fetchbyBoxes(genreArrayString, pageCount); //it somehow works but i don't know why the actual value is delayed
    setTest([false, true])
  }


  //api fetch for search button, searching by name
  const fetchAnime = async(query) => {
    const temp = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${query}
      &type="tv,movie"
      &order_by=title
      &sort=asc`)
    const data = await temp.json()
    
    //const re = new RegExp(query, 'gi')
    // const searchfilteredarray = data.results.filter(result => {
    //   if(re.test(result.title)) {
    //     return result;
    //   }
    //  }) //not ok with v3 titles because v3 search is unique,e.g typed AOT return anime but with japanese
    //title, v4 also sucks
    
    setAnimeList(data.results)
  }

  //api fetch for genre search button
  const fetchbyBoxes = async(query, pageCount) => {
    if(query) {
      const temp = await fetch(
        `https://api.jikan.moe/v4/anime?genres=${query}
        &order_by="members"
        &page=${pageCount}
        &type="tv"
        &sort=asc`)
      const data = await temp.json()
        //console.log(data)
    setGenreAnime(prev => {
      return genresearchcheck === query ? [...prev, ...data.data] : [...data.data]
    });
    } else {
      alert('Please select atleast one box')
      setPageCount(prev => prev - 1) //bcoz it increase whenever search btn is clicked
    }
  }
  
  //to add indicator around boxes and to show result boxes below
  function toggle(id, item) {
    setGenreData(prev => {
        return prev.map((item) => {
  
           if(item.id === id) {
             item.on = !item.on
              return item
           } else {
             return item
        }
      })})
    setNewGenreData(prev => { //i made this so that randomly chosen boxes will appear in order
      let test = [...prev]
      let test1 = []
      if(item.on) {
        test1 = [...test, item]
        return test1
      } else {
        const index = test.findIndex(obj => obj.id === item.id)
        test.splice(index, 1)
        test1 = test
        return test1
      }
  })
}
  //for genre boxes component array
  const allboxes = genreData.map(item => (
    <Boxes
          key={item.id}
          on={item.on}
          title={item.title}
          toggle={() => toggle(item.id, item)}
          />
  ))
  
  //for chosen boxes component array
  const chosenboxes = newGenreData.map(item => {
    if(item.on) {
      genreArray.push(item.mal_id)
      genreArrayString = genreArray.join(',')
    }
    return(
    <Boxresult
          key={item.id}
          item={item}
          />
    )
})
  
  //to show search by name results ,component
  const searchresult = animeList.map(anime => (
    <AnimeCard2
        anime={anime}
        key={anime.mal_id}
        />
    ))
    
  //to show search by genre results ,component
  const genreresult = genreAnime.length > 0 ? genreAnime.map(anime => (
    <AnimeCard1
        anime={anime}
        key={anime.mal_id} />
    )) : <p className='noresult'>Sorry, there is no matching result for your search. Please try again.</p>
   
  //i put this NoticeText at the very top and didnot work. it seems code flow is the key
  const NoticeText = <p className='notice'>
    {!genreArrayString && 'Note: only selecting up to four genres is recommended'}</p>
  return(
    <>
      <div className='main'>
        <h2 className='title'>Anime Series Finder</h2>
        <Search HandleSearch={HandleSearch}
                search={search}
                setSearch={setSearch}
                 />

        {NoticeText}
        <div className='allboxes'>
          {allboxes}
        </div>
        
        <h3 className='moodtext'>I am in the mood for...</h3>
        <div className='selectedpanel'>
          {chosenboxes}
        </div>
        <button className='genresearchbottom'type='button' onClick={HandleGenre}>Let's Gooo!!</button>
        <div className='allanimecards'>
          {!test[1] && searchresult}
          {!test[0] && genreresult}
        </div>
        <div>
          {genreresult.length > 0 && !test[0] && <button className='genresearchbottom' 
                                                          onClick={HandleGenre}>
                                                          Load More</button>}
        </div>
        <ScrollToTop />
        <div className='footer1'>
          <span>This App utilizes <a href='https://jikan.moe/'>Jikan API</a></span>
          <span>Inspired by <a href='https://animeflow.netlify.app/'>Anime Flow</a></span>
        </div>
        <div className='footer2'>
          <p>&copy; 2022 coded by ACM</p>
          <div>
          <a href='https://www.facebook.com/acmisacm/' target='_blank' rel='noreferrer' style={{color: "blue"}}>
            <FontAwesomeIcon icon={faFacebook} className='icon' /></a>
          <a href='https://github.com/aungchitmin' target='_blank' rel='noreferrer' style={{color: "black"}}>
            <FontAwesomeIcon icon={faGithub} className='icon' /></a>
          </div>
        </div>
      </div>
    </>
  )
}
export default App;