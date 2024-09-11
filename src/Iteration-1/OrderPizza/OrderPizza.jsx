import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import RadioButton from "./RadioButton";
import SelectOption from "./SelectOption";
import Checkbox from "./Checkbox";
import Header from "./Header";
import "./OrderPizza.css";
import axios from "axios";

export default function OrderPizza() {
  const [siparisSayisi, setSiparisSayisi] = useState(1);
  const [toplamFiyat, setToplamFiyat] = useState(0);
  const [siparisNotu, setsiparisNotu] = useState("");
  const [malzemeler, setmalzemeler] = useState([]);
  const [malzemelerFiyat, setmalzemelerFiyat] = useState(0);
  const [hamurTipi, setHamurTipi] = useState("");
  const [boyut, setBoyut] = useState("");

  const { push } = useHistory();

  useEffect(() => {
    setToplamFiyat(85.5 * siparisSayisi + malzemelerFiyat);
  }, [malzemelerFiyat, siparisSayisi]);

  const handleChange = (event) => {
    const { type, id, value, checked } = event.target;
    if (type === "textarea") {
      setsiparisNotu(value);
    } else if (type === "checkbox") {
      if (checked) {
        setmalzemeler([...malzemeler, value]);
        setmalzemelerFiyat(malzemelerFiyat + 5);
      } else {
        const arr = malzemeler.filter((item) => item !== id);
        setmalzemeler(arr);
        setmalzemelerFiyat(malzemelerFiyat - 5);
      }
    } else if (type === "radio") {
      setBoyut(value);
    } else if (type === "select-one") {
      setHamurTipi(value);
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
  const handleSubmit = () => {
    if (
      siparisSayisi === 0 ||
      boyut === "" ||
      hamurTipi === "" ||
      malzemeler.length < 4 ||
      malzemeler.length > 10
    ) {
      return;
    }
    axios
      .post("https://reqres.in/api/pizza", {
        isim: "Position Absolute Acı Pizza",
        boyut: boyut,
        hamur: hamurTipi,
        malzemeler: malzemeler,
        not: siparisNotu,
        toplamFiyat: toplamFiyat,
      })
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
      <h2>Position Absolute Acı Pizza</h2>
      <div className="prices">
        <h3>85.50₺</h3>
        <div>
          <span>4.9</span>
          <span>(200)</span>
        </div>
      </div>
      <p>
        Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
        pizza tam sana göre. Pizza,domates,peynir ve genellikle çeşitli diğer
        malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir
        fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş
        mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir
        yemektir... Küçük bir pizzaya bazen pizzetta denir.
      </p>
      <div className="middle-up">
        <section>
          <h2>
            Boyut Seç <span style={{ color: "red" }}>*</span>
          </h2>
          <div>
            <RadioButton id={"kucuk"} value={"Küçük"} onChange={handleChange} />
            <RadioButton id={"orta"} value={"Orta"} onChange={handleChange} />
            <RadioButton id={"Büyük"} value={"Büyük"} onChange={handleChange} />
          </div>
        </section>
        <section>
          <h2 htmlFor="hamur">
            {" "}
            Hamur Seç <span style={{ color: "red" }}>*</span>
          </h2>
          <div>
            <select name="hamur" id="hamur" onChange={handleChange}>
              <option disabled selected value="">
                Hamur-Kalınlığı
              </option>
              <SelectOption id={"kucuk"} value={"Küçük"} />
              <SelectOption id={"orta"} value={"Orta"} />
              <SelectOption id={"Büyük"} value={"Büyük"} />
            </select>
          </div>
        </section>
      </div>
      <div className="middle-down">
        <h2>Ek Malzemeler</h2>
        <p>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
        <section>
          <Checkbox id="pepperoni" onChange={handleChange} />
          <Checkbox id="sosis" onChange={handleChange} />
          <Checkbox id="kanada Jambonu" onChange={handleChange} />
          <Checkbox id="tavuk Izgara" onChange={handleChange} />
          <Checkbox id="soğan" onChange={handleChange} />
          <Checkbox id="domates" onChange={handleChange} />
          <Checkbox id="mısır" onChange={handleChange} />
          <Checkbox id="sucuk" onChange={handleChange} />
          <Checkbox id="jalepeno" onChange={handleChange} />
          <Checkbox id="sarımsak" onChange={handleChange} />
          <Checkbox id="biber" onChange={handleChange} />
          <Checkbox id="ananas" onChange={handleChange} />
          <Checkbox id="kabak" onChange={handleChange} />
        </section>
      </div>
      <div className="bottom">
        <h2>Sipariş Notu</h2>
        <textarea
          id="siparisNotu"
          name="siparisNotu"
          placeholder="Siparişine eklemek istediğin bir not var mı?"
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <hr />
        <br />
      </div>
      <div className="bottom-siparis">
        <div>
          <button className="button" onClick={increment}>
            +
          </button>
          <span>   {siparisSayisi}   </span>
          <button className="button" onClick={decrement}>
            -
          </button>
        </div>
        <div className="bottom-siparis-toplam">
          <h2>Sipariş Toplamı</h2>
          <span>
            Seçimler <span style={{ float: "right" }}>{malzemelerFiyat} ₺</span>
          </span>
          <br />
          <span>
            Toplam <span style={{ float: "right" }}>{toplamFiyat} ₺</span>
          </span>
          <br />
          <button className="button" onClick={handleSubmit}>
            Sipariş Ver
          </button>
        </div>
      </div>
    </>
  );
}
