export default function Contact() {
    return (
      <div className="contact-section">
        <div className="contact-content">
          <h1>Contact Us</h1>
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  }
  