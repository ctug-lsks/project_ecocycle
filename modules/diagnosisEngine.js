const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

let genAI = null;
let model = null;

function initGemini() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('❌ GEMINI_API_KEY không tồn tại');
            return false;
        }
        genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-lite',
            generationConfig: {
                temperature: 0.4,
                responseMimeType: 'application/json'
            }
        });
        console.log('✅ Gemini AI đã sẵn sàng (Tích hợp Server 3000)');
        return true;
    } catch (error) {
        console.error('❌ Lỗi khởi tạo Gemini:', error);
        return false;
    }
}

// Khởi tạo
initGemini();

// --- DATA MODULES PORTED ---

const CENTER_INFO = {
    name: "Trung tâm Sửa chữa Điện tử ABC",
    address: "123 Đường XYZ, Quận 1, TP.HCM",
    hotline: "1900 1234",
    email: "support@suachuaabc.com",
    working_hours: "8:00 - 20:00 (Thứ 2 - Chủ nhật)",
    facebook: "fb.com/suachuaabc",
    zalo: "19001234"
};

const PRICE_LIST = {
    "iphone:man hinh vo": 1200000,
    "iphone:man hinh den": 1500000,
    "iphone:man hinh cam ung loi": 1300000,
    "iphone:pin nhanh het": 500000,
    "iphone:khong sac": 400000,
    "iphone:loa roi": 350000,
    "iphone:mat nguon": 800000,
    "iphone:mat camera": 600000,
    "iphone:nut nguon hong": 300000,
    "iphone:vo nhieu": 800000,
    
    "samsung:man hinh vo": 1100000,
    "samsung:man hinh den": 1300000,
    "samsung:pin nhanh het": 450000,
    "samsung:khong sac": 400000,
    "samsung:loa roi": 300000,
    "samsung:mat nguon": 700000,
    
    "laptop:man hinh vo": 1800000,
    "laptop:man hinh nhoa": 1500000,
    "laptop:ban phim hong": 400000,
    "laptop:pin nhanh het": 700000,
    "laptop:khong len nguon": 500000,
    "laptop:mat nguon": 600000,
    "laptop:loa roi": 350000,
    
    "tai nghe:khong len nguon": 200000,
    "tai nghe:mat tieng trai": 150000,
    "tai nghe:loi ket noi": 100000,
    
    "default": 500000
};

const REPAIR_TIME = {
    "iphone": 2,
    "samsung": 2,
    "laptop": 3,
    "tai nghe": 1,
    "default": 2
};

const WARRANTY = {
    "iphone": 6,
    "samsung": 6,
    "laptop": 3,
    "tai nghe": 3,
    "default": 6
};

const ISSUE_PATTERNS = {
    "man hinh vo": {
        issues: ["màn hình vỡ", "màn hình nứt", "vỡ màn hình", "màn hình bể", "bể màn hình", "nứt màn hình", "vỡ kính"],
        solution: "Thay màn hình mới chính hãng, kiểm tra cảm ứng",
        severity: "nặng"
    },
    "man hinh den": {
        issues: ["màn hình đen", "tối màn hình", "không sáng", "màn hình tối", "mất hình"],
        solution: "Kiểm tra và thay thế màn hình hoặc nguồn sáng",
        severity: "nặng"
    },
    "man hinh cam ung loi": {
        issues: ["cảm ứng loạn", "cảm ứng chậm", "chạm không chuẩn", "cảm ứng không nhạy"],
        solution: "Vệ sinh hoặc thay mặt kính cảm ứng",
        severity: "trung bình"
    },
    "pin nhanh het": {
        issues: ["pin nhanh hết", "tụt pin nhanh", "pin chai", "sạc đầy nhanh hết", "pin yếu"],
        solution: "Thay pin mới chính hãng, dung lượng cao",
        severity: "trung bình"
    },
    "khong sac": {
        issues: ["không sạc", "không vào điện", "sạc không lên", "cắm sạc không vào", "không nhận sạc"],
        solution: "Kiểm tra và thay cổng sạc hoặc IC sạc",
        severity: "trung bình"
    },
    "loa roi": {
        issues: ["loa rè", "loa nhỏ", "không có tiếng", "mất tiếng", "loa hỏng", "âm thanh rè"],
        solution: "Thay loa mới hoặc vệ sinh loa",
        severity: "nhẹ"
    },
    "mat nguon": {
        issues: ["không lên nguồn", "chết nguồn", "không bật", "tắt nguồn", "không khởi động"],
        solution: "Kiểm tra và sửa chữa mainboard",
        severity: "nặng"
    },
    "mat camera": {
        issues: ["camera mờ", "camera không chụp", "hỏng camera", "mất camera", "camera bị mờ"],
        solution: "Thay camera mới hoặc vệ sinh camera",
        severity: "trung bình"
    },
    "vo canh": {
        issues: ["xước thân máy", "trầy xước", "xước mặt lưng", "trầy nhẹ", "trầy cạnh"],
        solution: "Đánh bóng hoặc thay vỏ mới nếu khách yêu cầu",
        severity: "nhẹ"
    },
    "nut hong": {
        issues: ["nút nguồn hỏng", "nút âm lượng hỏng", "kẹt nút", "nút không nhấn được"],
        solution: "Thay cụm nút mới",
        severity: "nhẹ"
    },
    "default": {
        issues: [],
        solution: "Kiểm tra tổng thể và báo giá chi tiết",
        severity: "chưa xác định"
    }
};

