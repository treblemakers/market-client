import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import Stylecss from "../assets/styles/navbar.module.scss";

import Link from "next/link";
import { AuthContext } from "../appState/AuthProvider";

const navbar = () => {
  const { user, signout } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: " #ff6bcf" }}
      >
        <Navbar.Brand style={{ fontFamily: "Kanit, sans-serif", color: "red" }}>
          LOGO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/">
              <Nav.Link href="/" style={{ fontFamily: "Kanit, sans-serif" }}>
                หน้าแรก
              </Nav.Link>
            </Link>
            {user && (
              <Link href="/">
                <Nav.Link href="/" style={{ fontFamily: "Kanit, sans-serif" }}>
                  หน้าแรก
                </Nav.Link>
              </Link>
            )}
            {user && (
              <Link href="/">
                <Nav.Link href="/" style={{ fontFamily: "Kanit, sans-serif" }}>
                  หน้าแรก
                </Nav.Link>
              </Link>
            )}
            {user && (
              <Link href="/">
                <Nav.Link href="/" style={{ fontFamily: "Kanit, sans-serif" }}>
                  หน้าแรก
                </Nav.Link>
              </Link>
            )}

            {user && (
              <Link href="/">
                <Nav.Link href="/" style={{ fontFamily: "Kanit, sans-serif" }}>
                  หน้าแรก
                </Nav.Link>
              </Link>
            )}
          </Nav>
          <Nav>
            {user ? (
              <div>
                สวัสดี : คุณ {user.name}
                <Button onClick={signout}>ออกจากระบบ</Button>
              </div>
            ) : (
              <Link href="/login">
                <Nav.Link eventKey={2} href="/login">
                  เข้าสู่ระบบ
                </Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default navbar;
