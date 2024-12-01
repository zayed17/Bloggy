import { Form, Input, Button, Checkbox, Row, Col,message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../api/userApi';


const SignupForm: React.FC = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { name,email,  password, } = values;
    try {
      const response = await signup({
        name,
        email,
        password,
      }).unwrap();

      console.log('Signup successful:', response);
      message.success('Signup successful');
      navigate('/login');
    } catch (err: any) {
      const errorMessage = err?.data?.message
      if (errorMessage) {
        message.error(errorMessage)
      } else {
        message.error('Signup failed. Please try again.');
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
        <Form
          name="signup_form"
          onFinish={onFinish}
          className="signup-form"
          layout="vertical"
        >

          <Form.Item name="name" label="Name" className="mb-4"
            rules={[
              { required: true, message: "Please input your Name!" },
            ]}>
            <Input
              size="large"
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Enter your name"
              className="rounded-lg"
            />
          </Form.Item>


          <Form.Item name="email" label="Email" className="mb-4"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Enter a valid email address!" },
            ]}>
            <Input
              size="large"
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email"
              className="rounded-lg"
            />
          </Form.Item>


          <Form.Item
            name="password"
            label="Password"
            className="mb-4"
            rules={[
              { required: true, message: "Please input your Password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message: "Password must include uppercase, lowercase, number, and special character!",
              },
            ]}>
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
              className="rounded-lg"
            />
          </Form.Item>


          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            className="mb-4"
            dependencies={['password']}
            rules={[
              { required: true, message: "Please confirm your Password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Confirm your password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item name="terms" valuePropName="checked"  className="mb-4" rules={[
            { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error("You must accept the terms and conditions!")) },
          ]}>
            <Checkbox className="text-black">I accept the terms and conditions</Checkbox>
          </Form.Item>


          <Form.Item>
            <Button
              htmlType="submit"
              block
              size="large"
              loading={isLoading}
              className="bg-black text-white border-none rounded-lg"
            >
              Sign Up
            </Button>
          </Form.Item>

          <Row justify="center" className="text-sm">
            <Col>
              <Link to='/login' className="text-black hover:text-black" >
                Already have an account? Log in
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
