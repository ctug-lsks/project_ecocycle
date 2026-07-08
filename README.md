# ♻️ ECOcycle — Nền tảng Tái chế, Sửa chữa & Marketplace Đồ điện tử

ECOcycle là một hệ thống web tích hợp hỗ trợ người dùng phân loại, sửa chữa, tái chế rác thải điện tử, đồng thời cung cấp sàn giao dịch (Marketplace) để mua bán các sản phẩm công nghệ đã qua sử dụng. 

Hệ thống được tích hợp **Trợ lý AI chẩn đoán & định giá thông minh** (sử dụng Gemini AI API) chạy trực tiếp trong nhân máy chủ chính để tự động hóa việc phát hiện lỗi hỏng hóc, báo giá sửa chữa và đưa ra đề xuất tối ưu.

---

## 📂 Kiến trúc dự án & Phân chia thư mục

*   `server.js`: API Server chính điều phối dữ liệu & định tuyến cuộc gọi AI (chạy duy nhất cổng `3000`).
*   `modules/`:
    *   `diagnosisEngine.js`: Trái tim AI tích hợp của hệ thống, xử lý chẩn đoán tình trạng hỏng hóc (kết nối trực tiếp với Gemini AI 2.0) và tính toán khoảng giá trị thu mua dựa trên tình trạng thiết bị.
*   `datasets/`: Thư mục lưu trữ các tệp cơ sở dữ liệu JSON (`products.json`, `chats.json`, `messages.json`, `orders.json`, `repairOrders.json`, `processRequests.json`, `notifications.json`, `AI_assessments.json`).
*   Các tệp `.html` chính:
    *   `index.html`: Shell chính của ứng dụng sử dụng `<frameset>` để bao bọc header và nội dung.
    *   `header.html`: Thanh điều hướng chính, tích hợp thông báo đẩy thời gian thực.
    *   `customer_recycle.html`: Trang quản lý Sửa chữa & Tái chế thiết bị, tích hợp công cụ Chẩn đoán & Định giá AI nhanh.
    *   `customer_marketplace.html`: Sàn giao dịch đồ điện tử cũ (đã được tối ưu hóa giao diện chuẩn Design System).
    *   `customer_profile.html`: Quản lý hồ sơ, lịch sử giao dịch và danh sách sản phẩm đăng bán.
    *   `chat.html` & `chat_list.html`: Hệ thống chat động thời gian thực giữa Khách hàng và Cửa hàng sửa chữa.

---

## 🔑 Các luồng tính năng chính nổi bật

### 🤖 1. Trợ lý AI chẩn đoán & Định giá tích hợp
*   **Chẩn đoán lỗi**: Khi khách hàng tạo yêu cầu thu gom, AI phân tích mô tả lỗi để xác định mức độ hỏng hóc, thời gian xử lý và đưa ra ba đề xuất: Sửa chữa & dùng tiếp, Bán lại thu hồi vốn, hoặc Tái chế thân thiện môi trường.
*   **Định giá AI nhanh (Valuation Tab)**: Cho phép người dùng kiểm tra nhanh giá trị hiện tại của máy cũ dựa vào model và ngoại hình khai báo (Như mới, Đẹp, Trầy xước, Hư nhẹ, Hư nặng) trước khi quyết định đăng bài bán hoặc tái chế.
*   **Cơ chế Tự phục hồi (Local Fallback)**: Nếu vượt quá giới hạn lượt gọi (quota limits) hoặc gặp lỗi kết nối API Gemini, hệ thống tự động kích hoạt bộ máy so khớp logic cục bộ để phản hồi báo giá ngay lập tức mà không gây gián đoạn trải nghiệm người dùng.

### 📊 2. Theo dõi trạng thái & Mô phỏng quy trình (Tracking Suite)
*   Bảng theo dõi trạng thái đơn hàng thời gian thực kết nối chính xác giữa các yêu cầu thu gom (`processRequests.json`) và các đơn hàng liên kết (`repairOrders.json`, `resellOrders.json`, `recycleOders.json`).
*   **Bảng điều khiển mô phỏng (Simulation actions)** cho phép người dùng đóng vai trò bên vận chuyển/cửa hàng bấm chuyển trạng thái: *Gửi máy -> Bắt đầu xử lý -> Hoàn tất* trực quan.
*   Khắc phục triệt để lỗi xung đột mã định danh (ID Collision) giúp dữ liệu cập nhật chính xác và độc lập.

### 🎨 3. Chuẩn hóa Thiết kế (Impeccable Design System)
*   Trang chợ đồ cũ `customer_marketplace.html` được làm mịn toàn diện: loại bỏ hoàn toàn mã màu cứng và bo góc lệch chuẩn ngoài thiết kế.
*   Sử dụng đồng bộ các biến thiết kế từ `DESIGN.md` (`--radius-lg`, `--radius-md`, `--radius-sm`, `--primary-dark`, `--danger`, v.v.).
*   Loại bỏ chuyển động nảy (bounce easing) phi vật lý, thay thế bằng transition chuẩn mượt mà 60fps.

---

## 🚀 Hướng dẫn khởi chạy hệ thống

### Bước 1: Cài đặt thư viện
Yêu cầu hệ thống đã cài đặt **Node.js**. Chạy lệnh sau tại thư mục gốc của dự án:
```bash
npm install
```

### Bước 2: Thiết lập API Key cho AI
Tạo một tệp `.env` tại thư mục gốc của dự án và khai báo khóa API của bạn:
```env
GEMINI_API_KEY=Khóa_API_Gemini_Của_Bạn
```

### Bước 3: Khởi chạy Máy chủ tích hợp (Cổng 3000)
Khởi động máy chủ duy nhất điều phối cả API dữ liệu lẫn chẩn đoán AI:
```bash
npm start
```
*Hệ thống sẽ chạy tại địa chỉ: `http://localhost:3000`*

### Bước 4: Trải nghiệm ứng dụng
Mở trình duyệt và truy cập trực tiếp vào tệp:
`file:///path/to/project/index.html` hoặc chạy trên Live Server bất kỳ của bạn.

---

## 📊 Cơ cấu Cơ sở dữ liệu JSON (`datasets/`)

*   `users.json`: Thông tin khách hàng và cửa hàng liên kết.
*   `processRequests.json`: Lưu trữ các yêu cầu chẩn đoán gốc từ phía khách hàng.
*   `repairOrders.json`, `resellOrders.json`, `recycleOders.json`: Chi tiết trạng thái xử lý sau khi khách hàng chọn phương án hành động.
*   `AI_assessments.json`: Lưu trữ lịch sử kết quả thẩm định chẩn đoán lỗi từ Gemini AI.
*   `products.json`: Danh mục hàng hóa Marketplace.
*   `chats.json` & `messages.json`: Lịch sử chat thời gian thực.
*   `notifications.json`: Thông báo đẩy cá nhân hóa.