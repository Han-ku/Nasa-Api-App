import PropTypes from 'prop-types';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const EpicSlider = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000
    }

    return (
        <div className="sliderWrapper">
            <div className="sliderContainer">
                <Slider {...settings}>
                    {images.map((image, index) => {
                        const dateParts = image.date.split(" ")[0].split("-")
                        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${dateParts[0]}/${dateParts[1]}/${dateParts[2]}/png/${image.image}.png`

                        return (
                            <div key={index}>
                                <img className='sliderImg' src={imageUrl} alt={image.caption} />
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

EpicSlider.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            caption: PropTypes.string
        })
    ).isRequired
}

export default EpicSlider