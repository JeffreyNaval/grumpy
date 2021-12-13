import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, ListGroup, Spinner } from 'react-bootstrap'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { getCatBreeds, setBreed } from './catBreedSlice'
import { useSearchParams } from 'react-router-dom'

export default function CatBreeds({ search }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, status} = useSelector(state => state.catBreeds)

  useEffect(() => {
    dispatch(getCatBreeds())
  }, [dispatch])

  function getSearchResult() {
    if (! search) {
      return data;
    }

    return data.filter((breed) => {
      return breed.name.toLowerCase().includes(search);
    });
  }

  if (status === 'failed') {
    return (
      <Card className="bg-white">
        Failed to load.
      </Card>
    )
  } else if (status === 'loading') {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else {
    return (
      <Card className="bg-white">
        <ListGroup variant="flush">
          {getSearchResult().map((breed, i) => (
            <ListGroup.Item
              key={`breed-${i}`}
              action
              className="d-flex justify-content-between no-underline"
              onClick={(e) => setSearchParams({breed: breed.id})}>
              <div>{breed.name}</div>
              <ChevronRightIcon className="icon"/>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    )
  }
}
