import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

const tableDataObj = {
  rollNo: null,
  first_name: "",
  last_name: "",
  staus: "",
  dateTime: "",
}

export default function Table({ selectedCard, studSummary, apiData, students }) {
  const headers = ["Roll No", "First Name", "Last Name", "Status", "Date/Time"]

  const [tableData, setTableData] = useState(null)

  const extractStudenInfo = (item) => {
    let idIndex = students?.findIndex((s) => {
      return s?.id === item
    })
    if (idIndex !== -1) {
      return { id: students[idIndex]?.id, first_name: students[idIndex]?.first_name, last_name: students[idIndex]?.first_name, status: students[idIndex]?.rollMark }
    }
  }

  const extractStudentActivityDate = (item) => {
    let idIndex = apiData?.findIndex((i) => i?.entity?.id === item)
    if (idIndex !== -1) {
      return { dateTime: apiData?.[idIndex]?.entity?.completed_at }
    }
  }

  useEffect(() => {
    const arr = studSummary?.[selectedCard]?.studentIds.map((item) => {
      let a = extractStudenInfo(item)
      let b = extractStudentActivityDate(item)

      let obj = { ...a, ...b }
      return obj
    })

    setTableData(arr)
    return () => setTableData(null)
  }, [selectedCard, studSummary, apiData])

  return (
    <T.StyledTable>
      <thead>
        <tr>
          {headers.map((item) => (
            <T.THeader key={item}>{item}</T.THeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData?.map((item) => (
          <tr>
            <T.TData>{item?.id}</T.TData>
            <T.TData>{item?.first_name}</T.TData>
            <T.TData>{item?.last_name}</T.TData>
            <T.TData>{item?.status}</T.TData>
            <T.TData>{new Date(item?.status).toString()}</T.TData>
          </tr>
        ))}
      </tbody>
    </T.StyledTable>
  )
}

const T = {
  StyledTable: styled.table`
    width: 100%;
  `,
  THeader: styled.th`
    color: red;
  `,
  TData: styled.td`
    text-align: center;
  `,
}
