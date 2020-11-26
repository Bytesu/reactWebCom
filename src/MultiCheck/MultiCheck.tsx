import './MultiCheck.css';

import React, {useState} from 'react';
import {MultiCheckOption} from './MultiCheckOption'

export type Option = {
    label: string,
    value: string,
    checked?: boolean,
}


/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
    label?: string,
    options: Option[],
    columns?: number,
    values?: string[]
    onChange?: (options: Option[]) => void,
}

export type CheckboxChangeArgType = {
    value: string,
    index: string,
    checked: boolean,
}

/***
 * define loose object  type for dynamic obj
 */
interface LooseObject {
    [key: string]: boolean
}

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
    let tmp: LooseObject = {}, values: string[] = props.values || [];
    values.map(item => {
        tmp[item] = true;
    })
    let column = props.columns || 1;
    if (column < 1) {
        column = 1;
    }
    const [items, setItems] = useState<Option[]>(props.options);
    const [selectAll, setSelectAll] = useState<boolean>(values.length == props.options.length);

    const [selectedVal, setSelectedVal] = useState<LooseObject>(tmp);

    //checkbox item change callback
    function onMultiCheckOptionChange(e: CheckboxChangeArgType): void {
        let {checked, value, index} = e, obj: LooseObject = {};
        if (index == '-1') { // un/select all
            if (checked)
                items.forEach(item => {
                    obj[item.value] = checked;
                })
            else {
                obj = {};
            }
        } else {
            let tmp: LooseObject = {...selectedVal}
            if (checked) {
                obj[value] = checked;
            } else {
                delete tmp[value];
            }
            obj = Object.assign({}, tmp, obj)
        }
        let len: number = Object.keys(obj).length;
        if (len == items.length) {
            !selectAll && setSelectAll(!selectAll)
        } else {
            selectAll && setSelectAll(!selectAll)
        }
        setSelectedVal(obj);
        props.onChange && props.onChange(items.filter(item => obj[item.value]));
    }

    let rows = new Array(Math.ceil(items.length / column)).fill(0);

    return <div className='MultiCheck'>
        <div className="title">{props.label || 'not provided label'}</div>
        <div className="content">
            <MultiCheckOption
                className='select-all-input'
                label="Select all"
                index="-1"
                value="-1"
                checked={selectAll}
                onChange={onMultiCheckOptionChange}
            ></MultiCheckOption>
            <div>
                {
                    rows.map((row, rIndex) => {
                        let subItems = items.slice(rIndex * column, (rIndex + 1) * column);
                        if (subItems.length != column) {
                            subItems = subItems.concat(new Array(column - subItems.length).fill({}))
                        }
                        return <div
                            className="flex-row "
                            key={rIndex}
                        >
                            {
                                subItems.map((opt, index) => {
                                    return <div
                                        key={opt.value||index}
                                        className="flex1 flex-row checkbox-item">
                                        {
                                            opt.label ? <MultiCheckOption
                                                index={index}
                                                value={opt.value}
                                                label={opt.label}
                                                checked={!!selectedVal[opt.value]}
                                                onChange={onMultiCheckOptionChange}
                                            ></MultiCheckOption> : null
                                        }
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>

    </div>
}

export default MultiCheck;
