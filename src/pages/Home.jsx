import React from 'react'
// import Sidebar from '../components/Sidebar'
// import Chat from '../components/Chat'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import UploadPost from '../components/UploadPost'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container w-100">
        <UploadPost />
      </div>
    </>
  )
}

export default Home