import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import "./OrderPizza.css";
import axios from "axios";
import {
  FormFeedback,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
} from "reactstrap";
import Boyut from "./Boyut";
import HamurTipi from "./HamurTipi";
import Malzemeler from "./Malzemeler";

const initialForm = {
  isim: "Position Absolute Acı Pizza",
  boyut: "",
  hamur: "",
  malzemeler: [],
  siparisNotu: "",
  malzemelerFiyat: 0,
  toplamFiyat: 0,
  adet: 0,
};

export default function OrderPizza() {
  const [siparisSayisi, setSiparisSayisi] = useState(0);
  const [toplamFiyat, setToplamFiyat] = useState(0);
  const [malzemeler, setmalzemeler] = useState([]);
  const [malzemelerFiyat, setmalzemelerFiyat] = useState(0);
  const [hizliTeslimat, setHizliTeslimat] = useState(0);

  const [form, setForm] = useState(initialForm);

  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    checkbox: false,
    boyut: false,
    hamur: false,
    adet: false,
  });

  const malzemelerList = [
    "pepperoni",
    "sosis",
    "kanada Jambonu",
    "tavuk Izgara",
    "soğan",
    "domates",
    "mısır",
    "sucuk",
    "jalepeno",
    "sarımsak",
    "biber",
    "ananas",
    "kabak",
  ];

  const boyutList = ["Küçük", "Orta", "Büyük"];
  const hamurTipi = ["İnce", "Orta", "Kalın"];

  const { push } = useHistory();

  useEffect(() => {
    if (
      form.malzemeler.length < 4 ||
      form.malzemeler.length > 10 ||
      form.hamur === "" ||
      form.boyut === "" ||
      form.adet === 0
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [form]);

  useEffect(() => {
    setToplamFiyat(85.5 * siparisSayisi + malzemelerFiyat + hizliTeslimat);
    setForm({
      ...form,
      ["adet"]: siparisSayisi,
      ["malzemelerFiyat"]: malzemelerFiyat,
      ["toplamFiyat"]: 85.5 * siparisSayisi + malzemelerFiyat + hizliTeslimat,
    });
  }, [malzemelerFiyat, siparisSayisi, hizliTeslimat]);

  useEffect(() => {
    setForm({ ...form, ["malzemeler"]: malzemeler });
  }, [malzemeler]);

  const handleChange = (event) => {
    const { type, name, value, checked } = event.target;
    if (name === "checkbox") {
      if (checked) {
        setmalzemeler([...malzemeler, value]);
        setmalzemelerFiyat(malzemelerFiyat + 5);
      } else {
        const arr = malzemeler.filter((item) => item !== value);
        setmalzemeler(arr);
        setmalzemelerFiyat(malzemelerFiyat - 5);
      }
    } else if (name === "teslimat") {
      if (checked) {
        setHizliTeslimat(hizliTeslimat + 50);
      } else {
        setHizliTeslimat(hizliTeslimat - 50);
      }
    } else {
      setForm({ ...form, [name]: value });
      if (name === "hamur" || name === "boyut") {
        value
          ? setErrors({ ...errors, [name]: false })
          : setErrors({ ...errors, [name]: true });
      }
    }
  };

  const increment = () => {
    setSiparisSayisi(siparisSayisi + 1);
  };
  const decrement = () => {
    if (siparisSayisi === 0) {
      return;
    }
    setSiparisSayisi(siparisSayisi - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/pizza", form)
      .then(function (response) {
        console.log(response.data);
        push("/success");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
        <div className="content">
        <Form onSubmit={handleSubmit}>
          <h6>Position Absolute Acı Pizza</h6>
          <div className="prices">
            <h4>85.50₺</h4>
            <div>
              <FormText>4.9</FormText>
              <FormText>(200)</FormText>
            </div>
          </div>
          <FormText>
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza,domates,peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenli lezzetli bir yemektir... Küçük bir pizzaya bazen pizzetta
            denir.
          </FormText>
          <div className="middle-up">
            <section>
              <h6>
                Boyut Seç <span style={{ color: "red" }}>*</span>
              </h6>
              <div>
                <Boyut
                  list={boyutList}
                  onChange={handleChange}
                  error={errors.boyut}
                />
              </div>
            </section>
            <section>
              <h6>
                {" "}
                Hamur Seç <span style={{ color: "red" }}>*</span>
              </h6>
              <div>
                <HamurTipi
                  hamurTipi={hamurTipi}
                  onChange={handleChange}
                  error={errors.hamur}
                />
              </div>
            </section>
          </div>
          <div className="middle-down">
            <h6>Ek Malzemeler</h6>
            <FormText>En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺</FormText>
            <h6></h6>
            <div className="middle-down-mlz">
              <Malzemeler
                malzemeler={malzemelerList}
                onChange={handleChange}
                error={errors.checkbox}
              />
            </div>
          </div>
          <div className="siparis-notu">
            <h6>Sipariş Notu</h6>
            <input
              className="form-control form-control-lg"
              name="siparisNotu"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              onChange={handleChange}
              data-testid="siparisNotu"
            />
            <div className="teslimat">
              <h6>Hızlı Teslimat ? (50₺)</h6>
              <Input
                type="checkbox"
                name="teslimat"
                id="hizli-teslimat"
                onChange={handleChange}
              />
              <span htmlFor="teslimat"> Evet</span>
            </div>
          </div>
          <hr />
          <div className="bottom-siparis">
            <div>
              <Button color="warning" type="button" onClick={decrement}>
                -
              </Button>
              <span> {siparisSayisi} </span>
              <Button color="warning" type="button" onClick={increment} data-testid="inc-Button">
                +
              </Button>
            </div>
            <div className="bottom-siparis-toplam">
              <h6>Sipariş Toplamı</h6>
              <span>
                Seçimler{" "}
                <span style={{ float: "right" }}>{malzemelerFiyat} ₺</span>
              </span>
              <span>
                Toplam <span style={{ float: "right" }}>{toplamFiyat} ₺</span>
              </span>
              <Button color="warning" data-testid="button" disabled={!isValid}>
                Sipariş Ver
              </Button>
            </div>
          </div>
          </Form>
        </div>
      
    </>
  );
}
