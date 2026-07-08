---
name: ECOcycle
description: Nền tảng Tái chế, Sửa chữa & Marketplace Đồ điện tử
colors:
  primary: "#1f9d47"
  primary-dark: "#167e35"
  primary-light: "#e8f9ec"
  accent: "#7c3aed"
  accent-light: "#f5f3ff"
  neutral-bg: "#f8fafc"
  neutral-text: "#0f172a"
  border: "#e2e8f0"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "Outfit, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
spacing:
  sm: "10px"
  md: "20px"
  lg: "30px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  card:
    backgroundColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "30px"
---

# Design System: ECOcycle

## 1. Overview

**Creative North Star: "Sự Giao Thoa Sinh Thái - Công Nghệ (The Eco-Tech Fusion)"**

ECOcycle là một hệ thống tinh tế và hiện đại, mang ngôn ngữ thiết kế tập trung tối đa vào trải nghiệm người dùng (Product-first). Nền tảng kết hợp nhuần nhuyễn sắc xanh lục của sinh thái tự nhiên với màu tím chuyển động mượt mà của công nghệ chẩn đoán AI. Thiết kế đề cao tính sạch sẽ, cấu trúc rõ ràng, khoảng thở rộng rãi và độ tương phản tối ưu nhằm giảm tải nhận thức và tăng tính tin cậy.

**Key Characteristics:**
- Trực quan và có tính điều hướng cao.
- Sử dụng các góc bo tròn lớn mềm mại tạo cảm giác thân thiện, hữu cơ.
- Chuyển động vi mô mượt mà phản hồi tức thì cho mọi hành động.

## 2. Colors

Bảng màu sử dụng sự tương phản chặt chẽ giữa sắc xanh lá thương hiệu và màu tím thông thái AI trên nền sáng trung tính sạch sẽ.

### Primary
- **Eco Green** (#1f9d47): Màu xanh sinh thái tươi mới đại diện cho các hành động cốt lõi, nút bấm chính, và biểu trưng tái chế.
- **Deep Forest Green** (#167e35): Phiên bản tối hơn để phục vụ các trạng thái hover hoặc nhấn mạnh văn bản.

### Secondary
- **AI Tech Purple** (#7c3aed): Đại diện cho các tính năng công nghệ thông minh, robot chẩn đoán lỗi, và các thẻ báo giá đề xuất của hệ thống.

### Neutral
- **Slate Text** (#0f172a): Màu mực chính cho tiêu đề lớn, sắc sảo và rõ ràng.
- **Slate Muted** (#64748b): Dùng cho văn bản mô tả phụ hoặc chú thích.
- **Background Light** (#f8fafc): Nền toàn trang tạo cảm giác thanh khiết, thư thái.
- **Border Slate** (#e2e8f0): Màu đường viền ngăn cách mảnh mai, tối giản.

**The Contrast Rule.** Văn bản và các nút chức năng luôn phải đạt độ tương phản tối thiểu 4.5:1 so với nền để bảo vệ khả năng đọc. Không dùng chữ xám mờ trên nền trắng.

## 3. Typography

**Display Font:** Outfit (fallback: sans-serif)
**Body Font:** Outfit (fallback: sans-serif)

**Character:** Font chữ Outfit mang tính hình học hiện đại, sắc sảo nhưng thân thiện nhờ các đường cong mở rộng, phù hợp lý tưởng cho cả tiêu đề công nghệ lẫn văn bản đọc.

### Hierarchy
- **Display** (800, clamp(2rem, 5vw, 3rem), 1.2): Dành cho tiêu đề lớn các trang, chào mừng người dùng.
- **Headline** (700, 1.4rem, 1.3): Tiêu đề các mục lớn, thẻ chức năng.
- **Title** (600, 1.1rem, 1.4): Tiêu đề nhỏ hoặc các nhãn thông tin.
- **Body** (400, 1rem, 1.5): Nội dung văn bản chính. Giới hạn độ dài dòng từ 65–75 ký tự để nâng cao trải nghiệm đọc.
- **Label** (600, 0.85rem, normal): Dành cho thẻ (badge), nút bấm hoặc trạng thái.

## 4. Elevation

Hệ thống sử dụng các lớp bóng mờ khuếch tán rộng để thể hiện độ nổi bề mặt, tạo cảm giác nhẹ nhàng, tránh bóng đổ đen dày lỗi thời.

### Shadow Vocabulary
- **Shadow Soft** (`0 2px 8px rgba(0, 0, 0, 0.04)`): Sử dụng cho các thẻ thông thường ở trạng thái tĩnh.
- **Shadow Lifted** (`0 10px 25px -5px rgba(0, 0, 0, 0.08)`): Sử dụng khi thẻ được hover hoặc các thông báo quan trọng nổi hẳn trên bề mặt.

**The Response Rule.** Mọi đổ bóng lớn chỉ xuất hiện khi có phản hồi trạng thái của người dùng (hover, focus) để tạo tính tương tác sống động.

## 5. Components

### Buttons
- **Shape:** Bo tròn lớn mềm mại (radius 20px trở lên).
- **Primary:** Nền xanh Eco Green, chữ trắng, padding (12px 24px).
- **Hover:** Chuyển mượt mà sang màu xanh Deep Forest Green, dịch chuyển nhẹ lên trên (translateY -2px).
- **Secondary:** Nền tím AI Tech Purple, chữ trắng, dành riêng cho các tác vụ AI hoặc tính năng đặc biệt.

### Cards / Containers
- **Corner Style:** Góc bo tròn lớn (radius 20px).
- **Background:** Trắng tinh khiết (#ffffff).
- **Border:** Viền mờ mỏng 1px (#e2e8f0) để định hình ranh giới.
- **Internal Padding:** Rộng rãi (30px) để tạo khoảng thở tốt.

### Inputs / Fields
- **Style:** Nền xám nhạt (#f9fafb), viền mảnh (#e2e8f0), bo tròn vừa (12px).
- **Focus:** Nổi viền xanh Eco Green kèm bóng tỏa mờ nhẹ.

## 6. Do's and Don'ts

### Do:
- **Do** Duy trì khoảng cách (padding/margin) lớn và nhất quán giữa các phần để giao diện thoáng đãng.
- **Do** Hiển thị rõ ràng các thẻ trạng thái (badge) đi kèm màu tương phản để người dùng dễ nhận biết.
- **Do** Sử dụng micro-animations (crossfade, ease-out-quad) cho các thao tác chọn lựa của khách hàng.

### Don't:
- **Don't** Sử dụng viền màu dày lệch một bên (border-left/right > 1px) làm điểm nhấn cho các hộp nội dung.
- **Don't** Thiết kế chữ tràn hoặc bị cắt (overflow) trên các màn hình di động nhỏ.
- **Don't** Viết hoa toàn bộ tiêu đề (All-caps display titles) gây cảm giác nặng nề.
