import React from 'react'
import {classMap} from "../../library/utils";
import {Copy} from "./Copy";

export const DataRows = ({
    rows,
    className
}: ComponentDataRows) => {

    const printTitleRow = (title: string | number): React.ReactElement => {
        return (
            <li className={classMap.assetTitleRow}>{title}</li>
        )
    }

    const printDataRow = (title: string | number, data: string | number, copy?: boolean): React.ReactElement => {
        return (
            <li key={title.toString() + data.toString()} className={classMap.assetDataRow}>
                <span>{title}</span>{' '}
                {copy ? (
                    <span><Copy text={data.toString()}/></span>
                ) : (
                    <span>{data}</span>
                )}
            </li>
        )
    }

  return (
    <ul className={`${classMap.assetData} ${className}`}>
        {rows.map((row, i) => {
            return row.data ? printDataRow(row.title, row.data, row.copy) : printTitleRow(row.title)
        })}
    </ul>
  )
}
