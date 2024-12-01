import { Form, Input, Button, Checkbox,message, Row, Col } from "antd";
import { Link,useNavigate } from 'react-router-dom';
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useLoginMutation } from '../api/userApi';


const LoginForm: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();


  const onFinish = async(values: any) => {
    const {email,password} = values
    try {
      await login({ email, password }).unwrap();
      message.success('Login successful');
      navigate('/');
    } catch (err:any) {
        const errorMessage = err?.data?.message 
        if(errorMessage){
          message.error(errorMessage)
        }else{
          message.error('Login failed. Please try again.');
        }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4">
      <div className="mb-2 bg-black text-white text-center rounded-lg p-3">
        <h1 className="text-xl sm:text-2xl font-bold">Bloggy</h1>
      </div>
      <div className="w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-black mb-6">
          Join the BLOG Community
        </h2>
        <Form name="login_form" onFinish={onFinish} className="login-form" initialValues={{ remember: true }} layout="vertical">
          <Form.Item name="email" label="Email" className="mb-4"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Enter a valid email address!" },
            ]} >

            <Input
              size="large"
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item name="password" label="Password" className="mb-4" 
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item name="remember"   className="mb-4"  valuePropName="checked"  rules={[
            { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error("You must accept the terms and conditions!")) },
          ]}>
            <Checkbox className="text-black">Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit"
              block
              size="large"
              loading={isLoading}
              className="bg-black text-white border-none rounded-lg"
            >
              Log in
            </Button>
          </Form.Item>

          <Row justify="center" className="text-sm">
            <Col>
              <Link to='/signup' className="text-black hover:text-black">
                Don't have an account? Register
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </div>

  );
};

export default LoginForm;
