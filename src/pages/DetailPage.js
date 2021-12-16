import { ArrowLeftIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react'
import { Container, Image, Ratio } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import FailedToLoad from '../components/FailedToLoad';
import PageLoader from '../components/PageLoader';
import { getCatById } from '../features/cats/catsSlice';

export default function DetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const { data, status} = useSelector(state => state.cats.cat);

  useEffect(() => {
    dispatch(getCatById(params.catId));
  }, [dispatch, params]);

  return (
    <Container>
      <main>
        <div className="mt-3">
          <CatDetail data={data} status={status}/>
        </div>
      </main>
    </Container>
  )
}

/**
 * Simple react component handle
 * status changes.
 */
function CatDetail({ data, status}) {
  switch(status) {
    case 'failed':
      return <FailedToLoad/>

    case 'idle':
      return data ? (
        <>
          <div className="page-nav d-flex align-items-center">
            <Link to={`/?breed=${data.breeds[0].id}`} className="me-2 back-button">
              <ArrowLeftIcon className="icon"/>
            </Link>
            <h2 className="title">{data.breeds[0].name}</h2>
          </div>
          <div className="cat-card mt-3">
            <div className="cat-image">
              <Ratio aspectRatio="1x1">
                <Image src={data.url} className="object-cover"/>
              </Ratio>
            </div>
            <div className="cat-label relative">
              <div className="float-end">
                <p className="cat-id">{data.id}</p>
              </div>
              <div>
                <h2>{data.breeds[0].name}</h2>
                <p className="m-0">{data.breeds[0].origin}</p>
                <p className="m-0 cat-temperament">{data.breeds[0].temperament}</p>
              </div>
            </div>
            <div className="mx-3">
              <p className='cat-description'>{data.breeds[0].description}</p>
            </div>
          </div>
        </>
      ) : <PageLoader/>

    default:
      return <PageLoader/>
  }
}
