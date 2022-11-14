
import { InputItem, Item, LimitedPeriod, TableKeysEnum } from "./type"

export function formatToJson(results: InputItem[]): Item[] {
    const finalData: Item[] = []
    let serial = 0
    for (let originItem of results) {
        serial++
        // change key with english from chinese
        // struct the data
        // let item: { [key in KeysEnum]: string } = {}
        let tempItem: { [key: string]: string } = {}
        for (let key in TableKeysEnum) {
            let theKey = key as keyof typeof TableKeysEnum
            let value = TableKeysEnum[theKey]
            tempItem[value] = originItem[theKey]
        }
        const itemString = tempItem as { [key in TableKeysEnum]: string }
        // parse all values type
        const { tool, name, nameAdditional, speedTime, value, category, quantity, picture, note } = itemString
        const [width, height] = (itemString.size == "" ? "1x1" : itemString.size).split("x")
        const size = { width: parseInt(width), height: parseInt(height) }
        const needItems = itemString.needItems.split("+").map((value, index,) => {
            const [item, count] = value.split("x")
            return { item, count: parseInt(count) }
        })
        const source = itemString.source.split(",")
        const limitedPeriod = itemString.limitedPeriod == "" ? "常態" : itemString.limitedPeriod
        if (!isLimitedPeriod(limitedPeriod)) {
            console.warn(`we don't have this ${limitedPeriod} please add new value in LimitedPeriod`)
            continue
        }
        const item: Item = {
            "id": serial,
            tool,
            name,
            nameAdditional,
            "speedTime": parseInt(speedTime),
            "value": parseInt(value),
            size,
            needItems,
            category,
            "quantity": parseInt(quantity),
            picture,
            "limitedPeriod": limitedPeriod,
            source,
            note
        }
        finalData.push(item)
    }
    return finalData
}

function isLimitedPeriod(limitedPeriod: string): limitedPeriod is keyof typeof LimitedPeriod {
    if (Object.keys(LimitedPeriod).includes(limitedPeriod)) {
        return true
    } else {
        return false
    }
}
