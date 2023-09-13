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
                  Our platform is dedicated to maintaining the integrity of the educational system. We employ advanced technologies to detect and prevent the use of fraudulent certificates, thereby championing transparency and authenticity in academic and professional domains.
                </p>
                <Link href="/subscription">
                    <button className="subscribe-button">Subscribe</button>
                </Link>
            </div>
        </div>
    );
}

export default AboutUs;
