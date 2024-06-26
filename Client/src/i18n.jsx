import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      entadeg: "Entadeg",
      headertext:
        "  Be a part of the breakthrough and make someone's dream come true.",
      headerblue1: "Happiness ",
      headerblue2: "comes from",
      headerblack: "your action.",
      donate: "Donate",
      contactus: "Contact Us",
      signout: "Sign Out",
      signin: "Sign In",
      signup: "Sign Up",
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
      donor: "Donor",
      patient: "Patient",
      hospital: "Hospital",
      admin: "Admin",
      emailaddress: "Email Address",
      password: "Password",
      fullname: "Full Name",
      phonenum: "Phone Number",
      country: "Country",
      city: "City",
      attachprofile: "Attach Profile Image",
      confirmpassword: "Confirm Password",
      alreadyhaveanaccount: "Already have an account?",
      donthaveanaccount: "Dont have an account?",
      donations: "Donations",
      raised: "Raised : ",
      goal: "Goal : ",
      birr: "Birr",
      paymentsystem: "Payment System",
      local: "Local",
      international: "International",
      donationamount: " Donation Amount",
      donationmessage: "Donation Message",
      donateanonymously: "Donate Anonymously",
      daysleft: "Days left",
      mydonations: "My Donations",
      update: "UPDATE",
      amount: "Amount",
      dollar: "USD",
      unauthorized: "You are not authorized",
      unauthorizedmessage:
        "You tried to access a page you did not have authorization for.",
      profile: "Profile",
      personaldetails: "Personal Details",
      updatebtn: "Update",
      profilephoto: "Profile Photo",
      selectnewphoto: " Select New Photo",
      changepassword: "Change password",
      oldpassword: "Old Password",
      newpassword: "New Password",
    },
  },
  am: {
    translation: {
      entadeg: "እንታደግ",
      headertext: "የስኬቱ አካል ይሁኑ እና የአንድን ሰው ህልም እውን ያድርጉት።",
      headerblue1: "ደስታ ",
      headerblue2: "ከየእርስዎ ድርጊት ነው",
      headerblack: "የሚመጣው",
      donate: "ለገሱ",
      contactus: "አግኙን",
      signout: "ውጣ",
      signin: "ይግቡ",
      signup: "ይመዝገቡ",
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
      donor: "ለጋሽ",
      patient: "ታካሚ",
      hospital: "ሆስፒታል",
      admin: "አስተዳዳሪ",
      emailaddress: "የ ኢሜል አድራሻ",
      password: "የይለፍ ቃል",
      fullname: "ሙሉ ስም",
      phonenum: "ስልክ ቁጥር",
      country: "ሀገር",
      city: "ከተማ",
      attachprofile: "የመገለጫ ምስል አያይዝ",
      confirmpassword: "የይለፍ ቃል አረጋግጥ",
      alreadyhaveanaccount: "በእኛ ውስጥ መለያ አለህ?",
      donthaveanaccount: "ከእኛ ጋር መለያ የለህም?",
      donations: "ልገሳዎች ",
      raised: "የተሰበሰበው : ",
      goal: "ግብ : ",
      birr: "ብር",
      paymentsystem: "የክፍያ ስርዓት",
      local: "በአገሪቱ ውስጥ",
      international: "ዓለም አቀፍ",
      donationamount: " የልገሳ መጠን",
      donationmessage: "የልገሳ መልእክት",
      donateanonymously: "ስም-አልባ ለግሱ",
      daysleft: "ቀናት ይቀራሉ",
      mydonations: "የእኔ ልገሳዎች",
      update: "ከልገሳ በኋላ",
      amount: "መጠን",
      dollar: "ዶላር",
      unauthorized: "መግባት አልተፈቀደልህም።",
      unauthorizedmessage: "ፍቃድ የሌለህበትን ገጽ ለማግኘት ሞክረሃል።",
      profile: "መገለጫ",
      personaldetails: "የግል መረጃ",
      updatebtn: "ቀይር",
      profilephoto: "የመገለጫ ፎቶ",
      selectnewphoto: " አዲስ ፎቶ ይምረጡ",
      changepassword: "የሚስጥር ቁልፍ ይቀይሩ",
      oldpassword: "የድሮ የይለፍ ቃል",
      newpassword: "አዲስ የይለፍ ቃል",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
