import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  type Icon,
} from '@tabler/icons-react';

type SocialLink = { label: string; href: string; icon: Icon };

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Tryferos',
    icon: IconBrandGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tryfon-mazarakis/',
    icon: IconBrandLinkedin,
  },
  { label: 'X', href: 'https://x.com/tryferos1', icon: IconBrandX },
];
