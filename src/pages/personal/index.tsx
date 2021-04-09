import { Avatar, Button, Card, Col, Form, Input, Row, Tabs } from "antd";
import "./index.scss";
const { TabPane } = Tabs;

const PersonalCenter = () => {
  return (
    <>
      <Card>
        <div style={{ display: "flex", margin: "0 20px" }}>
          <div className="user-info">
            <Card
              style={{ boxShadow: "2px 1px 12px rgba(0,0,0,.2)" }}
              title="个人资料"
            >
              <div style={{ textAlign: "center", paddingLeft: "24px" }}>
                <Avatar size={128}></Avatar>
              </div>
              <ul style={{ paddingLeft: "24px" }}>
                <li>
                  <span>用户姓名:</span>
                  <span>admin</span>
                </li>
                <li>
                  <span>登录账号:</span>
                  <span>admin</span>
                </li>
                <li>
                  <span>创建时间:</span>
                  <span>2021-12-02</span>
                </li>
                <li>
                  <span>最后更新时间:</span>
                  <span>2203-12-43</span>
                </li>
              </ul>
            </Card>
          </div>
          <div className="base-info">
            <div style={{ height: "80%" }}>
              <Card
                title="基本资料"
                style={{ boxShadow: "-2px 1px 6px rgba(0,0,0,.2)" }}
              >
                <Tabs>
                  <TabPane tab="基本资料" key="1">
                    <Form style={{ margin: "24px 0" }}>
                      <Form.Item label="用户姓名">
                        <Input />
                      </Form.Item>
                      <Form.Item label="登录账号">
                        <Input />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={{ float: "right", width: "120px" }}
                          type="primary"
                        >
                          保存
                        </Button>
                      </Form.Item>
                    </Form>
                  </TabPane>
                  <TabPane tab="修改密码" key="2">
                    <Form
                      style={{ margin: "24px 0" }}
                      labelCol={{ span: 3 }}
                      labelAlign="right"
                    >
                      <Form.Item label="旧密码">
                        <Input />
                      </Form.Item>
                      <Form.Item label="新密码">
                        <Input />
                      </Form.Item>
                      <Form.Item label="重复密码">
                        <Input />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={{ float: "right", width: "120px" }}
                          type="primary"
                        >
                          保存
                        </Button>
                      </Form.Item>
                    </Form>
                  </TabPane>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default PersonalCenter;
