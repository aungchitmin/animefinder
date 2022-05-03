function Boxes(props) {
  const styles = {
      border: props.on ? "4px solid #ffeb3b" : ""
  }
 
  return (
    <div>
        <div className="box" style={styles} onClick={() => props.toggle()}>{props.title}</div>
    </div>
  )
}

export default Boxes