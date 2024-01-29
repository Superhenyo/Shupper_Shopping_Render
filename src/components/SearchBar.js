import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const buttonAnimation = useSpring({
    transform: query ? 'scale(1.2)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
  });

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Container className='pt-2 text-center'>
      <Row >
        <Col className='d-flex'>
          <InputGroup className="mb-2 me-1 mb-md-0">
            <FormControl
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Search..."
            />
          </InputGroup>
          <animated.button
            onClick={handleSearch}
            className="btn btn-success btn-block"
          >
            Search
          </animated.button>
        </Col>
      </Row>
    </Container>
  );
};
export default SearchBar;
