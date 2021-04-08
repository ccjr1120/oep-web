import { Button, Form, Input, message } from "antd";
import "./index.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { fetchByParam } from "../../api/api";

const Login = ({ history }: any) => {
  const imgIndex = parseInt(Math.random() * 6 + 1 + "");
  const onFinish = (values: any) => {
    fetchByParam("/login", values).then(() => {
      message.success("登录成功");
      sessionStorage.setItem("user", "user");
      history.push("/app/overview");
    });
  };
  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(loginImg/${imgIndex}.jpg)`,
        height: "100vh",
      }}
    >
      <div className="login-form">
        <header className="form-header">
          <h2>用户登录</h2>
        </header>
        <Form
          style={{ margin: "32px" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
