import { ContactInfo, SocialNetwork } from '@/models';
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import {
  faAt,
  faLocationDot,
  faMobileScreen,
} from '@fortawesome/free-solid-svg-icons';

const CONTACT_DATA: ContactInfo[] = [
  {
    title: 'Email',
    value: 'donkennethgdemayo@gmail.com',
    icon: faAt,
    type: 'email',
  },
  {
    title: 'Phone',
    value: '+63 976 160 4020',
    icon: faMobileScreen,
    type: 'phone',
  },
  {
    title: 'Location',
    value: 'Taguig, Metro Manila',
    icon: faLocationDot,
    type: 'location',
    coordinates: [121.0464, 14.5547], // [longitude, latitude] - Taguig
  },
];

const SOCIAL_NETWORKS_DATA: SocialNetwork[] = [
  { title: 'GitHub', link: 'https://github.com/knnthdmyo', icon: faGithub },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/knnthdmyo/',
    icon: faLinkedin,
  },
  {
    title: 'Facebook',
    link: 'https://www.facebook.com/knnthdmyo/',
    icon: faFacebook,
  },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/knnthdmyo/',
    icon: faInstagram,
  },
];

export const ContactService = {
  getContactInfo(): ContactInfo[] {
    return CONTACT_DATA;
  },

  getSocialNetworks(): SocialNetwork[] {
    return SOCIAL_NETWORKS_DATA;
  },

  getEmail(): string {
    return CONTACT_DATA.find((c) => c.title === 'Email')?.value || '';
  },
};
