import React from 'react'
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'

export default function DetailPage() {
  let params = useParams();

  return (
    <Container>
      <main>
        <Link to="/">Back</Link>
        <p>
          Detail page for {params.catId}
        </p>
      </main>
    </Container>
  )
}
