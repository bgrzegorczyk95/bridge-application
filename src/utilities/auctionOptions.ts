import { colors } from '../assets/img/colors/index';

interface Option {
  colors: { name: string, image: string }[];
  disabledColors: string[];
  values: string[];
}

export const auctionOptions: Option = {
  values: ['1', '2', '3', '4', '5', '6', '7'],
  colors: [
    { name: 'C', image: colors.clubs },
    { name: 'D', image: colors.diamonds },
    { name: 'H', image: colors.hearts },
    { name: 'S', image: colors.spades},
    { name: 'NT', image: undefined }
  ],
  disabledColors: [colors.clubsDisabled, colors.diamondsDisabled, colors.heartsDisabled, colors.spadesDisabled, undefined],
};