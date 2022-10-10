import React, {useEffect} from 'react'
import logo from '../resources/logo.png'
import { Helmet } from "react-helmet";
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';

const Bounce = styled.div`animation: 3s ${keyframes`${bounce}`} infinite`;
function HomePage() {
    
    return (
        <div>
            <Helmet>
                <style>{"body { background: url('https://wallpaperaccess.com/full/759485.jpg');background-position: center;background-repeat: no-repeat;background-size: cover; }"}</style>
            </Helmet>
            <div className="bounceTitle">
                <Bounce><h1>Welcome to the Game !</h1></Bounce>
            </div>

            <img id="homepage" className="mw-100" src={logo}
                alt="Fruit Picking" />
        </div>
    )
}

export default HomePage
