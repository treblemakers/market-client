import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Stylecss from "../assets/styles/navbar.module.scss";

const navbar = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: " #ff6bcf" }}
      >
        <Navbar.Brand style={{ fontFamily: "Kanit, sans-serif",color:"red" }}>
          LOGO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features" style={{ fontFamily: "Kanit, sans-serif" }}>หน้าแรก</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">ติดต่อ</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              เข้าสู่ระบบ
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default navbar;
