import React, { createContext, useContext, useState, ReactNode } from 'react'

export type Language = 'en' | 'fr' | 'ch' | 'ar' | 'sw'

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.matters': 'Matter Management',
    'nav.contracts': 'Contract Management',
    'nav.company': 'Company Secretarial',
    'nav.disputes': 'Dispute Resolution',
    'nav.risk': 'Risk Management',
    'nav.policy': 'Policy Management',
    'nav.outsourced': 'Outsourced Matters',
    'nav.knowledge': 'Knowledge Management',
    'nav.ip': 'IP Management',
    'nav.data': 'Data Protection',
    'nav.users': 'User Management',
    'nav.tasks': 'Task Management',
    'nav.deals': 'Deal Flow',
    'nav.licensing': 'Licensing & Regulatory',
    
    // Common
    'common.search': 'Search...',
    'common.filter': 'Filter',
    'common.add': 'Add',
    'common.view': 'View',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.welcome': 'Welcome back',
    'common.good_morning': 'Good morning',
    'common.good_afternoon': 'Good afternoon',
    'common.good_evening': 'Good evening',
    'common.notifications': 'Notifications',
    'common.profile': 'Profile',
    'common.settings': 'Settings',
    
    // Language names
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.ch': '中文',
    'lang.ar': 'العربية',
    'lang.sw': 'Kiswahili'
  },
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.matters': 'Gestion des affaires',
    'nav.contracts': 'Gestion des contrats',
    'nav.company': 'Secrétariat d\'entreprise',
    'nav.disputes': 'Résolution des litiges',
    'nav.risk': 'Gestion des risques',
    'nav.policy': 'Gestion des politiques',
    'nav.outsourced': 'Affaires externalisées',
    'nav.knowledge': 'Gestion des connaissances',
    'nav.ip': 'Gestion de la PI',
    'nav.data': 'Protection des données',
    'nav.users': 'Gestion des utilisateurs',
    'nav.tasks': 'Gestion des tâches',
    'nav.deals': 'Flux d\'affaires',
    'nav.licensing': 'Licences et réglementation',
    
    // Common
    'common.search': 'Rechercher...',
    'common.filter': 'Filtrer',
    'common.add': 'Ajouter',
    'common.view': 'Voir',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.welcome': 'Bon retour',
    'common.good_morning': 'Bonjour',
    'common.good_afternoon': 'Bon après-midi',
    'common.good_evening': 'Bonsoir',
    'common.notifications': 'Notifications',
    'common.profile': 'Profil',
    'common.settings': 'Paramètres',
    
    // Language names
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.ch': '中文',
    'lang.ar': 'العربية',
    'lang.sw': 'Kiswahili'
  },
  ch: {
    // Navigation
    'nav.dashboard': '仪表板',
    'nav.matters': '事务管理',
    'nav.contracts': '合同管理',
    'nav.company': '公司秘书',
    'nav.disputes': '争议解决',
    'nav.risk': '风险管理',
    'nav.policy': '政策管理',
    'nav.outsourced': '外包事务',
    'nav.knowledge': '知识管理',
    'nav.ip': '知识产权管理',
    'nav.data': '数据保护',
    'nav.users': '用户管理',
    'nav.tasks': '任务管理',
    'nav.deals': '交易流程',
    'nav.licensing': '许可证和监管',
    
    // Common
    'common.search': '搜索...',
    'common.filter': '筛选',
    'common.add': '添加',
    'common.view': '查看',
    'common.edit': '编辑',
    'common.delete': '删除',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.welcome': '欢迎回来',
    'common.good_morning': '早上好',
    'common.good_afternoon': '下午好',
    'common.good_evening': '晚上好',
    'common.notifications': '通知',
    'common.profile': '个人资料',
    'common.settings': '设置',
    
    // Language names
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.ch': '中文',
    'lang.ar': 'العربية',
    'lang.sw': 'Kiswahili'
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.matters': 'إدارة الشؤون',
    'nav.contracts': 'إدارة العقود',
    'nav.company': 'أمانة الشركة',
    'nav.disputes': 'حل النزاعات',
    'nav.risk': 'إدارة المخاطر',
    'nav.policy': 'إدارة السياسات',
    'nav.outsourced': 'الشؤون المُستعان بمصادر خارجية',
    'nav.knowledge': 'إدارة المعرفة',
    'nav.ip': 'إدارة الملكية الفكرية',
    'nav.data': 'حماية البيانات',
    'nav.users': 'إدارة المستخدمين',
    'nav.tasks': 'إدارة المهام',
    'nav.deals': 'تدفق الصفقات',
    'nav.licensing': 'التراخيص والتنظيم',
    
    // Common
    'common.search': 'بحث...',
    'common.filter': 'تصفية',
    'common.add': 'إضافة',
    'common.view': 'عرض',
    'common.edit': 'تحرير',
    'common.delete': 'حذف',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.welcome': 'مرحباً بعودتك',
    'common.good_morning': 'صباح الخير',
    'common.good_afternoon': 'مساء الخير',
    'common.good_evening': 'مساء النور',
    'common.notifications': 'الإشعارات',
    'common.profile': 'الملف الشخصي',
    'common.settings': 'الإعدادات',
    
    // Language names
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.ch': '中文',
    'lang.ar': 'العربية',
    'lang.sw': 'Kiswahili'
  },
  sw: {
    // Navigation
    'nav.dashboard': 'Dashibodi',
    'nav.matters': 'Usimamizi wa Mambo',
    'nav.contracts': 'Usimamizi wa Mikataba',
    'nav.company': 'Katibu wa Kampuni',
    'nav.disputes': 'Utatuzi wa Migogoro',
    'nav.risk': 'Usimamizi wa Hatari',
    'nav.policy': 'Usimamizi wa Sera',
    'nav.outsourced': 'Mambo ya Nje',
    'nav.knowledge': 'Usimamizi wa Maarifa',
    'nav.ip': 'Usimamizi wa Haki za Kimakusudi',
    'nav.data': 'Ulinzi wa Data',
    'nav.users': 'Usimamizi wa Watumiaji',
    'nav.tasks': 'Usimamizi wa Kazi',
    'nav.deals': 'Mtiririko wa Mikataba',
    'nav.licensing': 'Leseni na Udhibiti',
    
    // Common
    'common.search': 'Tafuta...',
    'common.filter': 'Chuja',
    'common.add': 'Ongeza',
    'common.view': 'Ona',
    'common.edit': 'Hariri',
    'common.delete': 'Futa',
    'common.save': 'Hifadhi',
    'common.cancel': 'Ghairi',
    'common.welcome': 'Karibu tena',
    'common.good_morning': 'Habari za asubuhi',
    'common.good_afternoon': 'Habari za mchana',
    'common.good_evening': 'Habari za jioni',
    'common.notifications': 'Arifa',
    'common.profile': 'Wasifu',
    'common.settings': 'Mipangilio',
    
    // Language names
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.ch': '中文',
    'lang.ar': 'العربية',
    'lang.sw': 'Kiswahili'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    // Here you could also save to localStorage
    localStorage.setItem('counselflow-language', lang)
    
    // Set document direction for RTL languages
    if (lang === 'ar') {
      document.dir = 'rtl'
      document.documentElement.lang = 'ar'
    } else {
      document.dir = 'ltr'
      // Map 'ch' to valid HTML language code 'zh'
      const htmlLang = lang === 'ch' ? 'zh' : lang
      document.documentElement.lang = htmlLang
    }
  }

  const t = (key: string): string => {
    return translations[currentLanguage][key] || key
  }

  // Initialize language from localStorage on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('counselflow-language') as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
