import { Home, BadgeInfo, FileBadge2 } from 'lucide-react'

// Icon for features
import Customized_Summaries from '@/public/images/Customized Summaries.png'
import Enhanced_Productivity from '@/public/images/Enhanced Productivity.png'
import Improved_Information_Retention from '@/public/images/Improved Information Retention.png'
import Multilingual_Summarization from '@/public/images/Multilingual Summarization.png'
import Time_efficiency from '@/public/images/Time Efficiency.png'

// Icon for footer component
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";


export const LinksNavbar = [
    {
        id : 1,
        name : 'Home',
        url : '#',
        icon : <Home />
    },
    {
        id : 2,
        name : 'About',
        url : '#about',
        icon : <BadgeInfo />
    },
    {
        id : 3,
        name : 'Features',
        url : '#features',
        icon : <FileBadge2 />
    }
]

export const TestimonialInfo = [
    {
        id : 1,
        message : "Users often appreciate AI summarizers for their ability to quickly distill and summarize large volumes of information. This is particularly valuable for professionals and researchers who need to process extensive documents quickly.",
        name : "Chris Brown",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        id : 2,
        message : "AI summarizers are seen as efficient tools that help streamline information consumption. By condensing content, users can focus on essential points without spending excessive time on reading lengthy texts.",
        name : "Lisa Wang",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
        id : 3,
        message : "When AI summarizers provide accurate and relevant summaries, users find them valuable. However, accuracy is crucial, and there may be concerns if the summarizer fails to capture essential information or misinterprets the content.",
        name : "Sara Lee",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
]

export const benifts = [
    {
        id : 1,
        title : "Time Efficiency",
        subTitle : "Accelerated Information Processing",
        benifit : "AI summarizers swiftly distill vast content, saving time for users and enabling quicker access to key information.",
        icon : Time_efficiency,
    },
    {
        id : 2,
        title : "Enhanced Productivity",
        subTitle : "Streamlined Workflows",
        benifit : "AI summarization tools boost productivity by automating the extraction of essential details, allowing professionals to focus on critical tasks.",
        icon : Enhanced_Productivity,
    },
    {
        id : 3,
        title : "Improved Information Retention",
        subTitle : "Cognitive Load Reduction",
        benifit : "AI summarizers aid in reducing cognitive overload by presenting concise summaries, facilitating better comprehension and retention of information.",
        icon : Improved_Information_Retention,
    },
    {
        id : 4,
        title : "Multilingual Summarization",
        subTitle : "Global Accessibility",
        benifit : "AI-powered summarizers break language barriers, providing users with the ability to quickly understand and extract information from content in various languages",
        icon : Multilingual_Summarization,
    },
    {
        id : 5,
        title : "Customized Summaries",
        subTitle : "Tailored Information Extraction",
        benifit : "AI summarizers offer customization options, allowing users to generate summaries based on specific preferences or criteria, catering to individualized information needs",
        icon : Customized_Summaries,
    },
]

export const icons__footer = [
    {
        id: 1,
        icon: <FaFacebook />,
        url: 'https://www.facebook.com',
    },
    {
        id: 2,
        icon: <IoLogoWhatsapp />,
        url: 'https://www.whatsApp.com',
    },
    {
        id: 3,
        icon: <FaLinkedin />,
        url: 'https://www.LinkedIn.com',
    },
    {
        id: 4,
        icon: <FaGithub />,
        url: 'https://www.Github.com',
    },
];

export const Link__footer = [
    {
        id : 1,
        link : 'Dashboard'
    },
]

export const Link__footer2 = [
    {
        id : 1,
        link : 'Home'
    },
    {
        id : 2,
        link : 'About'
    },
    {
        id : 3,
        link : 'Feaures'
    },
    {
        id : 4,
        link : 'Contact'
    },
]


export const plans = [
    {
        id: 1,
        name: "Free",
        icon: "/icons/free-plan.svg",
        price: 0,
        inclusions: [
            {
                label: "Free Credits",
                isIncluded: true,
            },
            {
                label: "Traducation for the message",
                isIncluded: false,
            },
        ],
    },
    {
        id: 2,
        name: "Pro Package",
        icon: "/icons/free-plan.svg",
        price: 10,
        inclusions: [
            {
                label: "Free Credits",
                isIncluded: true,
            },
            {
                label: "Traducation for the message",
                isIncluded: true,
            },
        ],
    },
];
