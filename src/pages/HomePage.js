import { SearchIcon } from '@heroicons/react/solid';
import React, { useState } from 'react'
import { Container, FormControl, InputGroup } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import CatBreed from '../features/cats/CatBreed'
import SearchCatBreeds from '../features/cats/SearchCatBreeds'

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState('');
  const breed = searchParams.get('breed');

  return (
    <Container>
      <main>
        <div className="mt-3">
          {breed ? <CatBreed breed={breed} /> : (
            <>
              <div className="mt-3 mb-3">
                <InputGroup>
                  <InputGroup.Text id="search-breed">
                    <SearchIcon className="icon" />
                  </InputGroup.Text>
                  <FormControl
                    className="bg-white"
                    placeholder="Search cat breed"
                    aria-describedby="search-breed"
                    autoFocus={true}
                    value={searchText}
                    onChange={event => setSearchText(event.target.value)} />
                </InputGroup>
              </div>
              <SearchCatBreeds search={searchText} />
            </>
          )}
        </div>
      </main>
    </Container>
  )
}
