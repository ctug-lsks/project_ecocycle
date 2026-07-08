# ♻️ ECOcycle — Nền tảng Tái chế, Sửa chữa & Marketplace Đồ điện tử

ECOcycle là một hệ thống web tích hợp hỗ trợ người dùng phân loại, sửa chữa, tái chế rác thải điện tử, đồng thời cung cấp sàn giao dịch (Marketplace) để mua bán các sản phẩm công nghệ đã qua sử dụng. Hệ thống hỗ trợ tích hợp trợ lý AI (RepairAI) để chẩn đoán lỗi thiết bị tự động.

---

## 📂 Kiến trúc dự án & Phân chia thư mục

*   `server.js`: API Server chính điều phối dữ liệu (chạy cổng `3000`).
*   `datasets/`: Thư mục lưu trữ các tệp cơ sở dữ liệu JSON (`products.json`, `chats.json`, `messages.json`, `orders.json`, `repairOrders.json`, `processRequests.json`, `notifications.json`).
*   `RepairAI_New/`: Module AI thông minh tự động chẩn đoán lỗi và đề xuất mức phí sửa chữa/thu mua (chạy cổng `3001`).
*   Các tệp `.html` chính:
    *   `index.html`: Shell chính của ứng dụng sử dụng `<frameset>` để bao bọc header và nội dung.
    *   `header.html`: Thanh công cụ điều hướng chính, tích hợp thông báo đẩy thời gian thực.
    *   `customer_marketplace.html`: Sàn giao dịch đồ điện tử cũ.
    *   `customer_profile.html`: Quản lý hồ sơ, lịch sử giao dịch và danh sách các sản phẩm đang đăng bán của cá nhân.
    *   `chat.html`: Trang tin nhắn thời gian thực dành cho vai trò Khách hàng.
    *   `chat_list.html`: Trang tin nhắn thời gian thực dành cho vai trò Cửa hàng sửa chữa.

---

## 🔑 Các luồng tính năng chính đã được tối ưu hóa

### 1. Luồng Khách hàng (Customer)
*   **Marketplace & Tự động phòng ngừa tự chat**: Khi xem chi tiết sản phẩm, nếu sản phẩm đó do chính bạn đăng bán, hệ thống sẽ ẩn các nút "Chat với người bán" / "Đặt mua ngay" và hiển thị thông báo: `ℹ️ Đây là sản phẩm do bạn đang đăng bán`.
*   **Quản lý sản phẩm đang bán (My Listings)**: Tích hợp tab **"Sản phẩm đang bán"** trong hồ sơ cá nhân giúp người dùng dễ dàng theo dõi và "Gỡ bán" (Unlist) trực tiếp qua API `DELETE`.
*   **Hệ thống thông báo đẩy (Notification Bell)**:
    *   Biểu tượng Chuông trên Header tự động tải số lượng thông báo chưa đọc của tài khoản và hiển thị badge đỏ.
    *   Click vào chuông hiển thị Dropdown thông báo chi tiết, hỗ trợ "Đánh dấu đã đọc" từng thông báo hoặc "Đã đọc tất cả".

### 2. Luồng Cửa hàng sửa chữa (Repair Store)
*   **Trang Chat Cửa hàng (`chat_list.html`)**: Chuyển đổi từ giao diện mẫu tĩnh thành hệ thống Chat động thời gian thực của cửa hàng sửa chữa (sử dụng `storeId`).
*   **Liên kết đơn hàng sửa chữa**: Khung tin nhắn tự động lọc và hiển thị danh sách các **Đơn hàng sửa chữa gần đây** phát sinh trực tiếp giữa Cửa hàng và Khách hàng đang chat bằng cách khớp nối dữ liệu giữa `repairOrders.json` và `processRequests.json`.

### 3. Luồng Tin nhắn đồng bộ (Sync Chat Flow)
*   Tối giản hóa giao diện chat: Loại bỏ hoàn toàn các nút chức năng thừa (gọi thoại, gọi video, đính kèm, xem shop) để tập trung vào trải nghiệm nhắn tin văn bản nhanh và nhẹ.
*   Cung cấp tính năng click **"Xem hồ sơ"** để tra cứu chi tiết số điện thoại, địa chỉ, email của đối tác đang trò chuyện.

---

## 🚀 Hướng dẫn khởi chạy hệ thống

### Bước 1: Cài đặt thư viện
Yêu cầu hệ thống đã cài đặt sẵn **Node.js**. Chạy lệnh sau tại thư mục gốc của dự án để cài đặt các package phụ thuộc:
```bash
npm install
```

### Bước 2: Chạy Server dữ liệu chính (Cổng 3000)
Mở terminal tại thư mục gốc của dự án và chạy:
```bash
npm start
```
*Server dữ liệu sẽ chạy tại địa chỉ: `http://localhost:3000`*

### Bước 3: Chạy Server RepairAI chẩn đoán lỗi (Cổng 3001)
Mở terminal thứ hai, di chuyển vào thư mục `RepairAI_New` và chạy:
```bash
cd RepairAI_New
npm start
```
*RepairAI server sẽ chạy tại địa chỉ: `http://localhost:3001`*

### Bước 4: Trải nghiệm ứng dụng
Mở trình duyệt và truy cập trực tiếp vào tệp:
`file:///path/to/project/index.html` hoặc chạy trên Live Server bất kỳ của bạn.

---

## 📊 Cơ cấu Cơ sở dữ liệu JSON (`datasets/`)

*   `users.json`: Danh sách người dùng (Khách hàng, Cửa hàng sửa chữa).
*   `products.json`: Danh mục hàng hóa Marketplace lồng nhiều tầng.
*   `chats.json` & `messages.json`: Lưu trữ các phòng chat và lịch sử hội thoại.
*   `orders.json`: Hóa đơn mua bán sản phẩm trên Marketplace.
*   `repairOrders.json`: Các đơn nhận sửa chữa thiết bị của Cửa hàng.
*   `notifications.json`: Danh sách thông báo đẩy cá nhân hóa cho từng khách hàng.