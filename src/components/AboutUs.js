// components/AboutUs.js
import Link from 'next/link';

function AboutUs() {
    return (
        <div className="about-section">
           
            <div className="gradient-overlay"></div>

            <div className="about-content">
                <div className="title">
                    <h1>About Us</h1>
                </div>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Natus odio porro vero voluptatum, officia repellendus voluptates 
                    neque alias nemo minus!
                </p>

                <Link href="/subscription">
                    <button className="subscribe-button">Subscribe</button>
                </Link>
            </div>
        </div>
    );
}

export default AboutUs;
