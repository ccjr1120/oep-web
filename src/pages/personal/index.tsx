import { Avatar, Button, Card, Form, Input, message, Tabs, Upload } from "antd";
import "./index.scss";
import { PlusOutlined } from "@ant-design/icons";
import { fetchByBody, fetchByFile, fetchByParam } from "../../api/api";
import { useEffect, useState } from "react";
import store from "../../store";

const { TabPane } = Tabs;

const PersonalCenter = () => {
  const handleUpload = ({ file }: any) => {
    let params = new FormData();
    params.append("file", file);
    fetchByFile("/common/upload", params).then((resp: any) => {
      if (resp.code === 0) {
        let url = "http://localhost:8080" + resp.data;
        setAvatarUrl(url);
        const addAction = {
          type: 1,
          avatarUrl: url,
        };
        store.dispatch(addAction);
      }
    });
  };
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [userInfo, setUserInfo] = useState<any>({});
  const [infoForm] = Form.useForm();
  const [pwdForm] = Form.useForm();
  const handleSave = () => {
    infoForm
      .validateFields()
      .then(() => {
        fetchByBody("/common/updateUserInfo", infoForm.getFieldsValue()).then(
          (resp) => {
            setUserInfo(resp.data);
            message.success("更新成功");
          }
        );
      })
      .catch(() => {});
  };
  const handlePwd = () => {
    const p1 = pwdForm.getFieldValue("againPwd");
    const p2 = pwdForm.getFieldValue("newPwd");
    if (!p1 || p1.length === 0 || p1 !== p2) {
      message.error("重复密码校验失败");
      return;
    }
    fetchByParam("/common/updatePwd", pwdForm.getFieldsValue()).then(() => {
      message.success("更新成功");
    });
  };
  useEffect(() => {
    fetchByBody("/common/baseUserInfo", {}).then((resp) => {
      setAvatarUrl("http://localhost:8080" + resp.data.avatarUrl);
      setUserInfo(resp.data);
      infoForm.setFieldsValue({
        name: resp.data.name,
        username: resp.data.username,
      });
    });
  }, [infoForm]);
  return (
    <>
      <Card>
        <div style={{ display: "flex", margin: "0 20px" }}>
          <div className="user-info">
            <Card
              style={{ boxShadow: "2px 1px 12px rgba(0,0,0,.2)" }}
              title="个人资料"
            >
              <div
                style={{
                  textAlign: "center",
                  paddingLeft: "24px",
                  position: "relative",
                }}
              >
                <Avatar size={128} src={avatarUrl}></Avatar>
                <div
                  style={{
                    position: "absolute",
                    top: "120px",
                    right: "80px",
                  }}
                >
                  <Upload customRequest={handleUpload} showUploadList={false}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<PlusOutlined />}
                    ></Button>
                  </Upload>
                </div>
              </div>
              <ul style={{ paddingLeft: "24px" }}>
                <li>
                  <span>用户姓名:</span>
                  <span>{userInfo.name}</span>
                </li>
                <li>
                  <span>登录账号:</span>
                  <span>{userInfo.username}</span>
                </li>
                <li>
                  <span>创建时间:</span>
                  <span>{userInfo.createTime}</span>
                </li>
                <li>
                  <span>最后更新时间:</span>
                  <span>{userInfo.updateTime}</span>
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
                    <Form form={infoForm} style={{ margin: "24px 0" }}>
                      <Form.Item
                        name="name"
                        rules={[{ required: true, message: "请输入用户名!" }]}
                        label="用户姓名"
                      >
                        <Input allowClear />
                      </Form.Item>
                      <Form.Item
                        name="username"
                        label="登录账号"
                        rules={[{ required: true, message: "请输入用户名!" }]}
                      >
                        <Input allowClear />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={{ float: "right", width: "120px" }}
                          type="primary"
                          onClick={() => {
                            handleSave();
                          }}
                        >
                          保存
                        </Button>
                      </Form.Item>
                    </Form>
                  </TabPane>
                  <TabPane tab="修改密码" key="2">
                    <Form
                      form={pwdForm}
                      style={{ margin: "24px 0" }}
                      labelCol={{ span: 3 }}
                      labelAlign="right"
                    >
                      <Form.Item name="oldPwd" label="旧密码">
                        <Input />
                      </Form.Item>
                      <Form.Item name="newPwd" label="新密码">
                        <Input />
                      </Form.Item>
                      <Form.Item name="againPwd" label="重复密码">
                        <Input />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={{ float: "right", width: "120px" }}
                          type="primary"
                          onClick={() => {
                            handlePwd();
                          }}
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
