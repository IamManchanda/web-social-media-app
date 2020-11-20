import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./assets/styles/scss/app.scss";
import MenuBar from "./components/menu-bar";
import PageIndex from "./pages/index";
import PageLogin from "./pages/login";
import PageRegister from "./pages/register";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/auth-route";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Container>
            <MenuBar />
            <Route exact path="/" component={PageIndex} />
            <AuthRoute exact path="/login" component={PageLogin} />
            <AuthRoute exact path="/register" component={PageRegister} />
          </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
