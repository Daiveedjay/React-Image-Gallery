import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-bio">
        <span>Jaja David</span>
        <p>Front-end Developer | Technical Writer</p>
      </div>

      <ul className="footer-socials">
        <a
          href="https://twitter.com/JajaDavid8"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a
          href="mailto:jajadavidjid@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-regular fa-envelope"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/david-jaja-8084251b4/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
        <a
          href="https://hashnode.com/@Daiveed"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-hashnode"></i>
        </a>
      </ul>
    </div>
  );
}
