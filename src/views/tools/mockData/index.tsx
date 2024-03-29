import React, { useEffect, useState } from "react";
import { Button, Card, Tabs, message } from "antd";
import { CodeArea } from "@/components";
import TextArea from "antd/es/input/TextArea";
import request from "@/utils/request";

const getMockData = async (params: any) => {
  return request.get("/api/mock/base", {
    params,
  });
};
const params = {
  "list|10": [
    {
      "id|+1": 1,
    },
  ],
};
function wrapValuesWithQuotes(str: string) {
  const regex = /("?:[^\s:,]*)("|')(?:,|})/g;
  const updatedObj = str.replace(regex, '$1"$2,');
  return JSON.parse(updatedObj);
}
const MockData = () => {
  const [beforeValue, setBeforeValue] = useState("");
  const [afterValue, setAfterValue] = useState("");

  const getData = async () => {
    // console.log(beforeValue);
    const transStr = wrapValuesWithQuotes(beforeValue);

    // console.log(typeof beforeValue);
    // console.log(typeof transStr);

    // const mockData = await getMockData(JSON.parse(beforeValue));
    // if (mockData.data.ok) {
    //   message.success("success");
    //   console.log(mockData.data);
    // }
  };
  return (
    <div>
      <h3>Data Mock</h3>
      <Card>
        <Tabs
          defaultActiveKey="1"
          tabPosition={"top"}
          style={{ height: 220 }}
          items={[
            {
              label: "模板Mock",
              key: "1",
              children: (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CodeArea
                    isRead={false}
                    onChange={(e) => {
                      // console.log(e.target.value);

                      setBeforeValue(e.target.value);
                    }}
                    value={beforeValue}
                    disabled
                  />
                  <Button type="primary" onClick={getData}>
                    转换
                  </Button>
                  <CodeArea isRead={true} value={afterValue} disabled />
                </div>
              ),
            },
            {
              label: "tab2",
              key: "2",
              children: <TextArea disabled defaultValue={"asjdajskldj"} />,
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default MockData;
