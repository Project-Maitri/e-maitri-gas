// 1. नार्ड विंडो का ग्लोबल रेफरेंस (इसे पेज के टॉप पर रखें)
let nardWindow = null;

/**
 * 2. नार्ड टैब को खोलने वाला फंक्शन
 * इसे आपके फ्लोटिंग आइकॉन के 'onclick' इवेंट पर कॉल करना है।
 */
function openNardApp() {
    // नार्ड (Chatbot) का यूआरएल
    const nardUrl = "https://project-maitri.github.io/Gen-Z-ai-Chatbot/";
    
    // 'NardChat' नाम बहुत ज़रूरी है ताकि postMessage इसे पहचान सके
    nardWindow = window.open(nardUrl, "NardChat");
    
    if (nardWindow) {
        console.log("Nard टैब सफलतापूर्वक खुल गया है।");
        // शुरुआती कॉन्टेक्स्ट भेजें
        setTimeout(() => {
            sendContextToNard("E-MAITRI", "पोर्टल से नार्ड ऐप खोला गया है।");
        }, 2000);
    } else {
        alert("कृपया पॉप-अप ब्लॉकर को अनुमति दें ताकि Nard खुल सके।");
    }
}

/**
 * 3. नार्ड को 'कंटेक्स्ट' (डेटा) भेजने वाला मुख्य फंक्शन
 * @param {string} section - पोर्टल का विभाग (e.g., 'बूथ प्रबंधन')
 * @param {string} details - यूजर क्या देख रहा है (e.g., 'कार्यकर्ताओं की लिस्ट')
 */
