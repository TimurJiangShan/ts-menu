import React from "react";
import { Button, Menu, message } from "antd";
import { TextContext } from "../context/text-context";
import { JSON_FORMAT_ERROR } from "../InputText";
import styled from "@emotion/styled";
import { isVoid } from "../utils";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;

type TreeData = {
  key: string;
  title: string;
  children?: Array<TreeData>;
};

interface CustomerMenuProps {
  onTest?: () => void;
}

export const treeData: [TreeData] = [
  {
    key: "0",
    title: "Main menu",
    children: [
      {
        key: "6",
        title: "sub menu1",
        children: [
          {
            key: "1",
            title: "sub menu2",
            children: [
              {
                key: "2",
                title: "sub menu3",
              },
              {
                key: "12",
                title: "sub menu3",
              },
            ],
          },
          {
            key: "123",
            title: "sub menu2",
            children: [
              {
                key: "23",
                title: "sub menu3",
              },
              {
                key: "1234",
                title: "sub menu3",
              },
            ],
          },
        ],
      },
      {
        key: "126",
        title: "sub menu1",
        children: [
          {
            key: "1003",
            title: "sub menu2",
          },
        ],
      },
    ],
  },
];

const checkTextType = (_text: TreeData | Array<TreeData>): Array<TreeData> => {
  if (_text instanceof Array) {
    return _text as Array<TreeData>;
  }
  return [_text] as Array<TreeData>;
};

const CustomerMenu: React.FC<CustomerMenuProps> = (
  props: CustomerMenuProps
) => {
  const [menuData, setMenuData] = React.useState<Array<TreeData> | TreeData>(
    []
  );
  const { text } = React.useContext(TextContext);
  const { onTest } = props;

  React.useEffect(() => {
    try {
      if (!isVoid(text)) {
        setMenuData(JSON.parse(text));
        onTest && onTest();
      } else {
        setMenuData(treeData);
      }
    } catch (e) {
      message.error(JSON_FORMAT_ERROR);
    }
  }, [text, onTest]);

  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  const renderMenu = React.useCallback((data: Array<TreeData> | TreeData) => {
    return checkTextType(data).map((item: TreeData) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key} role="least-menu">
          {item.title}
        </Menu.Item>
      );
    });
  }, []);

  return (
    <StyledMenu
      triggerSubMenuAction="click"
      mode="inline"
      role="menu"
      onClick={onTest}
    >
      {renderMenu(menuData)}
      <Menu.Item>
        <Button
          data-testid="show-login-button"
          type="link"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Menu.Item>
    </StyledMenu>
  );
};

const StyledMenu = styled(Menu)`
  width: 30rem;
  background: white;
  margin: 12px;
  border-bottom: 1px solid transparent;
`;

export default CustomerMenu;
