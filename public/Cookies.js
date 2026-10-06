
const GA_ID = 'G-NFWBTQPCKH'; 
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

if (!localStorage.getItem("cookie-consent")) {
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
    });
}

function loadAnalytics(consentGranted = false) {
    if (consentGranted) {
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
        });
    }

    if (!document.getElementById('google-analytics-script')) {
        const script = document.createElement('script');
        script.id = 'google-analytics-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);

        gtag('js', new Date());
        gtag('config', GA_ID);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
        banner.style.display = "block";
    } else if (consent === "accepted") {
        loadAnalytics(true); 
    } else {
        loadAnalytics(false); 
    }

    document.getElementById("btn-accept").addEventListener("click", () => {
        localStorage.setItem("cookie-consent", "accepted");
        banner.style.display = "none";
        loadAnalytics(true);
    });

    document.getElementById("btn-decline").addEventListener("click", () => {
        localStorage.setItem("cookie-consent", "declined");
        banner.style.display = "none";
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
        });
    });
});
