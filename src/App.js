import React from 'react';
import { HeartIcon } from '@heroicons/react/solid'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import logo from './assets/logo.svg';
import githubLogo from './assets/github.svg';
import './App.scss';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                alt="Meowstagram"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              &nbsp;
              Meowstagram
            </Link>
          </Navbar.Brand>
          <Nav.Link href="https://github.com/JeffreyNaval/grumpy" target="_blank" className="github-link">
            <img
              alt="Github"
              src={githubLogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Nav.Link>
        </Container>
      </Navbar>

      <Outlet />

      <footer>
        <Container>
          <div className="d-flex text-center justify-content-center py-4">
            Made with <HeartIcon className="icon heart" /> by
            <a href="https://github.com/JeffreyNaval" target="_blank" rel="noreferrer" className="d-block ms-1">
              Jeffrey Naval
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default App;
