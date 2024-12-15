import {
  DivContact,
  DivBanner,
  BannerContact,
  DivContent,
  Text,
  Title,
  Content,
} from './styles';
import image from '../../assets/images/term_and_condition.jpg';
import { Helmet } from 'react-helmet-async';

function TermAndConditionPage() {
  return (
    <DivContact>
      <Helmet>
        <title>Term And Condition</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <DivBanner>
        <BannerContact src={image} />
      </DivBanner>
      <Content>
        <DivContent>
          <Text>
            Vui lòng đọc kỹ trang này vì nó đưa ra các điều khoản áp dụng đối
            với việc bạn sử dụng Trang web cũng như bất kỳ phần nào trong nội
            dung của chúng và tất cả vật liệu xuất hiện trên chúng. Bằng cách sử
            dụng Trang web, bạn xác nhận rằng bạn chấp nhận các Điều khoản sử
            dụng này và bạn đồng ý tuân thủ chúng. Nếu như bạn không đồng ý với
            các Điều khoản sử dụng này, vui lòng không sử dụng Trang web.
          </Text>
          <Title>VIỆC BỊ KHÓA TÀI KHOẢN VÀ CÁCH MỞ KHÓA</Title>
          <Text>
            Nếu tài khoản của bạn bị khóa, có thể do bạn đã vi phạm các Điều
            khoản và Điều kiện khi sử dụng Trang web. Một số lý do phổ biến dẫn
            đến việc bị khóa tài khoản bao gồm: Vi phạm các quy định về nội dung
            hoặc hành vi không phù hợp sử dụng tài khoản với mục đích lừa đảo,
            giả mạo, hoặc vi phạm pháp luật. cung cấp thông tin không chính xác
            hoặc gian lận trong quá trình sử dụng.....
          </Text>
          <Text>
            Cách mở khóa tài khoản: Bạn hoặc người giám hộ có thể liên hệ với
            chúng tôi tại{' '}
            <a href="mailto:hoangphuocloc.phurieng@gmail.com">
              hoangphuocloc.phurieng@gmail.com
            </a>{' '}
            để biết chi tiết lý do tài khoản bị khóa và quy trình mở khóa.
            <br /> Xác minh thông tin: Bạn sẽ cần cung cấp các thông tin xác
            thực liên quan đến tài khoản để chứng minh quyền sở hữu và giải
            quyết vấn đề.
            <br /> Thực hiện cam kết: Nếu việc khóa tài khoản liên quan đến hành
            vi vi phạm, bạn có thể được yêu cầu cam kết không tái phạm trong
            tương lai.
          </Text>
          <Text>
            Chúng tôi cam kết hỗ trợ bạn nhanh chóng và đảm bảo việc tuân thủ
            các quy định để tạo môi trường sử dụng Trang web an toàn và lành
            mạnh.
          </Text>
          <Title>VIỆC SỬ DỤNG TRANG WEB CỦA BẠN NẾU BẠN DƯỚI 18 TUỔI</Title>
          <Text>
            Nếu bạn dưới 18 tuổi, bạn có thể cần cha mẹ/người giám hộ giúp đỡ
            bạn với việc bạn sử dụng Trang web cũng như với việc đọc các Điều
            khoản và Điều kiện. Có gì khó hiểu cứ hỏi bạn nhé cha mẹ/người giám
            hộ để giải thích. Nếu bạn vẫn còn thắc mắc, bạn hoặc cha mẹ/người
            giám hộ của bạn có thể liên hệ với chúng tôi tại: [
            <a href="mailto:hoangphuocloc.phurieng@gmail.com">
              hoangphuocloc.phurieng@gmail.com
            </a>
            ].
          </Text>
          <Text>
            Nếu bạn từ 13 tuổi trở xuống, bạn không thể đăng ký ShowHub tài
            khoản (“Tài khoản”) mà không có sự cho phép của phụ huynh/người giám
            hộ của bạn. Bạn cần phải đăng ký nếu muốn chơi game Fantasy. bạn làm
            không cần phải đăng ký để sử dụng Trang web.
          </Text>
          <Text>
            Chúng tôi có thể thu thập thông tin cá nhân của bạn khi bạn sử dụng
            Trang web và Ứng dụng. Bạn có thể tìm hiểu thêm về cách chúng tôi sử
            dụng thông tin cá nhân của bạn thông tin trong Câu hỏi và Trả lời
            của chúng tôi.
          </Text>
          <Title>ĐIỀU KHOẢN ÁP DỤNG KHÁC</Title>
          <Text>
            Các Điều khoản sử dụng này là bổ sung và nên được đọc trong kết hợp
            với Chính sách quyền riêng tư và Chính sách cookie của chúng tôi.
          </Text>
          <Text>
            Nếu bạn dưới 18 tuổi, chúng tôi đã cố gắng giải thích những chính
            sách này cho bạn trong Câu hỏi và Trả lời của chúng tôi. Bạn có thể
            tìm thấy một liên kết ở đây: <a href="/contact">liên kết</a>.
          </Text>
          <Title>THAY ĐỔI ĐỐI VỚI ĐIỀU KHOẢN SỬ DỤNG NÀY</Title>
          <Text>
            Chúng tôi có thể thay đổi các điều khoản này bất cứ lúc nào bằng
            cách sửa đổi trang này. Vui lòng kiểm tra trang này thường xuyên để
            nhận được thông báo về bất kỳ thay đổi nào như bạn sẽ được coi là
            chấp nhận chúng thông qua việc bạn tiếp tục sử dụng Trang web.
          </Text>
          <Title>THAY ĐỔI TRANG WEB</Title>
          <Text>
            Chúng tôi mong muốn cập nhật Trang web thường xuyên và có thể thay
            đổi nội dung bất cứ lúc nào. Nếu cần thiết, chúng tôi có thể tạm
            dừng quyền truy cập vào Trang web hoặc đóng nó vô thời hạn. Chúng
            tôi sẽ không chịu trách nhiệm nếu vì bất kỳ lý do Trang web không
            khả dụng vào bất kỳ lúc nào hoặc trong bất kỳ khoảng thời gian nào.
            Bất kì của tài liệu trên Trang web có thể lỗi thời tại bất kỳ thời
            điểm nào, và chúng tôi không có nghĩa vụ cập nhật tài liệu đó.
          </Text>
          <Title>TÀI KHOẢN</Title>
          <Text>
            Bạn có thể đăng ký một Tài khoản. Bạn không được phép đăng ký nhiều
            Tài khoản trên Trang web.
          </Text>
          <Text>
            Khi đăng ký Tài khoản, bạn sẽ cung cấp dữ liệu cá nhân đến ShowHub.
            Bất kỳ dữ liệu cá nhân nào bạn gửi sẽ được được xử lý theo Chính
            sách quyền riêng tư của ShowHub và trong phù hợp với luật bảo vệ dữ
            liệu có liên quan bao gồm cả Quy định chung về bảo vệ dữ liệu
            (“GDPR”) và Bảo vệ dữ liệu Đạo luật 2018. Nếu bạn dưới 18 tuổi, bạn
            có thể tìm hiểu thêm về cách chúng tôi sử dụng thông tin cá nhân của
            bạn trong Câu hỏi và Trả lời của chúng tôi, đó là có sẵn ở đây:{' '}
            <a href="/contact">liên kết</a>.
          </Text>
          <Title>LIÊN KẾT NGOÀI</Title>
          <Text>
            Trang web chứa các liên kết đến các trang web và dịch vụ khác được
            vận hành bởi các bên độc lập với chúng tôi. Chúng tôi thực hiện các
            biện pháp phòng ngừa hợp lý trong chọn những điều này tuy nhiên
            chúng tôi không xác nhận hoặc chịu trách nhiệm về nội dung hoặc tính
            khả dụng của các trang web này và không thể chấp nhận bất kỳ trách
            nhiệm pháp lý đối với bất kỳ tài liệu nào có trong đó hoặc đối với
            việc bạn sử dụng họ hoặc bất kỳ việc sử dụng dữ liệu cá nhân nào của
            bạn do nhà điều hành của họ thu thập. Nếu bạn quyết định truy cập
            các trang web được liên kết, bạn sẽ tự chịu rủi ro khi làm như vậy
            và chúng tôi khuyến khích bạn đọc các điều khoản về quyền riêng tư
            áp dụng cho từng trang web cụ thể.
          </Text>
          <Text>
            Nếu bạn dưới 18 tuổi, bạn có thể cần cha mẹ/người giám hộ giúp đỡ
            bạn với việc bạn sử dụng Trang web và với việc đảm bảo nội dung và
            tính sẵn có của bất kỳ trang web và dịch vụ được liên kết nào đều
            phù hợp.
          </Text>
          <Title>VI-RÚT</Title>
          <Text>
            Chúng tôi và các nhà cung cấp của chúng tôi thực hiện các biện pháp
            phòng ngừa hợp lý để ngăn chặn việc máy tính virus, trojan, sâu, bom
            hẹn giờ, cancelbots, bị hỏng tập tin hoặc bất kỳ mục nào khác có thể
            làm hỏng hoạt động của máy tính hoặc tài sản hoặc tham gia vào việc
            lạm dụng máy tính ("Độc hại Programs") trên Trang web nhưng không
            thể chấp nhận bất kỳ trách nhiệm pháp lý nào đối với họ. Bạn nên đề
            phòng những hành vi độc hại như vậy Các chương trình, bao gồm cả
            việc sử dụng phần mềm bảo vệ phù hợp.
          </Text>
          <Title>BẠN SỬ DỤNG TRANG WEB HỢP PHÁP</Title>
          <Text>
            Bạn không được lạm dụng Trang web bằng cách cố ý giới thiệu Nội dung
            độc hại Chương trình. Bạn không được cố gắng truy cập trái phép vào
            Trang web, máy chủ lưu trữ Trang web hoặc bất kỳ máy chủ nào, máy
            tính hoặc cơ sở dữ liệu được kết nối với Trang web. Bạn không được
            tấn công Trang web thông qua một cuộc tấn công từ chối dịch vụ hoặc
            một cuộc tấn công phân tán tấn công từ chối dịch vụ. Bằng việc vi
            phạm điều khoản này, bạn sẽ phạm tội hình sự theo Đạo luật lạm dụng
            máy tính năm 1990. Chúng tôi sẽ báo cáo bất kỳ vi phạm nào như vậy
            cho cơ quan thực thi pháp luật có liên quan cơ quan có thẩm quyền và
            sẽ hợp tác với các cơ quan đó bằng cách tiết lộ danh tính của bạn
            đối với họ. Trong trường hợp vi phạm như vậy, quyền của bạn được
            việc sử dụng Trang web sẽ chấm dứt ngay lập tức.
          </Text>
          <Title>GIỚI HẠN TRÁCH NHIỆM</Title>
          <Text>
            Ngoại trừ trường hợp tử vong hoặc thương tích cá nhân do hành vi của
            chúng tôi gây ra sơ suất hoặc bất kỳ hành động cố ý nào, trong phạm
            vi tối đa được pháp luật cho phép chúng tôi loại trừ mọi trách nhiệm
            pháp lý đối với bạn đối với Tài khoản của bạn và việc sử dụng Trang
            web.
          </Text>
          <Title>LUẬT ĐIỀU CHỈNH</Title>
          <Text>
            Các Điều khoản sử dụng này được điều chỉnh và giải thích theo với
            luật pháp của Anh và xứ Wales. Bất kỳ tranh chấp nào phát sinh dưới
            hoặc trong việc kết nối với các điều khoản này sẽ phải tuân theo các
            điều khoản không độc quyền thẩm quyền của tòa án Anh.
          </Text>
          <Title>LIÊN HỆ</Title>
          <Text>
            Nếu bạn có bất kỳ nhận xét hoặc câu hỏi nào về Trang web hoặc Ứng
            dụng vui lòng liên hệ với chúng tôi tại{' '}
            <a href="mailto:hoangphuocloc.phurieng@gmail.com">
              hoangphuocloc.phurieng@gmail.com
            </a>
          </Text>
        </DivContent>
      </Content>
    </DivContact>
  );
}

export default TermAndConditionPage;
