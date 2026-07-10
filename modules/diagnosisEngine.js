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

const REPAIR_TIME = {
    "phone": 2,
    "tablet": 2,
    "ram": 1,
    "ssd": 1,
    "cpu": 2,
    "gpu": 3,
    "pin": 1,
    "mainboard": 3,
    "phukien": 1,
    "default": 2
};

const WARRANTY = {
    "phone": 6,
    "tablet": 6,
    "ram": 12,
    "ssd": 12,
    "cpu": 12,
    "gpu": 6,
    "pin": 6,
    "mainboard": 6,
    "phukien": 3,
    "default": 6
};

function getDeviceCategory(deviceName) {
    if (!deviceName) return "default";
    const name = String(deviceName).toLowerCase();
    if (name.includes("iphone") || name.includes("dien thoai") || name.includes("phone")) return "phone";
    if (name.includes("ipad") || name.includes("tablet") || name.includes("may tinh bang")) return "tablet";
    if (name.includes("ram") || name.includes("o nho")) return "ram";
    if (name.includes("ssd") || name.includes("hdd") || name.includes("o cung")) return "ssd";
    if (name.includes("cpu") || name.includes("chip") || name.includes("vi xu ly")) return "cpu";
    if (name.includes("gpu") || name.includes("vga") || name.includes("card do hoa") || name.includes("card man hinh") || name.includes("rtx") || name.includes("gtx") || name.includes("radeon")) return "gpu";
    if (name.includes("pin") || name.includes("battery")) return "pin";
    if (name.includes("mainboard") || name.includes("bo mach chu") || name.includes("main")) return "mainboard";
    if (name.includes("tai nghe") || name.includes("chuot") || name.includes("ban phim") || name.includes("phu kien") || name.includes("charger") || name.includes("keyboard") || name.includes("mouse") || name.includes("phone head")) return "phukien";
    return "default";
}

