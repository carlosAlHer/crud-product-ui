import Container from 'react-bootstrap/Container';
import { Routing } from './router/Routing';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Container fluid="lg" className="vh-100 bg-light">
      <Routing />
    </Container>
  );
}

export default App;
