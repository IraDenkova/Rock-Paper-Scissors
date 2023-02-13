import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'  
import styled from 'styled-components'
import { useSpring, animated } from '@react-spring/web'

function Game({ userChoice, score, setScore}) {

  const [computerChoice, setComputerChoice] = useState(null)
  const [playerWin, setPlayerWin] = useState(null)

  const [counter, setCounter] = useState(3)


  const choices = ['rock', 'paper', 'scissors']

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }

  useEffect(() => {
    generateComputerChoice();
  }, [])

  const result = () => {
    if (userChoice === 'rock' && computerChoice === 'scissors' ) {
      setPlayerWin('win')
      setScore(score+1)
    } else if (userChoice === 'paper' && computerChoice === 'rock') {
      setPlayerWin('win')
      setScore(score + 1)
    } else if (userChoice === 'scissors' && computerChoice === 'paper') {
      setPlayerWin('win')
      setScore(score + 1)
    } else if (userChoice === 'rock' && computerChoice === 'paper') {
      setPlayerWin('lose')
      setScore(score - 1)
    } else if (userChoice === 'paper' && computerChoice === 'scissors') {
      setPlayerWin('lose')
      setScore(score - 1)
    } else if (userChoice === 'scissors' && computerChoice === 'rock') {
      setPlayerWin('lose')
      setScore(score - 1)
    } else {
      setPlayerWin('draw')
    }
  }
  
  useEffect(() => {
    const timer = counter > 0 ? setInterval(() => {
      setActiveCounter(true)
      setCounter(counter - 1)
    }, 1000) : result();
    
    return () => {clearInterval(timer)}
  }, [ computerChoice, counter ])

  

  const [transitionElementPlayer, setTransitionElementPlayer] = React.useState(false)
  const [transitionElementComputer, setTransitionElementComputer] = React.useState(false)

  const animatedElementPlayer = useSpring({
    transform: transitionElementPlayer ? 'translate3d(-10px, 0, 0)' : 'translate3d(90px, 0px, 0)',
    delay: 3100,
    config: { mass: 5, tension: 1000, friction: 200 },
    opacity: transitionElementPlayer ? 1 : 0,
  })

  const animatedElementComputer = useSpring({
    transform: transitionElementComputer ? 'translate3d(10px, 0, 0)' : 'translate3d(-90px, 0px, 0)',
    delay: 3100,
    config: { mass: 5, tension: 1000, friction: 200 },
    opacity: transitionElementComputer ? 1 : 0,
  })

  const [activeHomeLink, setActiveHomeLink] = useState(false)
  const [activePlayLink, setActivePlayLink] = useState(false)

  const animatedHomeLink = useSpring({
    paddingLeft: activeHomeLink ? '30px' : '10px',
    paddingRight: activeHomeLink ? '30px' : '10px',
    config: { tension: 280, friction: 120 }
  })

  const animatedPlayLink = useSpring({
    width: activePlayLink ? '100%' : '60%',
  })

  const [activeCounter, setActiveCounter] = useState(false)

  const animatedCounter = useSpring({
    width: activeCounter ? '100%' : '0',
    config: { tension: 280, friction: 120 },
  })

  const [ activeTimer, setActiveTimer ] =useState(false)

  const fadeTimer = useSpring({
    config: { mass: 5, tension: 1000, friction: 200 },
    opacity: activeTimer ? 1 : 0,
  })

  useEffect(() => {
       setTransitionElementPlayer(true)
       setTransitionElementComputer(true)
       setActiveHomeLink(true)
       setActivePlayLink(true)
       setActiveCounter(true)
       setActiveTimer(true)
  }, [])

  
  
  
  return (
    <Wrapper>
      <ScoreBar>
         {playerWin==='win' && <p>You win!</p>}
         {playerWin==='lose' && <p>You lose...</p>}
         {playerWin==='draw' && <p>Draw</p>}
       </ScoreBar>
        {counter === 0 ? 
        <Container >
          <Element style={animatedElementPlayer}>
            {playerWin === 'win' && <Winner>p</Winner>}
            <img src={`${userChoice}.png`} alt="" />
            <span>You</span>
         </Element>
         <Versus>VS</Versus>
        <Element style={animatedElementComputer}>      
           {playerWin === 'lose' && <Winner>p</Winner>}
           <img src={`${computerChoice}.png`} alt="" />
           <span>Computer</span>
         </Element>
       </Container> : <Timer style={fadeTimer}>
                        <div>{counter}<animated.span style={animatedCounter}>fill</animated.span></div>              
                      </Timer>}
      <NavBar>
        <StyledHomeLink style={animatedHomeLink} to={'/'}>Home</StyledHomeLink>
        <StyledPlayLink style={animatedPlayLink} to={'/Choice'}>Play again</StyledPlayLink>
      </NavBar>
    </Wrapper>
  )
}

