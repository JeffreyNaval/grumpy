import React from 'react'
import { Alert } from 'react-bootstrap'
import { ExclamationIcon } from '@heroicons/react/solid';

export default function FailedToLoad() {
  return (
    <Alert variant="danger" className="d-flex">
      <ExclamationIcon className="icon me-1"/>
      <p className="m-0">Apologies but we could not load new cats for you at this time! Miau!</p>
    </Alert>
  )
}
