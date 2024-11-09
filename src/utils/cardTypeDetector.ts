import { TCardType } from "../types/TCardType.type";

export function cardTypeDetector(code: string): TCardType | null {
  let cardType: TCardType | null = null;

  if (code.match(/8600|^5614|^5440|6264|6262|6263/)) {
    cardType = "uzcard";
  }

  if (code.match(/9860/)) {
    cardType = "humo";
  }

  return cardType;
}
