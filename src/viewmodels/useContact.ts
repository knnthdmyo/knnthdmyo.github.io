import { ContactService } from '@/services';

export const useContact = () => {
  const contactInfo = ContactService.getContactInfo();
  const socialNetworks = ContactService.getSocialNetworks();
  const email = ContactService.getEmail();

  return {
    contactInfo,
    socialNetworks,
    email,
  };
};