async function analyzeWithAI(params) {
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
        Bạn là chuyên gia sửa chữa điện tử và định giá thiết bị cũ.
        Hãy phân tích thiết bị và tình trạng lỗi dưới đây rồi đưa ra chẩn đoán chính xác dưới dạng JSON.

        Nếu thông tin thiết bị nhập vào là thông tin rác (junk input), không liên quan đến đồ công nghệ/điện tử, hoặc có sự mâu thuẫn lớn giữa hãng sản xuất và tên máy (ví dụ chọn hãng Apple nhưng nhập Dell XPS), hãy đặt trường "invalid_input" thành true và nêu chi tiết danh sách lỗi nhập liệu trong mảng "errors", đồng thời gợi ý người dùng cần sửa đổi thông tin gì trong trường "recommendation".

        THÔNG TIN THIẾT BỊ:
        - Tên thiết bị: ${params.deviceName}
        - Hãng sản xuất: ${params.brand || 'Chưa rõ'}
        - Phân khúc/Loại máy: ${params.deviceType || 'Chưa rõ'}
        - Cấu hình (RAM/Bộ nhớ/Dung lượng): ${params.specs || 'Chưa rõ'}
        - Năm mua/Thời gian sử dụng: ${params.purchaseYear || 'Chưa rõ'}
        - Tình trạng ngoại hình: ${params.physicalCondition || 'Chưa rõ'}
        - Các lỗi phần cứng được chọn: ${params.hardwareIssues && params.hardwareIssues.length > 0 ? params.hardwareIssues.join(', ') : 'Không có'}
        - Mô tả chi tiết lỗi từ khách hàng: ${params.errorDescription || 'Chưa có'}

        LƯU Ý QUAN TRỌNG: Chỉ trả về JSON duy nhất với cấu trúc sau (không bao gồm markdown \`\`\`json hay văn bản thừa nào khác):
        {
          "invalid_input": true hoặc false,
          "errors": ["mảng danh sách lỗi hoặc điểm mâu thuẫn thông tin cần nhập lại"],
          "device_model": "Tên model chính xác kèm cấu hình",
          "detected_issues": ["mảng danh sách lỗi phát hiện từ checklist và mô tả"],
          "device_score": số_điểm_sức_khỏe_thiết_bị_từ_1_đến_10_ví_dụ_7.5,
          "severity": "nhẹ / trung bình / nặng",
          "repair_solution": "giải pháp sửa chữa đề xuất cụ thể",
          "repair_cost_estimate": chi_phí_ước_tính_bằng_số_ví_dụ_500000,
          "repair_time_days": số_ngày_sửa_bằng_số_ví_dụ_2,
          "can_repair": true hoặc false (thiết bị hỏng quá nặng, cháy nổ nát bét thì trả về false),
          "recommendation": "khuyến nghị cụ thể cho người dùng hoặc gợi ý thông tin cần cung cấp lại cho phù hợp"
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

// --- INPUT VALIDATION HELPER ---
function validateInput(params) {
    const name = String(params.deviceName || "").trim().toLowerCase();
    const model = String(params.deviceModel || "").trim().toLowerCase();
    const brand = String(params.brand || "").trim().toLowerCase();
    const type = String(params.deviceType || "").trim().toLowerCase();
    
    const errors = [];
    
    // Technology relevance keywords
    const techKeywords = [
        "phone", "iphone", "samsung", "galaxy", "xiaomi", "redmi", "oppo", "vivo", "realme", "nokia",
        "ipad", "tab", "tablet", "may tinh bang", "dien thoai", "mobile",
        "ram", "ddr", "corsair", "g.skill", "kingston", "transcend", "crucial",
        "ssd", "hdd", "wd", "seagate", "o cung", "nvme",
        "cpu", "intel", "amd", "ryzen", "core i", "celeron", "pentium",
        "gpu", "vga", "card", "nvidia", "geforce", "rtx", "gtx", "radeon", "rx ", "strix",
        "pin", "battery",
        "mainboard", "bo mach", "asus", "gigabyte", "msi", "asrock",
        "tai nghe", "chuot", "ban phim", "keyboard", "mouse", "headphone", "airpods", "phu kien", "cap", "sac", "adapter",
        "dell", "hp", "lenovo", "thinkpad", "macbook", "laptop", "acer", "sony", "vostro", "latitude", "inspiron", "watch", "xperia"
    ];
    
    const isTechRelated = techKeywords.some(k => name.includes(k) || model.includes(k) || type.toLowerCase().includes(k) || brand.includes(k));

    // 1. Check for blank or junk names
    if (name.length < 3) {
        errors.push("Tên thiết bị quá ngắn (vui lòng cung cấp tên sản phẩm rõ ràng tối thiểu 3 ký tự).");
    } else {
        // Gibberish matches
        const hasIdenticalRepeat = /([a-z0-9])\1{4,}/i.test(name);
        const isPureNumber = /^[0-9\s\-\.\+]+$/.test(name);
        
        // Keyboard smashes look for row sequences or long consonant blocks, and are not tech related
        const sequentialSmashes = ["asdfg", "sdfgh", "dfghj", "fghjk", "ghjkl", "qwerty", "wertyu", "ertyui", "rtyuio", "tyuiop", "zxcvb", "xcvbn", "cvbnm"];
        const hasSeqSmash = sequentialSmashes.some(seq => name.includes(seq));
        const hasRepeatingPair = /(\w{2,4})\1{2,}/i.test(name);
        const isAllConsonants = /^[bcdfghjklmnpqrstvwxz]{5,}$/i.test(name) && !["strix"].includes(name);

        const isKeyboardSmash = (hasSeqSmash || hasRepeatingPair || isAllConsonants) && !isTechRelated;
        
        if (hasIdenticalRepeat || isPureNumber || isKeyboardSmash) {
            errors.push("Tên sản phẩm chứa các ký tự lặp lại hoặc ký tự ngẫu nhiên không có thật (junk input).");
        }
    }
    
    // 2. Check for technology relation
    if (!isTechRelated && name.length > 0) {
        errors.push("Thiết bị hoặc linh kiện không thuộc danh mục công nghệ hoặc linh kiện điện tử được ECOcycle hỗ trợ.");
    }
    
    // 3. Brand & Name compatibility check
    if (brand === "apple") {
        const mismatchTerms = ["dell", "hp", "asus", "lenovo", "thinkpad", "acer", "samsung", "xiaomi", "redmi", "oppo", "vivo", "realme", "msi", "gigabyte", "intel", "amd", "nvidia", "sony"];
        if (mismatchTerms.some(term => name.includes(term))) {
            errors.push("Mâu thuẫn thông tin: Hãng sản xuất được chọn là Apple nhưng Tên sản phẩm lại thuộc thương hiệu khác.");
        }
    } else if (brand === "dell") {
        const mismatchTerms = ["iphone", "macbook", "ipad", "apple", "thinkpad", "asus", "hp", "acer", "samsung", "xiaomi", "redmi", "oppo", "vivo", "realme", "sony"];
        if (mismatchTerms.some(term => name.includes(term))) {
            errors.push("Mâu thuẫn thông tin: Hãng sản xuất được chọn là Dell nhưng Tên sản phẩm lại thuộc thương hiệu khác.");
        }
    } else if (brand === "samsung") {
        const mismatchTerms = ["iphone", "macbook", "ipad", "apple", "dell", "thinkpad", "hp", "asus", "msi", "gigabyte", "lenovo", "acer", "sony"];
        if (mismatchTerms.some(term => name.includes(term))) {
            errors.push("Mâu thuẫn thông tin: Hãng sản xuất được chọn là Samsung nhưng Tên sản phẩm lại thuộc thương hiệu khác.");
        }
    } else if (brand === "hp") {
        const mismatchTerms = ["iphone", "macbook", "ipad", "apple", "dell", "thinkpad", "asus", "msi", "gigabyte", "samsung", "lenovo", "acer", "sony"];
        if (mismatchTerms.some(term => name.includes(term))) {
            errors.push("Mâu thuẫn thông tin: Hãng sản xuất được chọn là HP nhưng Tên sản phẩm lại thuộc thương hiệu khác.");
        }
    } else if (brand === "asus") {
        const mismatchTerms = ["iphone", "macbook", "ipad", "apple", "dell", "thinkpad", "hp", "lenovo", "samsung", "acer", "sony"];
        if (mismatchTerms.some(term => name.includes(term))) {
            errors.push("Mâu thuẫn thông tin: Hãng sản xuất được chọn là Asus nhưng Tên sản phẩm lại thuộc thương hiệu khác.");
        }
    } else if (brand === "lenovo") {
        const mismatchTerms = ["iphone", "macbook", "ipad", "apple", "dell", "asus", "hp", "samsung", "acer", "sony"];
        if (mismatchTerms.some(term => name.includes(term))) {
            errors.push("Mâu thuẫn thông tin: Hãng sản xuất được chọn là Lenovo nhưng Tên sản phẩm lại thuộc thương hiệu khác.");
        }
    } else if (brand === "xiaomi") {
        const mismatchTerms = ["iphone", "macbook", "ipad", "apple", "dell", "hp", "thinkpad", "asus", "sony", "acer"];
        if (mismatchTerms.some(term => name.includes(term))) {
            errors.push("Mâu thuẫn thông tin: Hãng sản xuất được chọn là Xiaomi nhưng Tên sản phẩm lại thuộc thương hiệu khác.");
        }
    } else if (brand === "sony") {
        const mismatchTerms = ["iphone", "macbook", "ipad", "apple", "dell", "hp", "thinkpad", "asus", "samsung", "xiaomi", "redmi", "lenovo", "acer"];
        if (mismatchTerms.some(term => name.includes(term))) {
            errors.push("Mâu thuẫn thông tin: Hãng sản xuất được chọn là Sony nhưng Tên sản phẩm lại thuộc thương hiệu khác.");
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// --- MAIN EXPORTED FUNCTION ---

async function diagnoseDevice(paramsOrName, errorDescription) {
    let params = {};
    if (typeof paramsOrName === 'object' && paramsOrName !== null) {
        params = paramsOrName;
    } else {
        params = {
            deviceName: paramsOrName,
            errorDescription: errorDescription || '',
            brand: '',
            deviceType: '',
            specs: '',
            purchaseYear: '',
            physicalCondition: '',
            hardwareIssues: []
        };
    }

    // Input Validation Guard
    const validation = validateInput(params);
    if (!validation.isValid) {
        console.log(`⚠️ Phát hiện thông tin rác/không tương thích khi chẩn đoán: ${params.deviceName}`);
        return {
            invalid_input: true,
            errors: validation.errors,
            device_model: params.deviceName || "Thiết bị không xác định",
            recommendation: "Vui lòng điều chỉnh thông tin: " + validation.errors.join(" "),
            detected_issues: ["Dữ liệu nhập liệu không hợp lệ"],
            device_score: 0,
            severity: "không xác định",
            can_repair: false,
            repair_solution: "Không thể chẩn đoán do thông tin nhập vào sai lệch hoặc không có thật.",
            repair_cost: 0,
            repair_time_days: 0,
            warranty_months: 0,
            resell_price_after_repair: 0
        };
    }

    const deviceName = params.deviceName;
    const errorDesc = params.errorDescription || '';
    
    let category = getDeviceCategory(deviceName);
    if (category === "default" && params.deviceType) {
        category = getDeviceCategory(params.deviceType);
    }
    
    console.log(`\n🔧 [Tích Hợp] Đang chẩn đoán: ${deviceName}`);
    console.log(`📱 Loại thiết bị: ${category}`);
    
    const aiResult = await analyzeWithAI(params);
    let result;
    
    if (aiResult && aiResult.device_model) {
        console.log('✅ Dùng kết quả phân tích trực tiếp từ Gemini AI');
        let repairCost = aiResult.repair_cost_estimate || 500000;
        
        result = {
            device_model: aiResult.device_model || deviceName,
            device_category: category,
            detected_issues: aiResult.detected_issues || ["Cần kiểm tra thực tế"],
            device_score: aiResult.device_score || 7.0,
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
        
        // --- LOGIC CHẨN ĐOÁN CỤC BỘ NÂNG CẤP ---
        let basePrice = 3000000;
        if (category === "phone") basePrice = 12000000;
        else if (category === "tablet") basePrice = 6000000;
        else if (category === "ram") basePrice = 1200000;
        else if (category === "ssd") basePrice = 1500000;
        else if (category === "cpu") basePrice = 5000000;
        else if (category === "gpu") basePrice = 8000000;
        else if (category === "pin") basePrice = 1000000;
        else if (category === "mainboard") basePrice = 3500000;
        else if (category === "phukien") basePrice = 800000;
        
        // Khấu hao theo cấu hình specs
        const specsText = String(params.specs || "").toLowerCase();
        if (specsText.includes("256gb") || specsText.includes("16gb")) basePrice = Math.floor(basePrice * 1.1);
        if (specsText.includes("512gb") || specsText.includes("32gb")) basePrice = Math.floor(basePrice * 1.25);
        if (specsText.includes("1tb") || specsText.includes("64gb")) basePrice = Math.floor(basePrice * 1.5);
        
        // Khấu hao theo năm sử dụng
        const purchaseYear = parseInt(params.purchaseYear) || 2024;
        const yearsOfUse = Math.max(0, 2026 - purchaseYear);
        const ageMultiplier = Math.max(0.3, 1 - (yearsOfUse * 0.12)); // giảm 12% mỗi năm, tối thiểu còn 30%
        
        // Khấu hao theo ngoại hình
        let conditionMultiplier = 0.75;
        let condDeduction = 1.5;
        const cond = String(params.physicalCondition || params.errorDescription || "trung bình").toLowerCase();
        if (cond.includes("như mới") || cond.includes("nhu moi") || cond.includes("99%")) {
            conditionMultiplier = 0.95;
            condDeduction = 0;
        } else if (cond.includes("đẹp") || cond.includes("dep") || cond.includes("xước nhẹ")) {
            conditionMultiplier = 0.85;
            condDeduction = 0.5;
        } else if (cond.includes("trầy xước") || cond.includes("cũ")) {
            conditionMultiplier = 0.7;
            condDeduction = 1.5;
        } else if (cond.includes("bể") || cond.includes("vỡ") || cond.includes("móp")) {
            conditionMultiplier = 0.5;
            condDeduction = 2.5;
        }
        
        // Tính toán chi phí sửa chữa động theo lỗi tích chọn
        let repairCost = 0;
        const issues = [];
        const hardwareIssues = params.hardwareIssues || [];
        
        if (hardwareIssues.length > 0) {
            hardwareIssues.forEach(issue => {
                issues.push(issue);
            });
            // Mỗi lỗi làm tăng chi phí sửa chữa thêm 25% giá gốc linh kiện, tối đa 80%
            repairCost = Math.min(basePrice * 0.8, Math.floor(basePrice * 0.25 * hardwareIssues.length));
        } else {
            issues.push("Chờ kiểm tra linh kiện trực tiếp");
            repairCost = Math.floor(basePrice * 0.1); // 10% giá gốc để kiểm định
        }
        
        // Tính điểm sức khỏe thiết bị (Health Score) động từ 1 đến 10
        let healthScore = 10 - (yearsOfUse * 0.8) - condDeduction - (hardwareIssues.length * 1.5);
        healthScore = Math.max(1.0, Math.min(10.0, Math.round(healthScore * 10) / 10));
        
        const finalResellPrice = Math.max(200000, Math.floor(basePrice * ageMultiplier * conditionMultiplier));
        
        result = {
            device_model: deviceName,
            device_category: category,
            detected_issues: issues,
            device_score: healthScore,
            severity: repairCost > (basePrice * 0.5) ? "nặng" : (repairCost > (basePrice * 0.2) ? "trung bình" : "nhẹ"),
            can_repair: repairCost < (basePrice * 0.75), // không sửa nếu chi phí sửa vượt quá 75% giá trị gốc
            repair_solution: hardwareIssues.length > 0 
                ? `Khắc phục/Thay thế linh kiện gặp lỗi: ${hardwareIssues.join(', ')}`
                : "Kiểm tra kỹ thuật tổng quát, đo đạc nguồn và mạch điện.",
            repair_cost: repairCost,
            repair_time_days: REPAIR_TIME[category] || 2,
            warranty_months: WARRANTY[category] || 6,
            resell_price_after_repair: finalResellPrice,
            center_info: CENTER_INFO,
            recommendation: "Mang máy đến trung tâm liên kết ECOcycle để được kiểm định và nhận báo giá chính xác",
            ai_used: false
        };
    }
    
    console.log(`💰 Giá sửa: ${result.repair_cost.toLocaleString('vi-VN')}đ`);
    console.log(`🤖 Sử dụng AI: ${result.ai_used ? 'CÓ' : 'KHÔNG'}`);
    return result;
}

function priceUsedProduct(deviceModel, condition, brand, deviceType, specs, purchaseYear) {
    let category = getDeviceCategory(deviceModel);
    if (category === "default" && deviceType) {
        category = getDeviceCategory(deviceType);
    }
    
    let basePrice = 3000000;
    if (category === "phone") basePrice = 12000000;
    else if (category === "tablet") basePrice = 6000000;
    else if (category === "ram") basePrice = 1200000;
    else if (category === "ssd") basePrice = 1500000;
    else if (category === "cpu") basePrice = 5000000;
    else if (category === "gpu") basePrice = 8000000;
    else if (category === "pin") basePrice = 1000000;
    else if (category === "mainboard") basePrice = 3500000;
    else if (category === "phukien") basePrice = 800000;
    
    // Khấu hao theo cấu hình specs
    const specsText = String(specs || "").toLowerCase();
    if (specsText.includes("256gb") || specsText.includes("16gb")) basePrice = Math.floor(basePrice * 1.1);
    if (specsText.includes("512gb") || specsText.includes("32gb")) basePrice = Math.floor(basePrice * 1.25);
    if (specsText.includes("1tb") || specsText.includes("64gb")) basePrice = Math.floor(basePrice * 1.5);
    
    // Khấu hao theo năm sử dụng
    const year = parseInt(purchaseYear) || 2024;
    const yearsOfUse = Math.max(0, 2026 - year);
    const ageMultiplier = Math.max(0.3, 1 - (yearsOfUse * 0.12)); // giảm 12% mỗi năm, tối thiểu còn 30%
    
    let multiplier = 0.7;
    switch (condition.toLowerCase()) {
        case "như mới":
            multiplier = 0.95;
            break;
        case "đẹp":
            multiplier = 0.85;
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
    
    const estimatedPrice = Math.floor(basePrice * ageMultiplier * multiplier);
    
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
