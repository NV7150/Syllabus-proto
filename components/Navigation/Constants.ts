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

export const FieldTexts: {name: string,field: string, iconName: string}[] = [
  {name: "総合講座科目", field: Fields.GENERAL, iconName: require("@/assets/icons/kouza.svg"),},
  {name: "言語コミュニケーション科目", field:Fields.LANG_COM, iconName: require("@/assets/icons/lang.svg")},
  {name:　"基盤-共通科目", field: Fields.SHARED, iconName: require("@/assets/icons/base.svg")},
  {name: "データサイエンス１", field: Fields.DS1, iconName: require("@/assets/icons/ds1.svg")},
  {name: "データサイエンス２", field: Fields.DS2, iconName: require("@/assets/icons/ds2.svg")},
  {name: "情報技術基礎科目", field: Fields.IT_BASE, iconName: require("@/assets/icons/programms.svg")},
  {name: "ウェルネス科目", field: Fields.WELLNESS, iconName: require("@/assets/icons/wellness.svg")},
  {name: "先端-環境情報系", field: Fields.INFO_ENV, iconName: require("@/assets/icons/kankyojouhou.svg")},
  {name: "先端-総合政策系", field: Fields.POLICY_MAN, iconName: require("@/assets/icons/sougouseisaku.svg")},
  {name: "研究プロジェクト科目", field: Fields.RESEARCH, iconName: require("@/assets/icons/kenkyu.svg")},
  {name: "その他", field: Fields.OTHER, iconName: require("@/assets/icons/others.svg")}
]
