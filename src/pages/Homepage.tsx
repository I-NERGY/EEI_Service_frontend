import React, {useContext} from 'react';
import {LanguageContext} from "../context/LanguageContext";
import HomepageItemFullWidth from "../components/homepage/HomepageItemFullWidth";
import {servicesHomepageEnglish, servicesHomepageLatvian} from "../components/homepage/servicesHomepage";

const Homepage = () => {
    const {language} = useContext(LanguageContext)

    const servicesHomepage = language === 'en' ? servicesHomepageEnglish : servicesHomepageLatvian

    return (
        <>
            {servicesHomepage.map((service, index) => (
                <HomepageItemFullWidth title={service.title} description={service.description} icon={service.icon}
                                       image={service.image} link={service.link} index={index} key={service.id}/>
            ))}
        </>
    );
}

export default Homepage;