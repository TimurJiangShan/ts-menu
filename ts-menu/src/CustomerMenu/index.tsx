import * as React from "react";
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import { useState } from "react";
import { useEffect } from "react";
const { SubMenu } = Menu;


interface TreeData {
  key: string;
  title: string;
  [children:string]: any;
};

const treeData: [TreeData] = [{
  key: "0",
  title: "Australia",
  children: [{
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
          },{
            key:"12",
            title: "Darlington"
          }
        ]
      },{
        key:"123",
        title: "Newcarsle",
        children: [
          {
            key: "23",
            title: "City",
          },{
            key:"1234",
            title: "Country"
          }
        ]
      }
    ]
  },{
    key: "126",
    title: "QUD",
    children: [
      {
        key: "1003",
        title: "Brisbane",
      }
    ]
  }]
}];


const CustomerMenu:React.FC<{}> = (props: any) => {
  
  const [menuTree, setMenuTree] = useState([] as any);
  const renderMenu = (data:[TreeData]) => {
    return data.map((item:any)=>{
        //如果有子节点，继续递归调用，直到没有子节点
        if (item.children) {  
            return (
              <SubMenu title={item.title} key={item.key}>
                  {renderMenu(item.children)}
              </SubMenu>
            )
        }
        //没有子节点就返回当前的父节点
        return <Menu.Item title={item.title} key={item.key}>{item.title}</Menu.Item>
    })
  }

  useEffect(() => {
    const menuTreeList = renderMenu(treeData);
    setMenuTree(menuTreeList) //将数据存放在menuTree中
  },[]);


  return (
    <div style={{  width: '150px'}}>
      <Menu theme={'dark'} triggerSubMenuAction="click">
          {menuTree}
      </Menu>
    </div>
  );
}

export default CustomerMenu;