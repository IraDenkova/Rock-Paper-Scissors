import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import PopUp from './PopUp';
import { NavLink } from 'react-router-dom' 
import { useSpring, animated } from '@react-spring/web' 


function Home() {

  const [transitionHome, setTransitionHome] = useState(false)

  const animatedHome = useSpring({
    config: { mass: 5, tension: 1000, friction: 200 },
    opacity: transitionHome ? 1 : 0,
  })

  useEffect(() => {
    setTransitionHome(true)
  }, [])

  return (
    <HomeScreen style={animatedHome}>
      <Image>
        <img src='game_process.png' alt='game-process'/>
      </Image>
      <Play>
        <StyledNavLink to={'/Choice'}>Play game</StyledNavLink>          
      </Play>
      <PopUp />
    </HomeScreen>
  )
}



const StyledNavLink = styled(NavLink)`
    font-weight: 500;
    font-size: 20px;
    padding: 1rem 10rem;
    border: none;
    color: #171717;
    background-color: #FED636;
    border-radius: 30px;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    transition: all .3s;
    margin: 8px;
    &:hover{
      transform: scale(1.1);
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.17);
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  @media (max-width: 480px) {
    padding: 1rem 5rem;
    width: 100%;    
    display: inline;
    &:active{     
      background-color: #E2BA1A;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
    }
  }
`

const HomeScreen = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`
const Image = styled.div`
  margin-bottom: 70px;
  margin-top: 20px;
  img {
    width: 100%;
    max-width: 380px;  
  }
  @media (max-width: 480px){
    flex: 1;
    margin-bottom: 0;
    margin-top: 90px;
  }
`
const Play = styled.div`
  flex-grow: 1;
`



export default Home
