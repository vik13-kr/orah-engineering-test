import React from "react"
import styled from "styled-components"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { useDispatch, useSelector } from "react-redux"
import { setStudentListReducer } from "reducers/studentList.reducer"

export default function SortToogle({ sortFor }) {
  const students = useSelector((state) => state?.students)
  const dispatch = useDispatch()

  const handleSorting = (type) => {
    const temp = [...students]

    temp.sort((a, b) => {
      let element1 = a?.[sortFor].toLowerCase()
      let element2 = b?.[sortFor].toLowerCase()

      if (element1 > element2) {
        return 1
      }
      if (element1 < element2) {
        return -1
      }

      return 0
    })

    if (type === "asc") {
      dispatch(setStudentListReducer(temp))
    }
    if (type === "desc") {
      dispatch(setStudentListReducer(temp.reverse()))
    }
  }

  return (
    <T.Container>
      <ArrowDropUpIcon style={{ padding: "0px", fontSize: "18px", cursor: "pointer" }} onClick={() => handleSorting("asc")} />

      <ArrowDropDownIcon style={{ padding: "0px", fontSize: "18px", cursor: "pointer" }} onClick={() => handleSorting("desc")} />
    </T.Container>
  )
}

const T = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: -15px;
    height: 20px;
    margin-right: 10px;
  `,
  Button: styled.button`
    cursor: pointer;
    border: 1px solid red;
    outline: none;
    border: none;
    background: inherit;
    color: white;
    ${"" /* border-bottom: 1px solid white; */}
  `,
}
