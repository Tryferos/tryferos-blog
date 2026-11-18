import type { IconName } from '@/components/shared/Icon';

type SocialLink = { label: string; href: string; icon: IconName };

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/Tryferos', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tryferos',
    icon: 'linkedin',
  },
  { label: 'X', href: 'https://x.com/tryferos', icon: 'x' },
];
