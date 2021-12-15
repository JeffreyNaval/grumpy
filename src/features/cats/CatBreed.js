import { EyeIcon, ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react'
import { Col, Ratio, Row, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FailedToLoad from '../../components/FailedToLoad';
import PageLoader from '../../components/PageLoader';
import { getCatsByBreed, getNextCatsByBreed } from './catsSlice';

export default function CatBreed({ breed }) {
  const dispatch = useDispatch();

  const { data, status, page, pagerStatus, totalCount, newCatCount } = useSelector(state => state.cats.cats);

  useEffect(() => {
    dispatch(getCatsByBreed(breed));
  }, []);

  function PageButton() {
    if (pagerStatus === 'loading') {
      return <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    }

    if ((page === 1 && totalCount > data.length) || (page > 1 && newCatCount > 0)) {
      return (
        <button onClick={event => dispatch(getNextCatsByBreed())} className="load-more">
          <div>Click for more cats</div>
          <ChevronDownIcon className="icon"/>
        </button>
      )
    }

    return null;
  }

  switch(status) {
    case 'failed':
      return <FailedToLoad/>

    case 'loading':
      return <PageLoader/>

    default:
      return (
        <>
          <div className="page-nav d-flex align-items-center">
            <Link to="/" className="me-2 back-button">
              <ArrowLeftIcon className="icon"/>
            </Link>
            {data.length > 0 ? (
              <h2 className="title">{data[0].breeds[0].name}</h2>
            ) : null}
          </div>

          <Row xs={1} md={2} className="g-4 pt-3">
            {data.map((cat, i) => (
              <Col key={`cat-breed-${i}`}>
                <Link to={cat.id} className="cat-card">
                  <div className="cat-image">
                    <Ratio aspectRatio="1x1">
                      <Image src={cat.url} className="object-cover"/>
                    </Ratio>
                  </div>
                  <div className="cat-label">
                    <EyeIcon className="icon me-2"/>
                    Adore me
                  </div>
                </Link>
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center my-4">
            <PageButton/>
          </div>
        </>
      )
  }
}
