import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useApi } from "shared/hooks/use-api"
import { useSelector } from "react-redux"
import LoadingSpinner from "shared/components/loading-spinner"
import Cards from "staff-app/components/activity-dashboard/cards/Cards"
import Table from "staff-app/components/activity-dashboard/table/Table"
import ChartComponent from "staff-app/components/activity-dashboard/chart/Chart"

const summaryObjInterface = {
  present: {
    count: 0,
    studentIds: [],
  },
  late: {
    count: 0,
    studentIds: [],
  },
  absent: {
    count: 0,
    studentIds: [],
  },
  unmark: {
    count: 0,
    studentIds: [],
  },
}

export const ActivityPage = () => {
  const [callApi, data, loadState] = useApi({ url: "get-activities" })

  const students = useSelector((state) => state?.students)

  const [studSummary, setStudSummary] = useState(null)

  const [selectedCard, setSelectedCard] = useState("present")

  const createStudSummary = () => {
    const summaryObj = JSON.parse(JSON.stringify(summaryObjInterface))

    students.map((s) => {
      summaryObj[s.rollMark].count += 1
      summaryObj[s.rollMark].studentIds.push(s.id)
    })
    setStudSummary(summaryObj)
  }

  useEffect(() => {
    callApi()
  }, [])

  useEffect(() => {
    if (students.length > 0) createStudSummary()
    return () => {
      setStudSummary(null)
    }
  }, [students])

  console.log("obj---", studSummary)

  if (loadState === "loading" && studSummary && data) return <LoadingSpinner />

  return (
    <S.Container>
      <S.CardsContainer>
        {studSummary &&
          Object.keys(studSummary)?.map((item) => <Cards selectedCard={selectedCard} setSelectedCard={setSelectedCard} title={item} count={studSummary?.[item]?.count} />)}
      </S.CardsContainer>
      <S.DetailContainer>
        <S.Table>
          <Table selectedCard={selectedCard} studSummary={studSummary} apiData={data?.activity} students={students} />
        </S.Table>
        <S.Chart>
          <ChartComponent studSummary={studSummary} />
        </S.Chart>
      </S.DetailContainer>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
  `,
  CardsContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;
  `,
  DetailContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  Table: styled.div`
    width: 70%;

    border: 1px solid red;
  `,
  Chart: styled.div`
    width: 25%;
    border: 1px solid blue;
  `,
}
