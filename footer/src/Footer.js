import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { setLastUIElement } from "@surran/events"
import TwitterIcon from "./TwitterIcon"

function Footer({
        leftText = [{
                        type: "text",
                        value: "Copyright 2020. All Rights Reserved."}],
        rightText = [{
                        type: "text",
                        value: "Developed by "},
                     {
                        type: "anchor",
                        value: "Surya Ranjan Shandil",
                        to: "https://terminalnotes.com/founder",
                     },
                     {
                         type: "icon",
                         value: "twitterIcon"
                     },
                     {
                        type: "anchor",
                        href: "https://twitter.com/surranshan",
                        value: "@surranshan"
                     }
                    ]
    }) {

    function processEntity(entity) {
        const {type, value, to, onClick, href} = entity
        if (type == "text") return (<span>{value}</span>)
        if (type == "link") return (<Link to={to} onClick={() => setLastUIElement("F")} >{value}</Link>)
        if (type == "anchor") return (<a style={{textDecoartion: "none"}} href={href} target="_blank">{value}</a>)
        if (type == "icon") {
            if (value == "twitterIcon") return (<TwitterIcon />)
        }
    }

    const leftChildren = leftText.map(entity => processEntity(entity))
    const rightChildren = rightText.map(entity => processEntity(entity))

	return (<Container>
			  <Left>
                {leftChildren}
              </Left>
              <Right>
                {rightChildren}
              </Right> 
            </Container>)
}

export default Footer

const Container = styled.div`
  position: relative;
  background-color: #dddddd;
  box-sizing: border-box;
  font-size: 11px;
  margin: 0px;
  width: 100%;
  padding: 5px;

  @media only screen and (min-width: 1024px) {
    display: table
  }
 `

 const Right = styled.div`
  text-align: right;
  padding-right: 2px;
  @media only screen and (min-width: 1024px) {
    display: table-cell
  }
 `
 const Left = styled.div`
 text-align: left;
 padding-left: 2px;
 
@media only screen and (min-width: 1024px) {
  display: table-cell
}
`
 const RLink = styled(Link)`
  text-decoration: none;
 `