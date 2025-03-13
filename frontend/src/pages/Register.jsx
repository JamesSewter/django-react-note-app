import Form from '../components/Form';
import Header from '../components/Header';


function Register() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Form route='api/user/register/' method='register' />;
      </div>
    </div>
  );
}

export default Register;
