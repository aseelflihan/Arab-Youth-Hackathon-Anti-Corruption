// pages/Subscription.js

function Subscription() {
    return (
        <div className="subscription-section">
            <h1>Join Our Platform</h1>
            <p>Stay connected. Stay informed.</p>
            <form>
                <input type="text" placeholder="Full Name" className="subscription-input" />
                <input type="email" placeholder="Enter your email" className="subscription-input" />
                <input type="password" placeholder="Password" className="subscription-input" />
                <button type="submit" className="subscription-button">Sign Up</button>
            </form>
            <p className="subscription-footer">Already have an account? <a href="/login">Login</a></p>
            <button className="home-button" onClick={() => window.location.href='/'}>Home</button>
        </div>
    );
}

export default Subscription;
