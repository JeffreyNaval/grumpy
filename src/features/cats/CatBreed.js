import { EyeIcon, ArrowLeftIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react'
import { Card, CardGroup, Col, Ratio, Row, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FailedToLoad from '../../components/FailedToLoad';
import PageLoader from '../../components/PageLoader';
import { getCatsByBreed } from './catsSlice';

export default function CatBreed({ breed }) {
  const dispatch = useDispatch();

  const { data, status} = useSelector(state => state.cats.cats);

  useEffect(() => {
    dispatch(getCatsByBreed(breed));
  }, []);

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
              <h2 class="title">{data[0].breeds[0].name}</h2>
            ) : null}
          </div>

          <Row xs={1} md={2} className="g-4 pt-3">
            {data.map((cat, i) => (
              <Col>
                <Link to={cat.id} rounded class="cat-card">
                  <div class="cat-image">
                    <Ratio aspectRatio="1x1">
                      <Image src={cat.url} className="object-cover"/>
                    </Ratio>
                  </div>
                  <div class="cat-label">
                    <EyeIcon class="icon me-2"/>
                    Adore me
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </>
      )
  }
}
