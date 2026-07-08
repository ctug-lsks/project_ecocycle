---
target: customer_marketplace.html
total_score: 25
p0_count: 0
p1_count: 2
timestamp: 2026-07-08T15-23-06Z
slug: customer-marketplace-html
---
# Critique: customer_marketplace.html

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Phản hồi tốt khi tìm kiếm/lọc nhưng thiếu chỉ báo khi tải động từ API. |
| 2 | Match System / Real World | 3 | Thuật ngữ phù hợp với sinh viên VNU (Verified VNU, Momo, Green Coins). |
| 3 | User Control and Freedom | 3 | Modals đầy đủ nút đóng và hủy bỏ. |
| 4 | Consistency and Standards | 2 | Nhiều lỗi lệch chuẩn radius (30px, 8px) và dùng mã màu cứng ngoài DESIGN.md. |
| 5 | Error Prevention | 3 | Form ràng buộc nhập dữ liệu bằng HTML5 validation. |
| 6 | Recognition Rather Than Recall | 3 | Giao diện dạng lưới thẻ dễ nhận diện sản phẩm. |
| 7 | Flexibility and Efficiency | 2 | Không hỗ trợ phím tắt, mua số lượng lớn hoặc gom đơn. |
| 8 | Aesthetic and Minimalist Design | 2 | Lưới thẻ sản phẩm trùng lặp rập khuôn; một số đoạn dùng style nội dòng (inline) gây rối. |
| 9 | Error Recovery | 3 | Phục hồi lỗi cơ bản qua thông báo báo đỏ. |
| 10 | Help and Documentation | 1 | Thiếu trợ giúp trực quan hay hướng dẫn quy chế mua bán. |
| **Total** | | **25/40** | **Acceptable (Chấp nhận được)** |

## Anti-Patterns Verdict

* **Đánh giá tổng quan (LLM)**: Giao diện lưới thẻ sản phẩm và cấu trúc modal khá rập khuôn theo phong cách AI generator cơ bản. Đặc biệt, việc sử dụng các nút bo tròn 30px và hiệu ứng chuyển động nảy làm giảm cảm giác chuyên nghiệp của hệ thống sản phẩm.
* **Lỗi nảy chuyển động (Bounce-easing)**: Phát hiện hiệu ứng nảy `cubic-bezier(0.34, 1.56, 0.64, 1)` tại dòng 353 gây cảm giác không chân thực.
* **Typographic**: Chỉ sử dụng duy nhất một font chữ `Outfit` cho cả tiêu đề hiển thị và văn bản thường mà không phân cấp độ dày rõ rệt (Warning: Single font family).
* **Lệch chuẩn thiết kế (Design System Drift)**:
  * Trôi góc bo tròn: Sử dụng `border-radius: 8px` (dòng 905, 944, 953, 1068), `border-radius: 10px` (dòng 694, 725), và `border-radius: 30px` (dòng 76, 130, 145) ngoài thang chuẩn của DESIGN.md (`sm: 6px`, `md: 12px`, `lg: 20px`).
  * Trôi màu sắc: Dùng mã màu cứng như `#ef4444` (đỏ nguy hiểm), `#fffbeb` (nền cảnh báo), `#f59e0b` (vàng cảnh báo), và `#ccc` (xám) trực tiếp trong CSS thay vì khai báo token.

## Overall Impression
Giao diện chợ đồ cũ có bộ lọc hoạt động tốt, tuy nhiên thiết kế các khối thẻ sản phẩm và modal giao dịch còn đơn điệu, khoảng cách chưa tối ưu và còn nhiều mã style viết tay phá vỡ tính nhất quán của Design System.

## What's Working
1. **Bộ lọc danh mục trực quan**: Các nút chuyển danh mục (Category tabs) hoạt động mượt mà và chuyển đổi nhanh.
2. **Badge VNU nổi bật**: Huy hiệu xanh dương Verified VNU giúp tăng độ tin cậy của sản phẩm đăng bán.

## Priority Issues

* **[P1] Trôi lệch Tokens thiết kế**:
  * *Why it matters*: Làm mất đi tính đồng bộ của hệ thống giao diện, khiến ứng dụng trông giống như chắp vá từ nhiều nguồn.
  * *Fix*: Thay thế các giá trị bo góc `30px`, `8px` bằng các biến chuẩn `--radius-lg` (20px) hoặc `--radius-md` (12px), loại bỏ mã màu cứng.
  * *Suggested command*: `/impeccable polish customer_marketplace.html`
* **[P1] Hiệu ứng chuyển động nảy (Bounce easing)**:
  * *Why it matters*: Làm cho giao diện có cảm giác kém mượt mà, phi tự nhiên.
  * *Fix*: Thay thế `cubic-bezier(0.34, 1.56, 0.64, 1)` bằng transition chuẩn `cubic-bezier(0.4, 0, 0.2, 1)` (ease-standard).
  * *Suggested command*: `/impeccable animate customer_marketplace.html`
* **[P2] Thiếu phân cấp chữ rõ ràng (Single Font)**:
  * *Why it matters*: Làm tiêu đề chính và các thẻ sản phẩm bị chìm vào nhau, khó quét thông tin nhanh.
  * *Fix*: Tăng độ dày chữ tiêu đề lớn lên `800` hoặc `900` và giảm kích thước nhãn để tạo độ tương phản kích cỡ tốt hơn.
  * *Suggested command*: `/impeccable typeset customer_marketplace.html`
* **[P2] Modal thanh toán & giao nhận chật chội**:
  * *Why it matters*: Biểu mẫu thanh toán có mật độ thông tin quá cao, các ô nhập liệu sát nhau gây mỏi mắt cho khách hàng khi điền thông tin giao hàng.
  * *Fix*: Tăng khoảng giãn giữa các nhóm form-group lên `20px` và bo tròn các ô input theo chuẩn `12px` (`--radius-md`).
  * *Suggested command*: `/impeccable layout customer_marketplace.html`

## Persona Red Flags

* **Alex (Power User)**: Đơn hàng yêu cầu nhấp chuột quá nhiều bước (Click Xem chi tiết -> Click Đặt mua -> Nhập thông tin -> Xác nhận) mà không có phím tắt hỗ trợ.
* **Jordan (First-Timer)**: Không có hướng dẫn rõ ràng về việc Green Coins được quy đổi như thế nào khi lựa chọn phương thức thanh toán này trong checkout.
* **Sam (Accessibility)**: Trạng thái focus của các nút bấm và ô nhập liệu trong modal không rõ ràng, gây khó khăn cho việc điều hướng bằng bàn phím.

## Minor Observations
- Các thẻ ảnh sản phẩm bị mờ nhẹ ở một số kích thước màn hình do thuộc tính `object-fit: cover` trên khung chứa ảnh cố định.
- Font chữ hiển thị giá bán nên tăng kích thước để thu hút mắt người dùng hơn.

## Questions to Consider
- Làm cách nào để tối giản hóa biểu mẫu checkout từ 4 trường nhập xuống còn 2 trường (ví dụ tự động điền thông tin cũ của khách hàng)?
- Liệu chúng ta có nên làm nổi bật hơn nữa nút "Đăng bán sản phẩm" bằng một biểu tượng ấn tượng hơn?
