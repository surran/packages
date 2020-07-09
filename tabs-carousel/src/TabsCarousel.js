import React, {useEffect} from 'react';
import { Link , withRouter } from "react-router-dom";
import styled from 'styled-components'
import { setLastUIElement } from "@surran/events"

function generateTabHandles({tabHandlesData, currentUrlHandle, type}) {

  let pressedFound = false;
  const tabHandles = tabHandlesData.map(tabHandle => {
    const { title, handle  } = tabHandle
    const pressed = !pressedFound && currentUrlHandle === handle
    if (pressed)
        pressedFound = true
    return (<HeaderButton onClick={() => setLastUIElement("H")}
                          key={type + handle} 
                          to={`/${handle}`} 
                          pressed={pressed}>
              {title.toUpperCase()}
            </HeaderButton>)})
  return tabHandles
}

function ScrollableTabs ({tabHandlesData, currentUrlHandle, location}) {

  useEffect(() => {
    scrollTab(0)
  });
  
  const scrollTab  = (value) => {
    const prevButton = document.getElementById('prevButton')
    const nextButton = document.getElementById('nextButton')
    const prevBlind = document.getElementById('prevBlind')
    const nextBlind = document.getElementById('nextBlind')
    const containerBar = document.getElementById('containerBar')
    const sliderBar = document.getElementById('sliderBar')
    
    const newScrollValue = containerBar.scrollLeft + value
    
    const displayPrev = newScrollValue <= 0 ? "none" : "unset"
    const displayNext = newScrollValue + containerBar.clientWidth >= sliderBar.clientWidth ? "none" : "unset"
    
    prevButton.style.display = displayPrev
    prevBlind.style.display = displayPrev
    nextButton.style.display = displayNext
    nextBlind.style.display = displayNext

    containerBar.scrollTo({
        left: newScrollValue,
        behavior: 'smooth'
      })
  }

  return (<TabsBar id="containerBar">
            <HeaderBar id="sliderBar">
                {generateTabHandles({tabHandlesData, currentUrlHandle, type: "Scrollable"})}
                <PreviousBlind id="prevBlind" />
                <NextBlind id="nextBlind" />
                <PreviousButton id="prevButton" onClick={() => scrollTab(-200)}>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                </PreviousButton>
                <NextButton id="nextButton" onClick={() => scrollTab(200)}>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
                </NextButton>
            </HeaderBar>
          </TabsBar>)
}

function StationaryTabs ({tabHandlesData, currentUrlHandle}) {
  return(<HeaderBar>
          {generateTabHandles({tabHandlesData, currentUrlHandle, type: "Stationary"})}
         </HeaderBar>)
}

function Tabs ({tabHandlesData, currentUrlHandle, type, location}) {
  return type == "scrollable" ? 
         (<ScrollableTabs tabHandlesData={tabHandlesData} 
                         location={location}
                         currentUrlHandle={currentUrlHandle} />) :
         (<StationaryTabs tabHandlesData={tabHandlesData} 
                         location={location}
                         currentUrlHandle={currentUrlHandle} />)
}

export default withRouter(Tabs)


const HeaderBar = styled.div`
  padding: 0px 40px 0px 0px;
  width: max-content;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
`
const TabsBar = styled.div`
    height: 100px;
    overflow-x: scroll;
    width:100%;
`
const HeaderButton = styled(Link)`
  font-size: 16px;
  display:inline-block;
  margin: 14px 0px;
  padding: 10px 15px 5px;
  outline:none;
  padding-bottom: 20px;
  color: ${props => props.pressed ? "#111111" : "hsla(0, 0%, 6.7%, 0.6)"};
  border-bottom: ${props => props.pressed ? "3px solid #111111" : "none"};;
  cursor: pointer;
  font-size: 14px
  text-decoration: none;
  //font-family: "Roboto", "Noto", sans-serif;
  font-weight: 500;

  :hover {
    color: #111111;
  }
`

const PreviousButton = styled.div`
  width: 48px;
  height: 48px;
  padding: 12px;
  width: 50px;
  box-sizing: border-box;
  height: 50px;
  border-radius: 25px;
  position: absolute;
  top: 10px;
  left:0px;

  @media (min-width: 650px) {
    display: none;
  }

  :hover {
    background-color: #e2e8eb;
}
`
const PreviousBlind = styled.div`
  background: linear-gradient(to right, #FFFFFF 30%, #FFFFFF00);
  width: 50px;
  height: 70px;
  position: absolute;
  top: 0px;
  left:0px;

  @media (min-width: 650px) {
    display: none;
  }
` 

const NextButton = styled.div`
  
  width: 48px;
  height: 48px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 25px;
  position: absolute;
  top: 10px;
  right:0px;
  
  @media (min-width: 650px) {
    display: none;
  }

  :hover {
      background-color: #e2e8eb;
  } 
`
const NextBlind = styled.div`
  background: linear-gradient(to left, #FFFFFF 30%, #FFFFFF00);
  width: 50px;
  height: 70px;
  position: absolute;
  top: 0px;
  right:0px;

  @media (min-width: 650px) {
    display: none;
  }
`  