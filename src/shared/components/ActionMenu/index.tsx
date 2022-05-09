import React from 'react';
import { useTranslation } from 'react-i18next';
import { COMMENT_ACTIONS } from '../../constants/enums';
import { useDialog } from '../Dialog/Provider';
import { Menu } from '../Menu';
import { FiMoreHorizontal } from 'react-icons/fi';
import DeleteCommentDialog from '../Dialog/dialogs/delete-comment';

interface ActionMenuInterface {
  data?: any;
  type?: string;
  onEdit?: (event?: any) => void;
}

const ActionMenu = (props: ActionMenuInterface) => {
  const { data, onEdit, type } = props;

  const actionMenuOptions = [
    { value: COMMENT_ACTIONS.EDIT, label: 'menu.edit' },
    { value: COMMENT_ACTIONS.DELETE, label: 'menu.delete' },
  ];

  const { appendDialog } = useDialog();
  const { t } = useTranslation();

  const handleActionChange = (event: any) => {
    switch (event.target.value) {
      case COMMENT_ACTIONS.EDIT:
        onEdit && onEdit();
        break;
      case COMMENT_ACTIONS.DELETE:
        appendDialog(<DeleteCommentDialog data={data} />);
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
