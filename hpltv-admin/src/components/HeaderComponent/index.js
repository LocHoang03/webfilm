import React, { useContext } from 'react';
import { Dropdown } from 'antd';
import {
  TitleContent,
  DivRight,
  DivLeft,
  DivHeader,
  DivInfo,
  AvatarUser,
  LabelText,
  DivLabel,
} from './styles';
import { BellOutlined, DownOutlined } from '@ant-design/icons';
import { RoleContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import LogoImage from '../LogoImage';

function HeaderAdmin({ bgColor, title }) {
  const { userInfo } = useContext(RoleContext);
  const items = [
    {
      key: '1',
      type: 'group',
      label: (
        <DivLabel>
          <LabelText>{userInfo.role}</LabelText>
        </DivLabel>
      ),
    },
    {
      key: '2',
      label: <Link to={'/profile'}>Hồ sơ</Link>,
    },
  ];
  return (
    <DivHeader>
      <DivRight>
        <div>
          <LogoImage height={45} width={150} />
        </div>
        <div>
          <span>{userInfo.firstName + ' ' + userInfo.lastName}</span>

          <DivInfo>
            <Dropdown
              menu={{
                items,
              }}>
              <a href="/" onClick={(e) => e.preventDefault()}>
                <AvatarUser src={userInfo.avatarUser.url} />
                <DownOutlined />
              </a>
            </Dropdown>
          </DivInfo>
        </div>
      </DivRight>
    </DivHeader>
  );
}
export default HeaderAdmin;
