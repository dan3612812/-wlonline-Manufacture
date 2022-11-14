import { readFile, writeFile } from "fs/promises"
import { resolve } from "path"
import { InputItem } from "./type"
import { formatToJson } from "./formatJson"
import { checkData } from "./checkData"

// const outputJsonFile = resolve(import.meta.url, "output/item.json")
const outputJsonFile = resolve(__dirname, "../output/item.json")

async function main() {
    //  read file and handle
    const results: InputItem[] = []
    const str = (await readFile("./wlitem.csv")).toString()
    const lines = str.split("\r\n")
    const keys = lines[0].split(",")
    // handle the First value 
    keys[0] = keys[0].replace("﻿", "")
    console.log(keys)

    for (let i = 1; i < lines.length; i++) {
        // expect the last line 
        if (!lines[i].includes(",")) continue
        const values = lines[i].split(",")
        let item: { [key in string]: string } = {}
        for (let j = 0; j < keys.length; j++) {
            item[keys[j]] = values[j]
        }
        results.push(item as InputItem)
    }
    // check input data ,you needs use eyes to check next line code feedback
    if (!checkData(results)) {
        console.log("the format is error form input data")
        return
    }
    // now the results can use on notion
    // then
    // format pretty json data
    writeFile(outputJsonFile, JSON.stringify(formatToJson(results), undefined, 4))

}
main()



