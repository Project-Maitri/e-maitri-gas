document.addEventListener('DOMContentLoaded', () => {
    
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
            "privacy-p1": "व्यक्तिगत डेटा केवल डिजिटल सेवाओं तक पहुँच प्रदान करने के लिए एकत्र किया जाता है और आपकी सहमति के बिना कभी साझा नहीं किया जाता है।"
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
            "privacy-p1": "Personal data is only collected to provide access to digital services and is never shared without your consent."
        }
    };

    function switchLanguage(lang) {
        if (lang === 'hi') {
            btnHi.classList.add('active');
            btnEn.classList.remove('active');
            document.documentElement.lang = 'hi';
        } else {
            btnEn.classList.add('active');
            btnHi.classList.remove('active');
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

    btnHi.addEventListener('click', () => switchLanguage('hi'));
    btnEn.addEventListener('click', () => switchLanguage('en'));

    // Add glowing effect follows mouse (optional micro-interaction)
    const cards = document.querySelectorAll('.feature-card');
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
    });

});

// Maitri Chatbot Widget Toggle (global scope for onclick attribute)
function toggleMaitriChat() {
    var win = document.getElementById("maitri-chat-window");
    win.style.display = (win.style.display === "none") ? "block" : "none";
}