const Winner = styled.div`
  font-size: 0;
  background-color: #FBF8C5;
  opacity: 0.5;
  width: 290px;
  height: 290px;
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  transform: translateY(-55px);
  &:before{
    content: '';
    background-color: #FDE988;
    opacity: 0.9;
    width: 190px;
    height: 190px;
    left: 50px;
    top: 50px;
    position: absolute;
    border-radius: 50%;
  }
  @media(max-width: 480px){
    width: 160px;
    height: 160px;
    transform: translateY(0);
    &:before{
      width: 120px;
      height: 120px;
      left: 20px;
      top: 20px;
    }
  }
`

const Timer = styled(animated.span)`
  font-weight: 700px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  div{
    border: 2px solid #000;
    font-size: 24px;
    line-height: 46px;
    width: 270px;
    height: 46px;
    text-align: center;
    border-radius: 17px;
    position: relative;
  }
  span{
    position: absolute;
    background-color: #FED636;
    font-size: 0px;
    line-height: 46px;
    width: 270px;
    left: 0;
    top: 0;
    height: 46px;
    border-radius: 15px;
    z-index: -1;
  }
  @media(max-width: 480px) {
    div{
      font-size: 20px;
      width: 240px;
      height: 40px;
      line-height: 40px;
    }
    span{
      line-height: 40px;
      width: 240px;
      height: 40px;
    }
  }
`

const Wrapper = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 20px);
  color: #313131;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  font-size: 22px;
  margin: 0 auto;
  @media(max-width: 480px){
    font-size: 18px;
    padding: 0 10px;
  }
`

const NavBar = styled.div`
  display: flex;
`

const ScoreBar = styled.div`
  display: flex;
  justify-content: center;
  font-size: 34px;
  font-weight: 700;
  height: 40px;
  @media(max-width: 480px){
    margin-top: 50px;
  }
`

const StyledHomeLink = styled(animated(NavLink))`
  text-decoration: none;
  color: #fff;
  text-transform: uppercase;
  padding: 25px 50px;
  background-color: #FAA924;
  font-size: 18px;
  font-weight: 500;
  &:hover{
    background-color: #FF9E00;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  @media (max-width: 480px) {
    &:active{     
      background-color: #FF9E00;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }
`

const StyledPlayLink = styled(animated(NavLink))`
  text-decoration: none;
  color: #fff;
  text-transform: uppercase;
  padding: 25px 30px;
  background-color: #FED636;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  &:hover{
    background-color: #FFCC00;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  @media (max-width: 480px) {
    &:active{     
      background-color: #FFCC00;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }
`

const Element = styled(animated.div)`
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    margin-bottom: 10px;
    max-width: 130px;
    width: 100%;
  }
`

const Versus = styled.div`
  text-transform: uppercase;
  position: relative;
  font-size: 25px;
  font-weight: 500;
  margin: 0 50px;
  &::before,
  &::after{
    content: '';
    width: 35px;
    height: 2px;
    background-color: #C5C5C5;
    position: absolute;
    top: 16px;
  }
  &::before{
    left: -50px;
  }
  &::after{
    right: -50px;
  }
  @media(max-width: 480px){
    font-size: 20px;
    font-weight: 500;
    margin: 0 20px;
    &::before,
    &::after{
      width: 28px;
      height: 2px;
      top: 14px;
    }
    &::before{
      left: -35px;
    }
    &::after{
      right: -35px;
    }
  }
`

export default Game

  // < div > My choice: { userChoice }</ >
  //     <div>Computer choice: {computerChoice}</div>
  //     <div>Result: 
  //       {playerWin==='win' && <h3>You win</h3>}
  //       {playerWin==='lose' && <h3>You lose</h3>}
  //       {playerWin==='draw' && <h3>Draw</h3>}
  //     </div>
  //     <div>Score: {score}</div>

  //     <NavLink to={'/Choice'}>Play again</NavLink>