export const Fields: {[key:string]: string} = {
  GENERAL : "総合講座科目",
  LANG_COM : "言語コミュニケーション科目",
  SHARED : "共通科目",
  DS1 : "データサイエンス１",
  DS2 : "データサイエンス２",
  IT_BASE : "情報技術基礎科目",
  WELLNESS : "ウェルネス科目",
  POLICY_MAN  : "総合政策系",
  INFO_ENV : "環境情報系",
  RESEARCH: "研究プロジェクト科目",
  OTHER : "other"
};

// export type Fields = typeof Fields[keyof typeof Fields];

export const FieldTexts: Selection[] = [
  {name: "総合講座科目", key: Fields.GENERAL, iconName: require("@/assets/icons/kouza.svg"),},
  {name: "言語コミュニケーション科目", key:Fields.LANG_COM, iconName: require("@/assets/icons/lang.svg")},
  {name:　"基盤-共通科目", key: Fields.SHARED, iconName: require("@/assets/icons/base.svg")},
  {name: "データサイエンス１", key: Fields.DS1, iconName: require("@/assets/icons/ds1.svg")},
  {name: "データサイエンス２", key: Fields.DS2, iconName: require("@/assets/icons/ds2.svg")},
  {name: "情報技術基礎科目", key: Fields.IT_BASE, iconName: require("@/assets/icons/programms.svg")},
  {name: "ウェルネス科目", key: Fields.WELLNESS, iconName: require("@/assets/icons/wellness.svg")},
  {name: "先端-環境情報系", key: Fields.INFO_ENV, iconName: require("@/assets/icons/kankyojouhou.svg")},
  {name: "先端-総合政策系", key: Fields.POLICY_MAN, iconName: require("@/assets/icons/sougouseisaku.svg")},
  {name: "研究プロジェクト科目", key: Fields.RESEARCH, iconName: require("@/assets/icons/kenkyu.svg")},
  {name: "その他", key: Fields.OTHER, iconName: require("@/assets/icons/others.svg")}
]

export interface Selection{
  name: string;
  key: string;
  iconName: string;
}

export const Method: {[key: string]: string} = {
  OFF_LINE: "対面",
  LIVE: "オンライン（ライブ）",
  ON_DEMAND: "オンライン（オンデマンド）"
}

export const MethodTexts: Selection[] = [
  {name: "対面", key: Method.OFF_LINE, iconName: require("@/assets/icons/oncumpus.svg")},
  {name: "オンライン", key: Method.LIVE, iconName: require("@/assets/icons/online.svg")},
  {name: "オンデマンド", key: Method.ON_DEMAND, iconName: require("@/assets/icons/ondemand.svg")}
]


export const Term: {[key: string]: string} = {
  FULL: "通期",
  UPPER: "前半",
  LOWER: "後半"
}

export const TermTexts: Selection[] = [
  {name: "通期", key: Term.FULL, iconName: require("@/assets/icons/tuki.svg")},
  {name: "前半", key: Term.UPPER, iconName: require("@/assets/icons/zenhan.svg")},
  {name: "後半", key: Term.LOWER, iconName: require("@/assets/icons/kouhan.svg")}
]

export const Giga: {[key: string]: string} = {
  GIGA: "GIGA",
  N_GIGA: "NON_GIGA"
}

export const GigaTexts: Selection[] = [
  {name: "GIGA対象", key: Giga.GIGA, iconName: require("@/assets/icons/giga.svg")},
  {name: "GIGA非対象", key: Giga.N_GIGA, iconName: require("@/assets/icons/non-giga.svg")},
]
