import {
    Input,
  } from "reactstrap";

export default function HamurTipi(props) {
    const {hamurTipi, onChange, error} = props
  return (
    <>
      <Input
        name="hamur"
        id="hamur"
        type="select"
        onChange={onChange}
        data-testid="select"
        invalid={error}
      >
        <option value="">Hamur-Kalınlığı</option>
        {hamurTipi.map((item) => (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + "" + item.slice(1, item.length)}
          </option>
        ))}
      </Input>
    </>
  );
}
