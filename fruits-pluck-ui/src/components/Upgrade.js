import React, {useState} from 'react'
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';

function Upgrade() {
    let navigate = useNavigate();
    const size = 150;

    function pay() {
        navigate("/user/payment");
    }
    return (
        <>
            <Helmet>
                <style>{"body { background: url('https://i.pinimg.com/736x/3a/b9/69/3ab969cf798e4714e68c90c63d6d9c1e.jpg');background-position: center;background-repeat: no-repeat;background-size: cover; }"}</style>
                {/* <script type="text/javascript" src="./Game.js"></script> */}
            </Helmet>
            <div className="flex-payment">
                <div className="upgrade-plan" >
                    <h3> Premium User </h3>
                    Addition of 1fruit with more points
                 <br />
                    <h4> Rs. 100/- </h4>
                </div>
                <button className="buy-button" onClick={pay}>
                    Buy
                </button>
            </div>
        </>
    )
}

export default Upgrade;