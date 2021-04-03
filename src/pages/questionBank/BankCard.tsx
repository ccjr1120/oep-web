import { Button, Card, Skeleton } from "antd";
import { memo } from "react";

interface PropsType {
  item: BankType.ItemType;
}

const BankCard = memo(({ item }: PropsType) => {
  return (
    <div title={item.title}>
      <Card
        style={{ margin: "10px" }}
        title={item.title}
        hoverable
        extra={
          <Button type="text" size="small" style={{ color: "#1890ff" }}>
            More
          </Button>
        }
      >
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: "10px", position: "absolute", top: "-24px" }}>
            {item.updateTime
              ? "最后更新时间:" + item.updateTime
              : "创建时间:" + item.createTime}
          </div>
          <Skeleton loading={true}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Skeleton>
        </div>
      </Card>
    </div>
  );
});

export default BankCard;
