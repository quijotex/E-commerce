import Carousel from 'react-bootstrap/Carousel';

const Loader = () => {

    const phrases = [
        {
            id: 10,
            text: ""
        },
        {
            id: 1,
            text: "If a site takes > 1 second to become interactive, users lose attention, and their perception of completing the page task is broken [Source: Lighthouse, taken from Google Developers Blog]"
        },
        {
            id: 2,
            text: "In May 2023, mobile devices generated 65.49% of global website traffic [Hubspot Blog, taken from takenSimilarWeb, 2023)"
        },
        {
            id: 3,
            text: "As page load time increases from one second to seven seconds, the probability of a mobile site visitor bouncing increases 113% [Source: Lighthouse, taken from Think with Google]"
        },
        {
            id: 4,
            text: "73.1% of web designers believe that a non-responsive design is the top reason why visitors leave a website [Hubspot Blog, taken from GoodFirms, 2021]"
        },
        {
            id: 5,
            text: "Walmart saw a 1% increase in revenue for every 100ms improvement in page load [Source: Lighthouse, taken from WPO Stats]"
        },
        {
            id: 6,
            text: "This is taking time, but we are almost there"
        },
        {
            id: 7,
            text: "Did you know that a whole 47% of users expect websites to load in less than 2 seconds? [Source: 9 interesting web development facts]"
        }

    ]

    return(
    <section className='section-loader'>
        <div className='loading'>
                <div className="loader">
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <Carousel className="phrases-slider" data-bs-theme="dark" interval={7000}>
                    {phrases.map(phrase => (
                        <Carousel.Item key={phrase.id}>
                        <p>{phrase.text}</p>
                    </Carousel.Item>
                    ))}
                </Carousel>
        </div>
    </section>
    )
}
export default Loader