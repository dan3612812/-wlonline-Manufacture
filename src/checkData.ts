import { InputItem } from "./type"

export function checkData(results: InputItem[]): boolean {
    // 檢查item id
    let tempItemArr: string[] = []
    // 檢查類別
    let tempCategorySet = new Set()
    // 檢查工具
    let tempToolSet = new Set()
    for (let obj of results) {
        tempItemArr.push(obj["需要材料"])
        tempItemArr.push(obj["名稱"])
        tempCategorySet.add(obj["類別"])
        tempToolSet.add(obj["製作工具"])
    }
    checkItemName(tempItemArr)
    console.log(Array.from(tempCategorySet).sort())
    // console.log(Array.from(tempToolSet))
    return true
}

function checkItemName(items: string[]) {

    let sets = new Set()
    for (let str of items) {
        let items = str.split("+")
        const pattern = /x\d{1,}/g
        for (let item of items) {
            const t = item.replace(pattern, "")
            sets.add(t)  // remove item needs count
        }
    }
    // console.log(`input count ${items.length} 唯一數量 ${sets.size}`)
    // console.log(sets)
    // console.log(JSON.stringify(Array.from(sets).sort(),undefined,4))
}