function getDeviceCategory(deviceName) {
    const name = deviceName.toLowerCase();
    if (name.includes("iphone")) return "iphone";
    if (name.includes("samsung") || name.includes("galaxy")) return "samsung";
    if (name.includes("oppo") || name.includes("vivo") || name.includes("xiaomi")) return "xiaomi";
    if (name.includes("laptop") || name.includes("dell") || name.includes("hp") || name.includes("lenovo") || name.includes("asus") || name.includes("macbook")) return "laptop";
    if (name.includes("tai nghe") || name.includes("airpod") || name.includes("earphone")) return "tai nghe";
    if (name.includes("ipad") || name.includes("tablet")) return "tablet";
    return "default";
}

async function analyzeWithAI(deviceName, errorDescription) {
    try {
        if (!model) {
            console.log('🔄 Đang thử khởi động lại Gemini...');
            const success = initGemini();
            if (!success || !model) {
                console.log('⚠️ Không thể khởi động Gemini AI');
                return null;
            }
        }

        const prompt = `
        Bạn là chuyên gia sửa chữa điện tử.
        Hãy phân tích thiết bị và tình trạng lỗi dưới đây rồi đưa ra chẩn đoán chính xác dưới dạng JSON.

        Thiết bị: ${deviceName}
        Mô tả lỗi: ${errorDescription}

        LƯU Ý QUAN TRỌNG: Chỉ trả về JSON duy nhất với cấu trúc sau (không bao gồm markdown \`\`\`json hay văn bản thừa nào khác):
        {
          "device_model": "Tên model chính xác từ thiết bị",
          "detected_issues": ["mảng danh sách lỗi phát hiện"],
          "severity": "nhẹ / trung bình / nặng",
          "repair_solution": "giải pháp sửa chữa đề xuất",
          "repair_cost_estimate": chi_phí_ước_tính_bằng_số_ví_dụ_500000,
          "repair_time_days": số_ngày_sửa_bằng_số_ví_dụ_2,
          "can_repair": true hoặc false (thiết bị hỏng quá nặng, cháy nổ nát bét thì trả về false),
          "recommendation": "khuyến nghị cho người dùng"
        }
        `;

        console.log('📤 Đang gửi yêu cầu phân tích lỗi tới Gemini...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
        
        console.log('📥 Phản hồi từ Gemini:', text);

        // Remove potential markdown code blocks
        let cleanText = text;
        if (cleanText.startsWith('```json')) {
            cleanText = cleanText.substring(7);
        } else if (cleanText.startsWith('```')) {
            cleanText = cleanText.substring(3);
        }
        if (cleanText.endsWith('```')) {
            cleanText = cleanText.substring(0, cleanText.length - 3);
        }
        cleanText = cleanText.trim();

        const data = JSON.parse(cleanText);
        console.log('✅ Chuyển đổi JSON Gemini thành công');
        return data;

    } catch (error) {
        console.error('❌ Lỗi kết nối Gemini API:', error);
        return null;
    }
}

// --- MAIN EXPORTED FUNCTION ---

async function diagnoseDevice(deviceName, errorDescription) {
    console.log(`\n🔧 [Tích Hợp] Đang chẩn đoán: ${deviceName}`);
    console.log(`📝 Mô tả lỗi: ${errorDescription}`);
    
    const category = getDeviceCategory(deviceName);
    console.log(`📱 Loại thiết bị: ${category}`);
    
    const aiResult = await analyzeWithAI(deviceName, errorDescription);
    let result;
    
    if (aiResult && aiResult.device_model) {
        console.log('✅ Dùng kết quả phân tích trực tiếp từ Gemini AI');
        let repairCost = aiResult.repair_cost_estimate || 500000;
        
        // So khớp lại với bảng giá tĩnh để đảm bảo tính nhất quán
        const error = errorDescription.toLowerCase();
        for (const [patternKey, price] of Object.entries(PRICE_LIST)) {
            const [patternCategory, patternIssue] = patternKey.split(":");
            if (patternCategory === category && error.includes(patternIssue)) {
                repairCost = price;
                break;
            }
        }
        
        if (error.includes("bể màn hình") || error.includes("vỡ màn hình")) {
            if (category === "iphone") repairCost = 1200000;
            else if (category === "samsung") repairCost = 1100000;
            else repairCost = 1000000;
        }
        
        result = {
            device_model: aiResult.device_model || deviceName,
            device_category: category,
            detected_issues: aiResult.detected_issues || ["Cần kiểm tra thực tế"],
            severity: aiResult.severity || "trung bình",
            can_repair: aiResult.can_repair !== false,
            repair_solution: aiResult.repair_solution || "Kiểm tra trực tiếp tại cửa hàng",
            repair_cost: repairCost,
            repair_time_days: aiResult.repair_time_days || REPAIR_TIME[category] || 2,
            warranty_months: WARRANTY[category] || 6,
            resell_price_after_repair: Math.floor(repairCost * 5 * 0.6),
            center_info: CENTER_INFO,
            recommendation: aiResult.recommendation || "Mang máy đến điểm thu gom gần nhất để kỹ thuật viên kiểm tra trực tiếp",
            ai_used: true
        };
    } else {
        console.log('⚠️ Dùng logic chẩn đoán cục bộ (Fallback do AI không phản hồi)');
        let repairCost = 500000;
        const error = errorDescription.toLowerCase();
        
        if (error.includes("bể màn hình") || error.includes("vỡ màn hình")) {
            if (category === "iphone") repairCost = 1200000;
            else if (category === "samsung") repairCost = 1100000;
            else repairCost = 1000000;
        } else if (error.includes("pin") && (error.includes("yếu") || error.includes("nhanh hết") || error.includes("chai"))) {
            repairCost = 450000;
        }
        
        const issues = [];
        if (error.includes("bể màn hình") || error.includes("vỡ màn hình")) issues.push("Màn hình bị vỡ/nứt kính");
        if (error.includes("trầy") || error.includes("xước")) issues.push("Vỏ ngoài trầy xước nhiều");
        if (error.includes("pin") && (error.includes("yếu") || error.includes("chai") || error.includes("nhanh hết"))) {
            issues.push("Pin giảm tuổi thọ (chai pin)");
        }
        if (issues.length === 0) issues.push("Chờ kiểm định phần cứng trực tiếp");
        
        result = {
            device_model: deviceName,
            device_category: category,
            detected_issues: issues,
            severity: "trung bình",
            can_repair: true,
            repair_solution: issues.length > 1 ? "Thay thế màn hình mới, bảo dưỡng tổng thể, hỗ trợ thay pin" : "Thay linh kiện màn hình mới, vệ sinh máy",
            repair_cost: repairCost,
            repair_time_days: REPAIR_TIME[category] || 2,
            warranty_months: WARRANTY[category] || 6,
            resell_price_after_repair: Math.floor(repairCost * 5 * 0.6),
            center_info: CENTER_INFO,
            recommendation: "Mang máy đến trung tâm liên kết ECOcycle để được kiểm định miễn phí và báo giá chính xác",
            ai_used: false
        };
    }
    
    console.log(`💰 Giá sửa: ${result.repair_cost.toLocaleString('vi-VN')}đ`);
    console.log(`🤖 Sử dụng AI: ${result.ai_used ? 'CÓ' : 'KHÔNG'}`);
    return result;
}

function priceUsedProduct(deviceModel, condition) {
    const category = getDeviceCategory(deviceModel);
    
    let basePrice = 0;
    for (const [key, price] of Object.entries(PRICE_LIST)) {
        if (key.includes(category) && key !== "default") {
            basePrice = price * 5; 
            break;
        }
    }
    
    if (basePrice === 0) basePrice = 3000000;
    
    let multiplier = 1;
    switch (condition.toLowerCase()) {
        case "như mới":
            multiplier = 0.9;
            break;
        case "đẹp":
            multiplier = 0.8;
            break;
        case "trầy xước":
            multiplier = 0.7;
            break;
        case "hư hỏng nhẹ":
            multiplier = 0.5;
            break;
        case "hư hỏng nặng":
            multiplier = 0.3;
            break;
        default:
            multiplier = 0.7;
    }
    
    const estimatedPrice = Math.floor(basePrice * multiplier);
    
    return {
        estimated_price: estimatedPrice,
        price_range: {
            min: Math.floor(estimatedPrice * 0.8),
            max: Math.floor(estimatedPrice * 1.2)
        },
        condition_note: getConditionNote(condition),
        device_category: category
    };
}

function getConditionNote(condition) {
    const notes = {
        "như mới": "Thiết bị giống như mới, còn bảo hành",
        "đẹp": "Sử dụng nhẹ nhàng, ít xước",
        "trầy xước": "Có vết trầy nhẹ, hoạt động tốt",
        "hư hỏng nhẹ": "Hư nhẹ, cần sửa ít tiền",
        "hư hỏng nặng": "Hư nhiều, cần sửa nhiều"
    };
    return notes[condition] || "Tình trạng trung bình";
}

function priceBrokenDevice(deviceModel, repairCost) {
    const sellPrice = repairCost * 5 * 0.6; 
    return Math.floor(sellPrice - repairCost);
}

module.exports = {
    diagnoseDevice,
    initGemini,
    priceUsedProduct,
    priceBrokenDevice
};
