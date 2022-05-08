import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { COMMENT_ACTIONS } from '../../constants/enums';
import { useDialog } from '../Dialog/Provider';
import { Menu } from '../Menu';
import { FiMoreHorizontal } from 'react-icons/fi';

interface ActionMenuInterface {
  data?: any;
  type?: string;
}

const ActionMenu = (props: ActionMenuInterface) => {
  const { data, type } = props;

  const actionMenuOptions = [
    { value: COMMENT_ACTIONS.EDIT, label: 'menu.edit' },
    { value: COMMENT_ACTIONS.DELETE, label: 'menu.delete' },
  ];

  const { appendDialog } = useDialog();
  const { t } = useTranslation();

  const handleActionChange = (event: any) => {
    switch (event.target.value) {
      case COMMENT_ACTIONS.EDIT:
        console.log('edit');
        break;
      case COMMENT_ACTIONS.DELETE:
        console.log('delete');
        break;
      default:
        break;
    }
  };

  return (
    <Menu>
      <Menu.Button>
        <FiMoreHorizontal />
      </Menu.Button>
      <Menu.List>
        {actionMenuOptions.map((action, index) => (
          <Menu.Item
            key={index}
            value={action.value}
            onClick={handleActionChange}
          >
            {t(action.label)}
          </Menu.Item>
        ))}
      </Menu.List>
    </Menu>
  );
};

export default ActionMenu;
