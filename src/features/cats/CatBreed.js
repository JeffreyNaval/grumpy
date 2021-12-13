import React from 'react'
import { Link } from 'react-router-dom';

export default function CatBreed({ breed }) {
  return (
    <div>
      <Link to="/">Back</Link>
      Breed: {breed}
    </div>
  )
}
