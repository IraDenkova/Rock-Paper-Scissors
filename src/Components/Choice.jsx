import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useSpring, animated } from '@react-spring/web'



function Choice( {setUserChoice }) {


  const handleClick = (value) => {
    setUserChoice(value)
  }

  const [transitionRock, setTransitionRock] = useState(false)
  const [transitionPaper, setTransitionPaper] = useState(false)
  const [transitionScissors, setTransitionScissors] = useState(false)

  const animatedRock = useSpring({
    config: { mass: 5, tension: 1000, friction: 200 },
    opacity: transitionRock ? 1 : 0,
    y: transitionRock ? 0 : 30,
    from: { opacity: 0, y: 30},
  })

  const animatedPaper = useSpring({
    config: { mass: 5, tension: 1000, friction: 200 },
    opacity: transitionPaper ? 1 : 0,
    y: transitionPaper ? 0 : 30,
    from: { opacity: 0, y: 30 },
    delay: 250
  })

  const animatedScissors = useSpring({
    config: { mass: 5, tension: 1000, friction: 200 },
    opacity: transitionScissors ? 1 : 0,
    y: transitionScissors ? 0 : 30,
    from: { opacity: 0, y: 30 },
    delay: 500
  })

  const [ activeButtton, setActiveButton ] = useState(false)

  const animatedButton = useSpring({
    width: activeButtton ? '100vw': '20vw',
  })

  useEffect(() => {
    setTransitionRock(true)
    setTransitionPaper(true)
    setTransitionScissors(true)
    setActiveButton(true)
  }, [])
  


  return (
    
    <Wrapper>
      <StyledNavLink to={'/Game'}>
        <animated.button style={animatedRock} onClick={() => {handleClick('rock')}}>
          <Img src="rock.png" alt="Rock" />
        </animated.button>  
        <animated.button style={animatedPaper} onClick={() => {handleClick('paper')}}>
          <Img src="paper.png" alt="Paper" />
        </animated.button>
        <animated.button style={animatedScissors} onClick={() => {handleClick('scissors')}}>
          <Img src="Scissors.png" alt="Scissors" />
        </animated.button>    
      </StyledNavLink>
      <StyledHomeLink style={animatedButton} to={'/'}>Home</StyledHomeLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const Img = styled.img`
  width: 100%;
  max-width: 220px;
  cursor: pointer;
  transition: all .3s;
  &:hover{
    transform: scale(1.15)
  }
  @media (max-width: 480px) {
    max-width: 150px;
    width: 100%;
    &:hover{
      transform: scale(1)
    }
    &:active{
      transform: scale(1.25)
    }
  }

`

const StyledNavLink = styled(NavLink)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  button{
    background: none;
    border: none;
  }
  button + button{
    margin-left: 30px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    margin-bottom: 10px;
    button + button{
      margin-left: 0;
      margin-top: 15px;
    }
  }
`

const StyledHomeLink = styled(animated(NavLink))`
  text-decoration: none;
  color: #fff;
  text-transform: uppercase;
  padding: 25px 0;
  width: 100vw;
  text-align: center;
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

export default Choice
