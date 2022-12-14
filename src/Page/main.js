import Carousel from 'react-bootstrap/Carousel'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import interstella from '../Image/interstella.jpg';
import OneNine from '../Image/1987.jpg';
import CommonUtil from '../Util/CommonUtil';

const getMainPage = ( props ) => {
  const MainState = props.MainState;
  let [ Posters ] = MainState( [ interstella, OneNine ] );
    return (
      <>
        <div className='container mt-4 mb-4' style={{ width : "50%"}}>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title="-선택-"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">제목</Dropdown.Item>
              <Dropdown.Item href="#">감독</Dropdown.Item>
              {/* <Dropdown.Divider /> */}
            </DropdownButton>
            <Form.Control />
            <Button>검색</Button>
          </InputGroup>
        </div>
        <div
            style={{
              height : "350px"
            }}>
          <div>
            <Carousel variant="dark">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={ Posters[0] }
                  alt="First slide"
                  style={{height:"400px"}}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={ Posters[1] }
                  alt="First slide"
                  style={{height:"400px"}}
                />
              </Carousel.Item>
              {/* {
                Posters.map( ( p, idx ) => {
                  <Carousel.Item key={ idx }>
                    <img
                      className="d-block w-100"
                      src={ p }
                      alt="First slide"
                    />
                  </Carousel.Item>
                } )
              } */}
              {/* {
                Posters.map( ( p, idx ) => <CarouselCustom MainState={ props.MainState } Poster={ p } key={ idx }/> )
              } */}
            </Carousel>
          </div>
          <div className='container mt-5'>
            {/* 
            아 진짜 UI 너무 하기 싫다
            <CardGroup>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{' '}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This card has even longer content than the
                    first to show that equal height action.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
            <CardGroup className='mt-3'>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{' '}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This card has even longer content than the
                    first to show that equal height action.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup> */}
          </div>
        </div>
      </>
    );
}

export default {
    getMainPage
}