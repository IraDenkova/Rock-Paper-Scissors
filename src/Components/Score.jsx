import React from 'react'
import styled from 'styled-components'

function Score() {
  
  

  function getScore(playerScore = 0, computerScore = 0) {
    return playerScore + ' - ' + computerScore
  }

  return (
    <ScoreWrapper>
      <p></p>
      <p>{getScore()}</p>
    </ScoreWrapper>
  )
}


const ScoreWrapper = styled.div`
  font-size: 25px;
  padding: 15px 60px;
  border: 1px solid #000;
  border-radius: 15px;
`

export default Score
