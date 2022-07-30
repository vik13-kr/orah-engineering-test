import React, { useEffect } from "react"
import styled from "styled-components"
import { useApi } from "shared/hooks/use-api"

export const ActivityPage = () => {
  const [callApi, data, loadState] = useApi({ url: "get-activities" })
  useEffect(() => {
    callApi()
  }, [])
  console.log("data---", data)
  return <S.Container>Activity Page</S.Container>
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
  `,
}
