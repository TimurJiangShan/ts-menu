import React from "react";
import { Menu,message } from "antd";
import "./style.css";
import { TextContext } from "../context";
import { JSON_FORMAT_ERROR } from "../InputText";

const { SubMenu } = Menu;

type TreeData = {
  key: string;
  title: string;
  children?: Array<TreeData>;
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


function checkTextType(_text:TreeData|Array<TreeData>):Array<TreeData>{
  if( _text instanceof Array){ 
    return _text as Array<TreeData>
  }
  return [_text] as Array<TreeData>
}

const CustomerMenu: React.FC<{}> = () => {
  const [menuData, setMenuData] = React.useState< Array<TreeData>|TreeData>([]);
  const { text } = React.useContext(TextContext);

  React.useEffect(() => {
    try{
      if (!text) {
        setMenuData(treeData);
      } else {
        setMenuData(JSON.parse(text));
      }
    }catch (e){
       message.error(JSON_FORMAT_ERROR);
    }
    
  }, [text]);

  const renderMenu = React.useCallback((data: Array<TreeData>|TreeData) => {
    return checkTextType(data).map((item: TreeData) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          {item.title}
        </Menu.Item>
      );
    }
    )}
  ,[])

  return (
    <div>
      <Menu
        className="menu-container"
        triggerSubMenuAction="click"
        mode="horizontal"
      >
        {renderMenu(menuData)}
      </Menu>
    </div>
  );
};

export default CustomerMenu;
