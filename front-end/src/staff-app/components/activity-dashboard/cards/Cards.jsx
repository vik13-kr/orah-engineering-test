import React from "react"
import styled from "styled-components"

export const color = {
  present: "#12943B",
  late: "#F4A522",
  absent: "#9B9B9B",
  unmark: "#A5C9CA",
}

export default function Cards({ selectedCard, setSelectedCard, title, count }) {
  return (
    <Container key={title} title={title} selectedCard={selectedCard} onClick={() => setSelectedCard(title)}>
      <C.Count>{count}</C.Count>
      <C.Title>{title}</C.Title>
    </Container>
  )
}

const Container = styled.div`
  background: ${(props) => color[props.title]};
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-right: 5%;
  box-sizing: border-box;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  ${({ selectedCard, title }) => selectedCard === title && `border:4px solid #607eaa`};
  &:hover {
    border: 4px solid #607eaa;
  }
`

const C = {
  Count: styled.div`
    font-size: 2rem;
    font-weight: 700;
  `,
  Title: styled.div`
    font-size: 1.2rem;
    font-weight: 600;
  `,
}
