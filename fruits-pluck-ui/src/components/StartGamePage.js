import React from 'react'
import { Helmet } from "react-helmet";
import GameService from "./GameService";
import { Link } from "react-router-dom";

function StartGamePage() {

    const handleclick = () => {
        const elementOne = document.getElementById("begin");
        elementOne.style.display = "none";
        const elementTwo = document.getElementById("instructions");
        elementTwo.style.display = "none";
        const a = GameService.game();
    }

    // function openNav() {
    //     document.getElementById("sidenav").style.width = "200px";
    //   }
      
    //   function closeNav() {
    //     document.getElementById("sidenav").style.width = "0";
    //   }
      
    return (
        <>
            <Helmet>
                <style>{"body { background: url('https://i.pinimg.com/originals/a7/cf/d7/a7cfd7fea872d24e5a93f732c5209ae8.gif');background-position: center;background-repeat: no-repeat;background-size: cover; }"}</style>
                {/* <script type="text/javascript" src="./Game.js"></script> */}
            </Helmet>


            <div className="gamepage">
            {/* <span id="openNav" onClick={openNav}>&#9776; Menu</span>
            <div id="sidenav">
            <Link href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</Link>
                    <Link to={"/user/change-password"}>
                            Change Password
                             </Link> <br/>
                         <Link to={"/user/payment"}>
                            Payment
                             </Link>
                     
                </div> */}
            <canvas id="gameregion">
            </canvas>
            <menu id="controls">
                <div id="instructions">
                    <h3> Instructions ! </h3>
                    <ul>
                        <li>Orange - 1pt  </li>
                        <li>Apple - 2pt  </li>
                        <li> Strawberry - 3pt  </li>
                    </ul>
                </div>
                <button id="end" onClick={() => window.location.reload(false)}> Play Again !</button>
                <button id="begin" onClick={handleclick}> Click to play !</button>
            </menu>
        </div>
        </>
    )
}

export default StartGamePage
