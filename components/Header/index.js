import Link from "next/link";
import Container from "../Container";

export default () => (
  <>
    <style jsx>{`
      header {
        background: #b1b1af;
        margin-bottom: 2em;
      }
      nav {
        display: flex;
      }
      nav a {
        padding: 1em;
      }
      nav a:first-child {
        padding-left: 0;
      }
      nav a + a {
        margin-left: 0.5em;
      }
    `}</style>
    <header>
      <Container>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </nav>
      </Container>
    </header>
  </>
);
