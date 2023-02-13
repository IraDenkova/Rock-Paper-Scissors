import React from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'

function PopUp() {

  return (
    <Instruction>   
      <StyledPopup trigger={<Tooltip>See the instruction?</Tooltip>} position="top center">
        {close => (
          <div>
            Rock wins against scissors; paper wins against rock; and scissors wins against paper. If both players throw the same signal, it is considered a tie, and play resumes until there is a clear winner.
          </div>
        )}
      </StyledPopup>
    </Instruction>
  )
}

const Instruction = styled.div`
  margin-bottom: 20px;
`;

const Tooltip = styled.button`
  cursor: help;
  border: none;
  background: none;
  color: #C5C5C5;
  border-bottom: 3px dotted #C5C5C5;
  font-size: 18px;
  transition: all .2s;
  position: relative;
  &:hover{
    color: #3D3D3D;
    border-bottom-color: #3D3D3D;
  }
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.5);
  }
  &-content {
    width: 450px;
    border-radius: 6px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.17);
    margin: auto;
    background: rgb(255, 255, 255);
    padding: 7px;
  }
  .popup-arrow {
    color: rgb(255, 255, 255);
  }
  @media(max-width: 900px){
    &-content{
      font-size: 15px;
      width: 300px;
    }
  }
`;


export default PopUp
