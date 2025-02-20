import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
// import Link from 'next/link'
// import Navbar from '@/components/Dashboard/Navbar'
// import PhotoUploader from '@/components/PhotoUploader'
import { useStateContext } from '@/context/StateContext'
// import { getAllUserPhotos } from '@/backend/Database'
const Dashboard = () => {

  const { user } = useStateContext()

  // const router = useRouter()

  // useEffect(() => {
  //   if(!user) {
  //     // redirect to another page
  //     router.push('/')
  //   } else{
  //     // fetch data
  //   }
  // }, user)

  const [age, setAge] = useState(400)
  const [data, setData] = useState(false)

  function updateAge() {
    setAge(age + 1)
  }

  function useEffectFunction () {

    // Waits until age is 28, then waits 5 seconds before setting data
    if(age == 28) {
      setTimeout(() => {
        setData(100000)
      }, 5000)
    }

    }

  useEffect(useEffectFunction, [age])


  return (
    <Section>
      <Navbar/>
      <TopHeader>
        <p>Stephen is {age} years old</p>
      </TopHeader>
  
      <button onClick={updateAge}>It's my Birthday</button>
      <button onClick={() => setAge(0)}>Kill Stephen</button>

      {/* ONLY SHOWS WHEN DATA EXISTS */}
      { !data? <></> : <p>This is the data: {data}</p> }
    </Section>

  )
}

// STYLED COMPONENTS
const Section = styled.section`
width: 100%;
height: 100vh;
padding-top: 55px;
display: flex;
justify-content: center;
`

const TopHeader = styled.h1`
font-size: 20px;
display: flex;
`



export default Dashboard