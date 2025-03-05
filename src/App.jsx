import Container from 'react-bootstrap/Container';
import { Routing } from './router/Routing';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <BrowserRouter>
      <Container fluid="lg" className="vh-100 bg-light border">
        <Routing />
      </Container>
    </BrowserRouter>
  );
}

export default App;
