export interface Surah {
  name: string;
  nameWolof: string;
  count: number;
}

export interface NafilaNight {
  night: number;
  rakaat: number;
  surahs: Surah[];
  extraInstructions?: { wo: string; fr: string };
  benefitsWolof: string;
  benefitsFrench: string;
  titleWolof: string;
  titleFrench: string;
}

export type Language = "wo" | "fr";
