import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { Link } from "react-router-dom";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="header">
      <Navbar className="navbar" light expand="md">
        <NavbarBrand
          href="/"
          style={{ color: "AliceBlue", fontWeight: "bold" }}
        >
          Quarantine Productivity
        </NavbarBrand>
        <NavbarToggler onClick={toggle} style={{backgroundColor:'white', opacity:'0.9'}}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar style={{display:"flex", justifyContent:"flex-end", width:"900%"}}>
            <NavItem>
              <Link to="/tasks" style={{ color: "#fff", marginRight: "15px" }}>
                Tasks
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/logbook" style={{ color: "#fff", marginRight: "15px" }}>
                Logbook
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/considerations" style={{ color: "#fff", marginRight: "15px" }}>
                Considerations
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/" style={{ color: "#fff", marginRight: "15px" }} onClick={() => localStorage.clear()}>
                Sign Out
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
