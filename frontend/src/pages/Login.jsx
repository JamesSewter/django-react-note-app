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


export default Login;
