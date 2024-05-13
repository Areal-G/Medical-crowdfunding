import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      entadeg: "Entadeg",
      headertext:
        " Welcome to our medical crowdfunding community, where hope andhealing come together to make a difference. We understand that medical challenges can be overwhelming, but we believe that withyour support, we can help those in need.",
      donate: "Donate",
      contactus: "Contact Us",
      signout: "Sign Out",
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      campaigns: "Campaigns",
      aboutus: "About Us",
      mission: "Mission",
      missionstatement:
        " Availing high quality, free, life changing surgeries and medical treatments by partnering with local hospitals and respective partners",
      bigmission: "Big Mission",
      bigmissionstatement:
        " Giving a purpose of life for the giver and reciever! Giving a purpose of life for you and me!",
      vision: "Vision",
      visionstatement:
        " Enabling unlimited access to life changing healthcare opportunities free of charge by 2030 for People in Need",
      getintouch: "Get in touch",
      contactustext: "Our friendly team is always here to chat.",
      email: "Email",
      emailtext: "Our friendly team is here to help.",
      office: "Office",
      officetext: "Come say hello at our office HQ.",
      officeaddress: "Hawassa, Piassa, Ethiopia",
      phone: "Phone",
      phonetext: "Mon-Fri from 8am to 5pm.",
      phonenumber: "251 95 000-0000",
    },
  },
  am: {
    translation: {
      entadeg: "እንታደግ",
      headertext:
        "እንኳን ደህና መጡ። የህክምና ተግዳሮቶች ከአቅም በላይ ሊሆኑ እንደሚችሉ እንረዳለን ነገርግን በእርስዎ ድጋፍ የተቸገሩትን መርዳት እንደምንችል እናምናለን።",
      donate: "ለገሱ",
      contactus: "አግኙን",
      signout: "ውጣ",
      home: "ቤት",
      about: "ስለ እኛ",
      services: "አገልግሎቶች",
      contact: "አግኙን",
      campaigns: "ዘመቻዎች",
      aboutus: "ስለ እኛ",
      mission: "ተልዕኮ",
      missionstatement:
        "ከአካባቢው ሆስፒታሎች እና ከሚመለከታቸው አጋሮች ጋር በመተባበር ከፍተኛ ጥራት ያለው፣ ነፃ፣ ህይወትን የሚቀይር ቀዶ ጥገና እና የህክምና አገልግሎት ማግኘት",
      bigmission: "ትልቅ ተልዕኮ",
      bigmissionstatement:
        "የህይወትን አላማ ለሰጪ እና ለተቀባዩ መስጠት! ለእኔ እና ላንቺ የህይወት አላማ መስጠት!",
      vision: "ራዕይ",
      visionstatement:
        "በ2030 ለተቸገሩ ሰዎች ያልተገደበ የህይወት ለውጥ የጤና አጠባበቅ ዕድሎችን በነፃ ማግኘት ማስቻል",
      getintouch: "ከእኛ ጋር ይገናኙ",
      contactustext: "የጓደኛ ቡድናችን ሁል ጊዜ ለመወያየት እዚህ ነው።",
      email: "ኢሜይል",
      emailtext: "የጓደኛ ቡድናችን ሁል ጊዜ ለመወያየት እዚህ ነው።",
      office: "ቢሮ",
      officetext: "ይምጡ ሰላምታ በጽህፈት ቤታችን ዋና መስሪያ ቤት።",
      officeaddress: "ሀዋሳ, ፒያሳ, ኢትዮጵያ",
      phone: "ስልክ",
      phonetext: "ሰኞ-አርብ ከጠዋቱ 2 ሰአት እስከ ምሽቱ 11 ሰአት።",
      phonenumber: "251 95 000-0000",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
