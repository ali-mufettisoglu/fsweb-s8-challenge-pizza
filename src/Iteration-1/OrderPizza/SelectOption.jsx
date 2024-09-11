

export default function SelectOption(props) {
    const {value} = props;
    return (<option value={value}>{value.charAt(0).toUpperCase() +""+ value.slice(1,value.length)}</option>)
}