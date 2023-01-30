import { ReactComponent as SpinnerTRILogo } from './assets/tri_logo_monochrome.svg';
import { ReactComponent as SpinnerWovenLogo } from './assets/woven_logo.svg';

export const iconOptions = {
    primary: { 'aria-details': 'woven-loading-spinner' },
    secondary: { 'aria-details': 'tri-loading-spinner' }
};

export const displayIcon = (icon: string) => {
    return icon === 'secondary' ? SpinnerTRILogo : SpinnerWovenLogo;
};
