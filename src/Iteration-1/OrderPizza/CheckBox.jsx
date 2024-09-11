

export default function Checkbox(props) {
    const {id,onChange} = props;
   return (<> 
   <input type="checkbox" id={id} name={id} value={id} onChange={onChange}/>
   <label htmlFor={id}>{id.charAt(0).toUpperCase() +""+ id.slice(1,id.length)}</label> 
  </>)
}