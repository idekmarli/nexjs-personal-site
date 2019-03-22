import Meta from "../components/Meta";
import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";
export default ({ children }) => (
  <>
    <Meta />
    <Header />
    <main>
      <Container>{children}</Container>
    </main>
    <Footer />
  </>
);
