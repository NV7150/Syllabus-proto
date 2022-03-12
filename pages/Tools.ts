
export function get_order(day:string, period: number){
  let ord_1 = -1;
  switch (day){
    case "月": ord_1 = 0; break;
    case "火": ord_1 = 1; break;
    case "水": ord_1 = 2; break;
    case "木": ord_1 = 3; break;
    case "金": ord_1 = 4; break;
  }
  return [ord_1, period - 1]
}

const dayOrders = ["月","火","水","木","金"]
export function parseOrder(ord1: number, ord2: number){
  if(0 > ord1 || ord1 > 4){
    return "?"
  }
  const day = dayOrders[ord1];
  if(0 > ord2 || ord2 > 6){
    return "?"
  }
  return day + (ord2 + 1) + "限";
}

const field_icons: {[key: string]: any} = {
  "総合講座科目":　require("@/assets/icons/kouza.svg"),
  "言語コミュニケーション科目": require("@/assets/icons/lang.svg"),
  "共通科目": require("@/assets/icons/base.svg"),
  "データサイエンス１": require("@/assets/icons/ds1.svg"),
  "データサイエンス２": require("@/assets/icons/ds2.svg"),
  "情報技術基礎科目": require("@/assets/icons/programms.svg"),
  "ウェルネス科目": require("@/assets/icons/wellness.svg"),
  "総合政策系": require("@/assets/icons/sougouseisaku.svg"),
  "環境情報系": require("@/assets/icons/kankyojouhou.svg"),
  "研究プロジェクト科目": require("@/assets/icons/kenkyu.svg"),
  "others": require("@/assets/icons/others.svg")
}

export function fieldIcon(field: string){
  if(field in field_icons){
    return field_icons[field];
  }
  return field_icons["others"];
}

const method_icons: {[key:string]:any} = {
  "対面": require("@/assets/icons/oncumpus.svg"),
  "オンライン（ライブ）": require("@/assets/icons/online.svg"),
  "オンライン（オンデマンド）": require("@/assets/icons/ondemand.svg")
}

export function methodIcon(method: string){
  if(method in method_icons){
    return method_icons[method];
  }
  return field_icons["others"];
}

const term_icons: {[key: string]: any} = {
  "前半": require("@/assets/icons/zenhan.svg"),
  "後半": require("@/assets/icons/kouhan.svg")
}
export function termIcon(term: string){
  if(!(term in term_icons))
    return field_icons["others"];
  return term_icons[term];
}
