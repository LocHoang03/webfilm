require('dotenv').config();

const emailTemplate = (email, token) => `
   <div style="width: 100%; max-width:600px; margin: 0 auto">
        <div style="text-align: left; margin: 1.2rem 0">
            <img src=${
              process.env.IMAGE_BANNER
            } alt="image-banner-showhub" style="width: 150px; height: 30px"/>
        </div>
        <div style="width: 100%;margin: auto; font-family: Roboto, sans-serif; border: 1px solid #f0f0f0; text-align: left">
            <div style="padding: 20px;">
                <h2 style="margin: 0; margin-bottom: 30px; font-weight: 300; line-height: 1.5; font-size: 24px; color: #294661 !important;">Xin chào ${email},</h2>

                <p style="margin: 0; margin-bottom: 30px; color: #294661; font-size: 16px; font-weight: 300;">Đã nhận được yêu cầu thay đổi mật khẩu cho tài khoản ShowHub của bạn.</p>

                <div style="text-align: center;margin-bottom: 30px"><a href="${
                  process.env.URL_CLIENT
                }/auth/reset-password/${token}" style="box-sizing: border-box;border-color: #348eda;font-weight: 400;text-decoration: none;display: inline-block;margin: 0;color: #ffffff;background-color: #348eda;border: solid 1px #348eda;border-radius: 2px;font-size: 14px;padding: 12px 45px;">Đặt lại mật khẩu</a></div>

                <p style="margin: 0;margin-bottom: 30px;color: #294661;font-size: 16px;font-weight: 300;">Nếu bạn không thực hiện yêu cầu này, vui lòng liên hệ ngay với chúng tôi theo địa chỉ hoangphuocloc.phurieng@gmail.com.</p>

                <p style="margin: 0;margin-bottom: 30px;color: #294661;font-size: 16px;font-weight: 300;">Cảm ơn bạn,<br>Nhóm ShowHub</p>
            </div>
            <div style="background-color: #f8f8f8; padding: 10px; text-align: center; border-top: 1px solid #ddd;">
                <div>
                    <img src=${
                      process.env.IMAGE_BANNER
                    } alt="image-banner-showhub" style="width: 75px; height: 15px; margin-top: 1em"/>
                </div>
                <p>&copy; ${new Date(
                  Date.now(),
                ).getFullYear()} ShowHub. All rights reserved.</p>
            </div>
        </div>
   </div>
`;

module.exports = emailTemplate;
