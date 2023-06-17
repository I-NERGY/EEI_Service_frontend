import React, {createContext, useState, useEffect} from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState(
        localStorage.getItem('language') || 'en'
    );

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const changeLanguage = newLanguage => {
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{language, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};