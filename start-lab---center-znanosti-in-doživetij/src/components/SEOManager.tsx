import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SEOManager() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let titleKey = 'seo.home_title';
    let descKey = 'seo.home_desc';

    if (pathname.includes('/delavnice')) {
      titleKey = 'seo.workshops_title';
      descKey = 'seo.workshops_desc';
    } else if (pathname.includes('/partner')) {
      titleKey = 'seo.partner_title';
      descKey = 'seo.partner_desc';
    } else if (pathname.includes('/koledar')) {
      titleKey = 'seo.calendar_title';
      descKey = 'seo.calendar_desc';
    } else if (pathname.includes('/zasebnost')) {
      titleKey = 'seo.privacy_title';
      descKey = 'seo.home_desc';
    } else if (pathname.includes('/pogoji-uporabe')) {
      titleKey = 'seo.terms_title';
      descKey = 'seo.home_desc';
    }

    const title = t(titleKey);
    const description = t(descKey);
    const keywords = t('seo.keywords');

    // 1. Update Document Title
    document.title = title;

    // 2. Update Primary Description Tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update Primary Keywords Tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // 4. Update Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);

    // 5. Update Twitter Tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', description);

    // 6. Update HTML lang tag to match dynamic i18n selection
    document.documentElement.lang = i18n.language || 'sl';

  }, [pathname, t, i18n.language]);

  return null;
}
