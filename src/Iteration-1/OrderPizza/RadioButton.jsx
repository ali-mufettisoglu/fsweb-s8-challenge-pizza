export default function RadioButton(props) {
    const {id,value, onChange} = props;
  return (
      <div>
        <input type="radio" id={id} name="boyut" value={value} onChange={onChange}/>
        <label htmlFor={id}>{value}</label>
      </div>
  );
}
