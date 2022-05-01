import {useState, useEffect} from "react"

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
          Top
        </div>}
    </>
  )
}

export default ScrollToTop