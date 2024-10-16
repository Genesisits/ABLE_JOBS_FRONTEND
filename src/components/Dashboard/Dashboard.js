import React from 'react'
import SearchBar from '../../components/search/SearchBar'
import Layout from '../sidenav/Layout';
import '../Dashboard/dashboard.css'

function Dashboard() {
  return (
    <Layout>
    <div className='dashboardGen'>
        <h3>Find your dream job with Genesis</h3>
        <button>Contact us</button>
    </div>
    </Layout>
  )
}

export default Dashboard;