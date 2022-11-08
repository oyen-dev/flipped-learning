// import { useState, useEffect } from 'react'
// import { useGlobal } from '../../contexts/Global'
// import { useAuth } from '../../contexts/Auth'

import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'

import { useParams, useNavigate } from 'react-router-dom'

const EditClassPost = () => {
  // Use params
  const { id, postId } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Breadcrumb Items
  const paths = [
    {
      name: 'Dashboard',
      destination: '/dashboard'
    },
    {
      name: 'Daftar Kelas',
      destination: '/classes'
    },
    {
      name: 'Beranda Kelas',
      destination: `/classes/${id}`
    },
    {
      name: 'Edit Postingan',
      destination: `/classes/${id}/posts/${postId}/edit`
    }
  ]

  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />

      <p>Edit class post</p>
    </Layout>
  )
}

export default EditClassPost
