import Carousel from 'react-bootstrap/Carousel'
import React, { useState} from 'react';
 import 'bootstrap/dist/css/bootstrap.min.css';

const Carouse = ({images}) =>{
    return (
        <Carousel interval={2000}>
            {/* { images.map(index =>( */}
                <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={images}
                            alt="First slide"
                            width={800} height={470}
                        />
                </Carousel.Item>         
                <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://media.urbanistnetwork.com/saigoneer/article-images/legacy/QSQXKi1b.jpg"
                            alt="First slide"
                            width={800} height={470}
                        />
                </Carousel.Item>         
            {/* ))
            } */}
        </Carousel>
    )
}
export default Carouse;
