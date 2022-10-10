import React, {useState, useEffect} from 'react'
import QRCode from 'react-qr-code';
import Popup from 'reactjs-popup';
import { Helmet } from "react-helmet";
import paymentbg from '../resources/payment.jpeg';

function Payment() {
    const size = 200;
    const [value,setValue] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{setValue(false)}, 10000)
      }, []);

    return (
        <div>
           <Helmet>
                <style>{"body { background: linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,.5)),url('https://cdn4.vectorstock.com/i/1000x1000/69/58/modern-qr-code-background-vector-2186958.jpg') }"}</style>
            </Helmet>
             <center className="qrcode">
                <>
               {value && <Popup trigger={ 
                <button className="proceed-button">
                    Proceed to Scan & Pay
                </button>}  > <br/>
                <QRCode className="qrcode"
                    value = {value}
                    size = {size}
                /> <br/>
                <img className="pay-options" src="https://www.proideators.com/wp-content/uploads/2019/09/QR-Code-payment-by-google-pay-phonepe-paytm-Jio-ProiDeators.jpg"
                     alt="payment options" />
                </Popup>
               }
               {!value && 
               <>
                 <h1 className="thanksnote"> <b> Thanks for your purchase ! </b> </h1>
                 <p> <b> Payment Expired </b> </p>
               </>
               }
                </>
            </center>
        </div>
    )
}

export default Payment
