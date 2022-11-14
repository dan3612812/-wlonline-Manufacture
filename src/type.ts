export enum TableKeysEnum {
    "製作工具" = "tool",
    "名稱" = "name",
    "名稱補充" = "nameAdditional",
    "製作時間" = "speedTime",
    "物等" = "value",
    "寬高" = "size",
    "需要材料" = "needItems",
    "類別" = "category",
    "完成後數量" = "quantity",
    "圖片" = "picture",
    "限時" = "limitedPeriod",
    "取得方式" = "source",
    "備註" = "note"
}
export enum CategoryEnum {
    '一般', '交通工具',
    '傢俱', '兌換卡',
    '器具', '彩鑽',
    '攻城', '裝備',
    '零件', '食物'
}
export enum LimitedPeriod {
    "常態",
    "2020銀白聖誕",
    "2021中秋",
    "2022新年",
    "2022情人",
    "2022海灘",
    "2022中秋",
    "2022萬聖"
}

export type InputItem = {
    [key in keyof typeof TableKeysEnum]: string
}

export interface Item {
    id: number
    tool: string
    name: string
    nameAdditional: string
    speedTime: number
    value: number
    size: { width: number, height: number }
    needItems: { item: string, count: number }[]
    category: string
    quantity: number
    picture: string
    limitedPeriod: keyof typeof LimitedPeriod
    source: string[]
    note: string
}
