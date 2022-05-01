function Boxes(props) {
  const styles = {
      border: props.on ? "3px solid #b9ff0a" : ""
  }
 
  return (
    <div>
        <div className="box" style={styles} onClick={() => props.toggle()}>{props.title}</div>
    </div>
  )
}

export default Boxes