function sendContextToNard(section, details) {
    if (nardWindow && !nardWindow.closed) {
        const payload = {
            type: "CONTEXT_UPDATE",
            page: section,
            info: details
        };
        
        // डेटा भेजना
        nardWindow.postMessage(payload, "*"); 
        console.log("Nard को अपडेट भेजा गया: ", section);
    } else {
        console.warn("Nard टैब खुला नहीं है या बंद हो चुका है।");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    // Initial tracking for current page
    const pageTitle = document.title || "E-MAITRI";
    sendContextToNard(pageTitle, "यूजर ने पेज लोड किया है।");

    // Language Toggle Logic (Visual Only)
    const btnHi = document.getElementById('btn-hi');
    const btnEn = document.getElementById('btn-en');

    const translations = {
        "hi": {
            "brand-title": "ई-मैत्री",
            "brand-subtitle": "E-MAITRI: डिजिटल ग्राम स्वराज",
            "greeting-title": "नमस्ते मित्र,",
            "greeting-subtitle": "ई-मैत्री पोर्टल में आपका स्वागत है।",
            "login-text": "पोर्टल में प्रवेश करें",
            "quote-text": "\"महाभारत नहीं, अब केवल मैत्री।\"",
            "quote-subtext": "आपका डेटा Google Cloud और Firebase की विश्व स्तरीय सुरक्षा में सुरक्षित है।",
            "feature-1-title": "मैत्रीतंत्र रक्षण",
            "feature-1-desc": "ग्राम स्वराज पर आधारित सामाजिक ढांचा ",
            "feature-2-title": "डिजिटल सेवाएँ",
            "feature-2-desc": "ई-श्रम, आयुष्मान, सरकारी काम",
            "feature-3-title": "लोक-मित्र सहायता",
            "feature-3-desc": "स्थानीय विकास और सामुदायिक प्रबंधन",
            "tracker-text": "Real time Tracking: अमित (लौकिक मित्र) आपके घर की ओर बढ़ रहे हैं - 4 मिनट दूर...",
            "link-about": "About Us (हमारे बारे में)",
            "link-terms": "Terms & Conditions (नियम शर्तें)",
            "link-privacy": "Privacy Policy (गोपनीयता नीति)",
            "back-btn": "पीछे जाएँ",
            "about-title": "हमारे बारे में",
            "about-intro": "ई-मैत्री: डिजिटल ग्राम स्वराज की ओर एक कदम।",
            "about-mission": "हमारा उद्देश्य: डिजिटल टूल्स के साथ ग्रामीण समुदायों को सशक्त बनाना।",
            "about-p1": "ई-मैत्री एक ऐसा मंच है जो हर गाँव में डिजिटल संप्रभुता लाने के लिए समर्पित है। हम स्थानीय शासन और समुदाय के नेतृत्व वाले विकास की शक्ति में विश्वास करते हैं।",
            "about-p2": "हमारी सेवाएँ सरकारी योजनाओं और आम नागरिक के बीच की दूरी को पाटती हैं, यह सुनिश्चित करते हुए कि लाभ हमारे समर्पित 'लोक मित्रों' के माध्यम से उन लोगों तक पहुँचे जिन्हें उनकी सबसे अधिक आवश्यकता है।",
            "terms-title": "नियम और शर्तें",
            "terms-u1": "1. सेवाओं का उपयोग",
            "terms-p1": "ई-मैत्री पोर्टल का उपयोग करके आप सटीक जानकारी प्रदान करने और गाँव के विकास के उद्देश्य से मंच का उपयोग करने के लिए सहमत होते हैं।",
            "terms-u2": "2. डेटा गोपनीयता",
            "terms-p2": "हम आपकी डेटा सुरक्षा को प्राथमिकता देते हैं और इसे लागू डिजिटल नियमों के अनुपालन में नियंत्रित किया जाता है।",
            "privacy-title": "गोपनीयता नीति",
            "privacy-u1": "हम आपके डेटा का उपयोग कैसे करते हैं",
            "privacy-p1": "व्यक्तिगत डेटा केवल डिजिटल सेवाओं तक पहुँच प्रदान करने के लिए एकत्र किया जाता है और आपकी सहमति के बिना कभी साझा नहीं किया जाता है।",
            "register-welcome": "नया खाता बनाएं",
            "register-btn-text": "रजिस्टर करें",
            "already-have-account": "पहले से खाता है?",
            "go-to-login": "लॉगिन करें",
            "register-text": "नये यूज़र? रजिस्टर करें",
            "login-welcome": "नमस्ते, ई-मैत्री में आपका स्वागत है!",
            "forgot-pwd": "पासवर्ड भूल गए?",
            "or-login-with": "या इससे लॉग इन करें"
        },
        "en": {
            "brand-title": "E-Maitri",
            "brand-subtitle": "E-MAITRI: Digital Gram Swaraj",
            "greeting-title": "Namaste Mitra,",
            "greeting-subtitle": "Welcome to E-Maitri Portal.",
            "login-text": "Enter Portal",
            "quote-text": "\"Not Mahabharat, now only Maitri.\"",
            "quote-subtext": "Your data is secured with world-class Google Cloud and Firebase security.",
            "feature-1-title": "Maitritantra Defense",
            "feature-1-desc": "Social structure based on Gram Swaraj",
            "feature-2-title": "Digital Services",
            "feature-2-desc": "E-Shram, Ayushman, Govt Work",
            "feature-3-title": "Lok-Mitra Help",
            "feature-3-desc": "Local development and community management",
            "tracker-text": "Real time Tracking: Amit (Laukik Mitra) is heading to your house - 4 mins away...",
            "link-about": "About Us",
            "link-terms": "Terms & Conditions",
            "link-privacy": "Privacy Policy",
            "back-btn": "Back",
            "about-title": "About Us",
            "about-intro": "E-Maitri: A step towards Digital Gram Swaraj.",
            "about-mission": "Our Mission: Empowering rural communities with digital tools.",
            "about-p1": "E-Maitri is a platform dedicated to bringing digital sovereignty to every village. We believe in the power of local governance and community-led development.",
            "about-p2": "Our services bridge the gap between government schemes and the common citizen, ensuring that benefits reach those who need them most through our dedicated 'Lok Mitras'.",
            "terms-title": "Terms & Conditions",
            "terms-u1": "1. Use of Services",
            "terms-p1": "By using E-Maitri portal, you agree to provide accurate information and use the platform for its intended purpose of village development.",
            "terms-u2": "2. Data Privacy",
            "terms-p2": "We prioritize your data security and it is handled in compliance with applicable digital regulations.",
            "privacy-title": "Privacy Policy",
            "privacy-u1": "How we use your data",
            "privacy-p1": "Personal data is only collected to provide access to digital services and is never shared without your consent.",
            "register-welcome": "Create New Account",
            "register-btn-text": "Register",
            "already-have-account": "Already have an account?",
            "go-to-login": "Login",
            "register-text": "New User? Register",
            "login-welcome": "Welcome to E-Maitri!",
            "forgot-pwd": "Forgot Password?",
            "or-login-with": "Or login with"
        }
    };

    function switchLanguage(lang) {
        if (lang === 'hi') {
            if (btnHi) btnHi.classList.add('active');
            if (btnEn) btnEn.classList.remove('active');
            document.documentElement.lang = 'hi';
        } else {
            if (btnEn) btnEn.classList.add('active');
            if (btnHi) btnHi.classList.remove('active');
            document.documentElement.lang = 'en';
        }

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
    }

    if (btnHi && btnEn) {
        btnHi.addEventListener('click', () => switchLanguage('hi'));
        btnEn.addEventListener('click', () => switchLanguage('en'));
    }

    // Add glowing effect follows mouse (optional micro-interaction)
    const cards = document.querySelectorAll('.feature-card');
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Subtle internal gradient shifting based on mouse
                card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, transparent 80%)`;
            });

            card.addEventListener('mouseleave', () => {
                // Reset to default css based on class
                card.style.background = '';
            });
            
            // Context Awareness for Features
            card.addEventListener('click', () => {
                const title = card.querySelector('.feature-title').innerText;
                sendContextToNard("फीचर सेक्शन", `यूजर ${title} देख रहा है।`);
            });
        });
    }

    // Toggle Password Visibility (works on login & register pages)
    const toggleBtns = document.querySelectorAll('.toggle-password');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            // Support both data-target and sibling input approaches
            const input = targetId
                ? document.getElementById(targetId)
                : btn.parentElement.querySelector('input[type="password"], input[type="text"]');
            if (!input) return;

            if (input.type === 'password') {
                input.type = 'text';
                btn.classList.remove('fa-eye-slash');
                btn.classList.add('fa-eye');
            } else {
                input.type = 'password';
                btn.classList.remove('fa-eye');
                btn.classList.add('fa-eye-slash');
            }
        });
    });

    // Registration Form Validation
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            sendContextToNard("रजिस्ट्रेशन", "यूजर साइन-अप करने की कोशिश कर रहा है।");

            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;

            if (password !== confirmPassword) {
                // Shake the confirm-password field
                const confirmGroup = document.getElementById('reg-confirm-password').parentElement;
                confirmGroup.style.animation = 'shake 0.4s ease';
                setTimeout(() => confirmGroup.style.animation = '', 400);
                alert(document.documentElement.lang === 'hi'
                    ? 'पासवर्ड मेल नहीं खा रहे हैं!'
                    : 'Passwords do not match!');
                return;
            }

            // --- SAVE TO GOOGLE SHEETS LOGIC ---
            const btn = document.getElementById('register-submit-btn');
            const originalHTML = btn.innerHTML;

            // Show loading state
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
            btn.disabled = true;

            const payload = {
                name: document.getElementById('reg-name').value,
                mobile: document.getElementById('reg-mobile').value,
                email: document.getElementById('reg-email').value,
                village: document.getElementById('reg-village').value,
                password: password
            };

            console.log('Sending payload:', payload);

            // Use the globally defined GAS URL from build.js, or fallback to the current one for testing
            const scriptUrl = (typeof GAS_BASE_URL !== 'undefined') 
                ? GAS_BASE_URL 
                : 'https://script.google.com/macros/s/AKfycbz50ZXhghVEfTZ1zKEmXKoqIaYOC7gAyiXUhhWpB_LfBAECpgxCTGjt9LSyXWgs2CIL/exec';

            console.log('Attempting fetch to:', scriptUrl);

            fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors', // Needed for GAS Web Apps
                cache: 'no-cache',
                headers: { 'Content-Type': 'text/plain' }, // Using text/plain avoids CORS preflight
                body: JSON.stringify(payload)
            })
                .then(response => {
                    console.log('Fetch response received (Opaque):', response);
                    sendContextToNard("रजिस्ट्रेशन", "सफलतापूर्वक रजिस्टर हो गया है।");
                    // Success feedback
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>' +
                        (document.documentElement.lang === 'hi' ? 'रजिस्ट्रेशन सफल!' : 'Registration Successful!') +
                        '</span>';
                    btn.style.background = 'linear-gradient(135deg, var(--color-green), var(--color-teal))';

                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                })
                .catch(err => {
                    console.error('Error:', err);
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                    alert('Connection error. Please try again.');
                });
            // ------------------------------------
        });
    }

});

/**
 * 4. ऑटो-ट्रैकिंग (Optional): जब यूजर टैब बदले तो नार्ड को पता चल जाए
 */
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
        const pageTitle = document.title || "E-MAITRI";
        sendContextToNard(pageTitle, "यूजर वापस मुख्य पोर्टल पर आ गया है।");
    }
});


// Maitri Chatbot (Updated to use Nard Logic)
function toggleMaitriChat() {
    // अगर नार्ड पहले से खुला है, तो उसे रिफ्रेश करने की बजाय बस फोकस कर सकते हैं (लेकिन browsers allow नहीं करते अक्सर)
    // यहाँ हम user के निर्देशानुसार openNardApp का ही इस्तेमाल करेंगे।
    openNardApp();
}
