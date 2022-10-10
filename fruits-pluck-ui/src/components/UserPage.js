import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { Helmet } from "react-helmet";
import {Link} from "react-router-dom";

const UserPage = () => {
  const [scores, setScores] = useState([]);  //Imp

  const currentUser = AuthService.getCurrentUser();
  const id = currentUser.id;

  useEffect(() => {                                      //Imp
    UserService.getScoresOfCurrentUser(id).then(
      (response) => {
        setScores(response.data);
      }
    );
  }, [])

  let maxScore = 0, attempt = 1;
  for (let i = 0; i < scores.length; i++) {
    maxScore = Math.max(maxScore, scores[i]);
  }
  function openNav() {
    document.getElementById("sidenav").style.width = "100px";
  }
  
  function closeNav() {
    document.getElementById("sidenav").style.width = "0";
  }

  return (
    <>
      <Helmet>
        <style>{"body {background: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,.5)), url('https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-simple-and-fresh-wind-taobao-fruit-master-map-template-image_188527.jpg')}"}</style>
      </Helmet>
      <div className="userpage">
        <div className="firsthalf">
        <span id="openNav" onClick={openNav}>&#9776; Menu</span>
            <div id="sidenav">
            <Link href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</Link>
                    <Link to={"/user/change-password"}>
                            Change Password
                             </Link> <br/>
                         <Link to={"/user/upgrade"}>
                            Upgrade
                             </Link>
                     
                </div>
          <h1 className="centertitle"> User Details </h1>
          <div className="card card-container">
            <img
              src="https://www.pngitem.com/pimgs/m/375-3755176_transparent-cartoon-lemon-png-kawaii-lemon-png-png.png"
              alt="profile-img"
              className="profile-img-card"
            />
          </div>
          <div className="firsthalftable">
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <td>User Name</td>
                  <td className="secondcolumn">{currentUser.username}</td>
                </tr>
                <tr>
                  <td>User Id</td>
                  <td className="secondcolumn">{currentUser.id}</td>
                </tr>
                <tr>
                  <td>User Email</td>
                  <td className="secondcolumn">{currentUser.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="secondhalf">
          <h1 className="centertitle"> Score Board </h1>
          {scores.map((score) => (
            <div key={score}>
              <div id="score"> <span id="sameline"> <h3> attempt {attempt++} : &nbsp; </h3> <h2> {score} </h2> </span> </div>
            </div>
          ))}
          <div id="maxScore"> <span id="sameline"> <h3> max score : &nbsp; </h3> <h2> {maxScore} </h2> </span> </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
