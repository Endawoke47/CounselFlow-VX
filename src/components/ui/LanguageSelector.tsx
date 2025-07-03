import React, { useState } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { useLanguage, Language } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

const languages: Array<{ code: Language; name: string; flag: string }> = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ch', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' }
]

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLang = languages.find(lang => lang.code === currentLanguage)

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-slate-600" />
        <span className="text-sm font-medium text-slate-700 min-w-[2rem]">
          {currentLang?.flag} {currentLang?.code.toUpperCase()}
        </span>
        <ChevronDown 
          className={cn(
            'w-4 h-4 text-slate-500 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-20 overflow-hidden">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors duration-150',
                    currentLanguage === language.code && 'bg-corporate-50 text-corporate-700'
                  )}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-900">
                        {language.name}
                      </span>
                      <span className="text-xs text-slate-500 uppercase">
                        {language.code}
                      </span>
                    </div>
                  </div>
                  {currentLanguage === language.code && (
                    <div className="w-2 h-2 bg-corporate-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
