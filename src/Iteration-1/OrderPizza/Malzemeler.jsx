import {
    FormFeedback,
    FormText,
    Input,
    Label
  } from "reactstrap";

export default function Malzemeler(props) {
    const {malzemeler, onChange, error} = props

    return (
        malzemeler.map((item) => (
            <div key={item} id="checkbox">
              <Input
                type="checkbox"
                name="checkbox"
                value={item}
                onChange={onChange}
                data-testid={item}
                invalid={error}
              />
              <p htmlFor={item} style={{marginLeft: "0.5rem"}}>
                {item.charAt(0).toUpperCase() + "" + item.slice(1, item.length)}
              </p>
            </div>
          ))
    )
}