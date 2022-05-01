import {useState, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons"

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    //show button when page is scrolled upto given distance
    const toggleVisibility = () => {
      if(window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false)
      }
    }

    //set the top cordinate to 0
    //make scrolling smooth
    const scrollTop = () => {
      window.scrollTo(
        {
          top: 0,
          behavior: "smooth"
        }
      )
    }
    
    useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
    }, [])

  return (
    <>
      {isVisible && 
        <div className="scrolltop" onClick={scrollTop}>
          <FontAwesomeIcon icon={faAnglesUp} className='icon'/>
        </div>}
    </>
  )
}

export default ScrollToTop