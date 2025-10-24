import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer" style={{backgroundColor:"white"}}>
        <Container fluid={true}>
          <Row>
            <div className="col-12">
                &copy; {new Date().getFullYear()} Qadar spiritual app Admin Panel. All rights reserved.
            </div>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
