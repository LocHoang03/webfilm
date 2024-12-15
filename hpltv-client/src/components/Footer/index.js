import React, { useContext } from 'react';
import {
  DivFooter,
  RowFooter,
  ColFooterTop,
  ColFooterMiddle,
  ColFooterBot,
  DivContentFooter,
  Text,
  DivContentSocial,
  DivSocial,
  DivIcon,
  DivContentSupport,
  DivSupport,
  DivTextDownload,
  DivDownload,
} from './styles';

import { PhoneFilled, MessageOutlined } from '@ant-design/icons';
import LogoImage from '../Common/ImageBanner';

function Footer() {
  return (
    <DivFooter>
      <DivContentFooter>
        <RowFooter>
          <ColFooterTop span={8} xs={24} sm={24} md={24} lg={8}>
            <LogoImage height="130" width="90%" />
          </ColFooterTop>
          <ColFooterMiddle span={10} xs={24} sm={24} md={24} lg={10}>
            <Text>
              Cơ quan chủ quản: Tổng công ty ShowHub - Địa chỉ: Số 01 Đường Phạm
              Văn A, Phường Yên Hòa, Quận Cầu Giấy , Thành phố Hồ Chí Minh.
            </Text>
            <Text>
              Điện thoại/Fax: +84967936728 - Email:{' '}
              <span>hoangphuocloc.phurieng@gmail.com</span>
            </Text>
            <Text>
              Số Giấy chứng nhận ĐKKD: XXXXXXXXX do cơ quan cấp Sở Kế hoạch và
              Đầu tư Hà Nội lần đầu tiên Ngày 20/9/2010, đăng ký thay đổi lần
              thứ 10 ngày 10/3, 2021.
            </Text>
            <Text>
              Giấy phép cung cấp dịch vụ phát thanh, truyền hình trên Internet
              Số 273/GP-BTTTT cấp ngày 12/5/2021.
            </Text>
          </ColFooterMiddle>
          <ColFooterBot span={6} xs={24} sm={24} md={24} lg={6}>
            <DivContentSocial>
              <DivSocial href={'/'}>
                <DivIcon>
                  <img
                    src="https://res.cloudinary.com/dzxupp48t/image/upload/v1714389998/image-webFilm/dhi49sn5wiftlsvifavo.png"
                    alt="tiktok"
                  />
                </DivIcon>
              </DivSocial>
              <DivSocial href={'/'}>
                <DivIcon>
                  <img
                    src="https://res.cloudinary.com/dzxupp48t/image/upload/v1714389998/image-webFilm/xuodqrizvjae9lzxhvhu.png"
                    alt="facebook"
                  />
                </DivIcon>
              </DivSocial>
            </DivContentSocial>
            <DivContentSupport>
              <DivSupport>
                <PhoneFilled /> <span>0101</span>
              </DivSupport>
              <DivSupport>
                <MessageOutlined /> <span>Hỗ trợ</span>
              </DivSupport>
            </DivContentSupport>
            <DivTextDownload>Tải ứng dụng tại</DivTextDownload>
            <DivDownload>
              <img
                src="https://res.cloudinary.com/dzxupp48t/image/upload/v1714388446/image-webFilm/mztdosa6cg3mn1t57i8a.png"
                alt="app store"
              />
              <img
                src="https://res.cloudinary.com/dzxupp48t/image/upload/v1714388436/image-webFilm/zbapk67tmyjx2ry5lpae.png"
                alt="goggle-play"
              />
            </DivDownload>
          </ColFooterBot>
        </RowFooter>
      </DivContentFooter>
    </DivFooter>
  );
}

export default Footer;
