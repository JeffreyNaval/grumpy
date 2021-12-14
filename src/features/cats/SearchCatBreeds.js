import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, ListGroup, Spinner, Image, Ratio } from 'react-bootstrap'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { getCatBreeds, setBreed } from './catsSlice'
import { useSearchParams } from 'react-router-dom'
import PageLoader from '../../components/PageLoader'
import FailedToLoad from '../../components/FailedToLoad'

export default function CatBreeds({ search }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, status} = useSelector(state => state.cats.breeds)

  useEffect(() => {
    dispatch(getCatBreeds())
  }, [])

  function getSearchResult() {
    if (! search) {
      return data;
    }

    return data.filter((breed) => {
      return breed.name.toLowerCase().includes(search);
    });
  }

  switch(status) {
    case 'failed':
      return <FailedToLoad/>;

    case 'loading':
      return <PageLoader/>

    default:
      return (
        <Card className="bg-white">
          <ListGroup variant="flush" className="cat-breeds">
            {getSearchResult().map((breed, i) => (
              <ListGroup.Item
                key={`breed-${i}`}
                action
                className="py-3 d-flex justify-content-between align-items-center no-underline"
                onClick={(e) => setSearchParams({breed: breed.id})}>
                <div className='d-flex align-items-center'>
                  <div className="cat-breed-image rounded-circle overflow-hidden">
                    <Ratio aspectRatio="1x1">
                      <Image
                        src={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`}
                        className="object-cover"/>
                    </Ratio>
                  </div>
                  <div>
                    <h2 className="title">{breed.name}</h2>
                    <p className="sub-title">{breed.origin}</p>
                  </div>
                </div>
                <ChevronRightIcon className="icon"/>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )
  }
}
