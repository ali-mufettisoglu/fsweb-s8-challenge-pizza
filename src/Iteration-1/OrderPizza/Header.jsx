import './Header.css'
import {
    FormText,
  } from "reactstrap";

export default function Header() {
    return ( 
    <div className='head'>
    <div className='logo'> </div>
    <h6 className='pages'>Anasayfa - Seçenekler - <b>Sipariş Oluştur</b></h6>
    </div>
    );
}