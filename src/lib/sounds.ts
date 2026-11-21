import { playSound } from 'react-sounds';

const sounds = {
  themeChanged: 'notification/popup',
  copied: 'notification/success',
} as const;

function play(sound: (typeof sounds)[keyof typeof sounds]) {
  playSound(sound, { volume: 0.15 }).catch(() => null);
}

export function playThemeChangedSound() {
  play(sounds.themeChanged);
}

export function playCopiedSound() {
  play(sounds.copied);
}
