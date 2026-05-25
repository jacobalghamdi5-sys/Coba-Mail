-- 🔒 CMAIL ECOSYSTEM - HIGH-SPEED LUA CREDENTIAL PAYLOAD FILTER
local PayloadScanner = {}

PayloadScanner.forbiddenCharacterPatterns = { "%%", "'", "\"", ";", "--" }

function PayloadScanner.isInputStringSecure(userInputString)
    print("🔍 Lua Security Shield: Evaluating string input parameters text: '" .. userInputString .. "'")
    
    for _, pattern in ipairs(PayloadScanner.forbiddenCharacterPatterns) do
        if string.find(userInputString, pattern) then
            print("🚨 SECURITY THREAT: Found invalid string character match: '" .. pattern .. "'")
            return false -- Input is dangerous, drop packet node immediately
        end
    end
    
    print("💚 CHECKPOINT SUCCESS: String parameters passed all encryption constraints.")
    return true
end

-- Simulating a safe test connection login entry checking pass
local testResult = PayloadScanner.isInputStringSecure("JacobAlghamdi5_sys")
print("Lua Verification Return Status Code: " .. tostring(testResult))
