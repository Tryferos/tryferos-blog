import { playSound as playLibrarySound } from 'react-sounds';

const sounds = {
  themeChanged: 'notification/popup',
  copied: 'notification/success',
} as const;

const volume = 0.15;

export function playSound(sound: keyof typeof sounds) {
  playLibrarySound(sounds[sound], { volume }).catch(() => null);
}
