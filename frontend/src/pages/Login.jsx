import Form from '../components/Form';
import Header from '../components/Header';

function Login() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Form route='api/token/' method='login' />
      </div>
    </div>
  )
}

//if login fails want to display a message saying incorrect login info - username and password

export default Login;
