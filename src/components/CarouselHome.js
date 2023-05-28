import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function CarouselHome(props) {
  
  return (
          <Carousel showStatus = {false} showThumbs = {false} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src="https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/a37c7aa9669fcd4c.jpg?q=50" alt = "caurosel-i" />
                    
                </div>
                <div>
                    <img src="https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/85c1f47e46111e77.jpg?q=50" alt = "caurosel-i" />
                    
                </div>
                <div>
                    <img src="https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/2d2e95a7bb29bb2b.jpg?q=50" alt = "caurosel-i" />
                    
                </div>
            </Carousel>
  )
}

export default CarouselHome;