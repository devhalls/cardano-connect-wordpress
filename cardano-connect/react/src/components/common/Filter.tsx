import React, {useMemo} from "react";
import {classMap} from "../../library/utils";

export const Filter = ({ filter, setFilter, prefix }: ComponentFilter) => {
    const handleChange = (e) => {
        if (filter.type === "checkbox") {
            setFilter({...filter, value: e.target.checked});
        } else {
            setFilter({...filter, value: e.target.value})
        }
    }

    const filterId = useMemo(() => {
        return prefix + filter?.key
    }, [prefix, filter])

    return (
        <div className={`${classMap.paginationFilter} ${classMap.paginationFilter}-${filter.type} ${filter.className || ''}`}>
            {filter.label ? <label htmlFor={filterId}>{filter.label}</label> : null}
            {filter.type ==='select' ? (
                <div className={classMap.selectWrapper}>
                    <select
                        id={filterId}
                        className={classMap.select}
                        onChange={handleChange}
                    >
                        {filter.options?.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            ) : (
                <input
                    id={filterId}
                    className={filter.type === 'checkbox' ? classMap.checkbox : filter.type === 'range' ? classMap.range : classMap.input}
                    placeholder={filter.placeholder || undefined}
                    type={filter.type}
                    value={filter.value || ''}
                    onChange={handleChange}
                    checked={filter.type === 'checkbox' ? filter.value : undefined}
                    min={filter.min ? filter.min : undefined}
                    max={filter.max ? filter.max : undefined}
                />
            )}
            {filter.type === 'range' ? <span>{filter.display ? filter.display(filter.value) : filter.value}</span> : null}
        </div>
    )
}
