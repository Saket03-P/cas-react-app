import React from 'react'
import {Link} from 'react-router-dom'
 
const Page404 = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <img src="https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png" alt="" />
      <br />
      <button className=' btn btn-primary'><Link to="/" style={styles.link}>Go back to Home</Link></button>
    </div>  )
}
 
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
  },
  link: {
    fontSize: '1rem',
    textDecoration: 'none',
    color: 'white',
  },
};
 
export default Page404