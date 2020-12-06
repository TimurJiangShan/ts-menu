import * as React from "react";
import { Menu, Input } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import { useEffect } from "react";
import "./style.css";
import { TextContext } from "../context";
const { SubMenu } = Menu;
const { TextArea } = Input;

interface TreeData {
  key: string;
  title: string;
  [children: string]: any;
}

export const treeData: [TreeData] = [
  {
    key: "0",
    title: "Australia",
    children: [
      {
        key: "6",
        title: "NSW",
        children: [
          {
            key: "1",
            title: "Sydney",
            children: [
              {
                key: "2",
                title: "Burwood",
              },
              {
                key: "12",
                title: "Darlington",
              },
            ],
          },
          {
            key: "123",
            title: "Newcarsle",
            children: [
              {
                key: "23",
                title: "City",
              },
              {
                key: "1234",
                title: "Country",
              },
            ],
          },
        ],
      },
      {
        key: "126",
        title: "QUD",
        children: [
          {
            key: "1003",
            title: "Brisbane",
          },
        ],
      },
    ],
  },
];

const CustomerMenu: React.FC<{}> = (props: any) => {
  const [menuTree, setMenuTree] = useState([]);
  const { text } = React.useContext(TextContext);
  const renderMenu = (data: any) => {
    return data.map((item: any) => {
      //如果有子节点，继续递归调用，直到没有子节点
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      //没有子节点就返回当前的父节点
      return (
        <Menu.Item title={item.title} key={item.key}>
          {item.title}
        </Menu.Item>
      );
    });
  };

  useEffect(() => {
    if (!text) {
      setMenuTree(renderMenu(treeData));
    } else {
      setMenuTree(renderMenu([text]));
    }
  }, [text]);

  return (
    <div style={{ width: "150px" }}>
      <Menu
        className="menu-container"
        triggerSubMenuAction="click"
        mode="horizontal"
      >
        {menuTree}
      </Menu>
    </div>
  );
};

export default CustomerMenu;
