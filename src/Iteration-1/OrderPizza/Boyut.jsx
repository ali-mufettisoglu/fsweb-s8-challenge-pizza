import {
    FormFeedback,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";

export default function Boyut(props) {
  const { list, onChange,error } = props;

  return (
    <>
    <FormGroup >
      {list.map((item) => (
        <div key={item}>
          <Input
            type="radio"
            name="boyut"
            value={item}
            onChange={onChange}
            data-testid={item + "radio"}
            invalid={error}
          />
          <Label htmlFor={item}>{item}</Label>
          <FormFeedback>Seçiminizi yapınız</FormFeedback>
        </div>
      ))}
      </FormGroup>
    </>
  );
}
