'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'zh', name: 'Chinese', flag: '��', nativeName: '中文' },
  { code: 'ar', name: 'Arabic', flag: '��', nativeName: 'العربية' },
  { code: 'sw', name: 'Swahili', flag: '��', nativeName: 'Kiswahili' },
];

interface LanguageSelectorProps {
  variant?: 'button' | 'dropdown' | 'compact';
  showFlag?: boolean;
  showName?: boolean;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  showFlag = true,
  showName = true,
  className = ''
}) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    
    // Store the selected language in localStorage
    localStorage.setItem('preferred-language', languageCode);
    
    // Optionally send to analytics or backend
    console.log(`Language changed to: ${languageCode}`);
  };

  if (variant === 'button') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              i18n.language === language.code
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            title={language.nativeName}
          >
            {showFlag && <span className="mr-2">{language.flag}</span>}
            {showName && language.name}
            {i18n.language === language.code && (
              <Check className="w-4 h-4 ml-2 inline" />
            )}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        title={t('changeLanguage')}
      >
        <Globe className="w-4 h-4 mr-2" />
        {showFlag && <span className="mr-1">{currentLanguage.flag}</span>}
        <span className="uppercase">{currentLanguage.code}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
        
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 z-20 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg top-full">
              <div className="py-1">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => changeLanguage(language.code)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between ${
                      i18n.language === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      {showFlag && <span className="mr-2">{language.flag}</span>}
                      <span>{language.nativeName}</span>
                    </div>
                    {i18n.language === language.code && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </button>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title={t('changeLanguage')}
      >
        <Globe className="w-5 h-5 mr-2" />
        {showFlag && <span className="mr-2">{currentLanguage.flag}</span>}
        {showName && <span className="mr-2">{currentLanguage.nativeName}</span>}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 z-20 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                {t('language')}
              </div>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-100 flex items-center justify-between transition-colors ${
                    i18n.language === language.code 
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                      : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    {showFlag && <span className="text-lg mr-3">{language.flag}</span>}
                    <div>
                      <div className="font-medium">{language.nativeName}</div>
                      <div className="text-xs text-gray-500">{language.name}</div>
                    </div>
                  </div>
                  {i18n.language === language.code && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer with info */}
            <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <span>Legal terminology included</span>
                <span className="text-blue-600">Beta</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
