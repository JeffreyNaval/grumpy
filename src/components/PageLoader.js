import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function PageLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center py-4">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}
