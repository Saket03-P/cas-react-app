import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from './redux/slices/AuthSlice';

const MenuBar = () => {
  const dispatch= useDispatch()
  const isLoggedIn= useSelector(state => state.authRed.isLoggedIn)

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">CAS React</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        
        {
          isLoggedIn ? 
            (<>
              <Nav className="me-auto">
                    <Link className='nav-link active' to='suggestions'>Suggestions</Link>
                    <Link className='nav-link active' to='complaints'>Complaints</Link>
                    <Link className='nav-link active' to='petitions'>Petitions</Link>
                    <Link className='nav-link active' to='ideas'>Ideas</Link>

                <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Nav>
                {/* <Nav.Link href="#deets">My Profile</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  Dank memes
                </Nav.Link> */}
                <NavDropdown title="Profile" id="collapsible-nav-dropdown">
                  
                  <NavDropdown.Item>
                    <Link className='nav-link active' to='my-profile'>My Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className='nav-link active' to='my-suggestions'>My Suggestions</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className='nav-link active' to='my-complaints'>My Complaints</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                   <Link className='nav-link active' to='my-petitions'>My Petitions</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={ () => dispatch(clearUserData()) }>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>) : (
              <Link className='nav-link active' to='/signin'>User</Link>
            )
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MenuBar