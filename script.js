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
            "link-terms": "Terms & Conditions (नियम शर्तें)"
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
            "link-terms": "Terms & Conditions"
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
