import React from 'react'
import { Card, Container, FormControl, InputGroup, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/solid'

export default function HomePage() {
    return (
    <Container>
      <main>
        <div className="mt-3">
          <InputGroup>
            <InputGroup.Text id="search-breed">@</InputGroup.Text>
            <FormControl
              className="bg-white"
              placeholder="Search cat breed"
              aria-describedby="search-breed"
              autofocus="true"/>
          </InputGroup>
        </div>

        <div className="mt-3">
          <Card className="bg-white">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Link to="/test" className="d-flex justify-content-between no-underline">
                  <div>Cras justo odio</div>
                  <ChevronRightIcon className="icon"/>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </main>
    </Container>
    )
}
