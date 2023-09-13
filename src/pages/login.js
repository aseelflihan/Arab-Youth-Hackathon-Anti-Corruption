// pages/Login.js

function Login() {
    const handleLogin = (e) => {
        e.preventDefault(); // Prevents form submission
        // Here you'd typically validate the user's input or check their credentials.
        // For now, we'll just redirect them to the welcome page:
        window.location.href = '/Welcome';
    }

    return (
        <div className="login-section">
            <h1>Login to Our Platform</h1>
            <p>Enter your details to login.</p>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Enter your email" className="login-input" />
                <input type="password" placeholder="Password" className="login-input" />
                <button type="submit" className="login-button">Login</button>
            </form>
            <p className="login-footer">Don't have an account? <a href="/subscription">Sign Up</a></p>
            <button className="home-button" onClick={() => window.location.href='/'}>Home</button>
        </div>
    );
}

export default Login;
