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
    const selectedValObjTmp: LooseObject = {} = {},
        values: string[] = props.values || [],
        allCheckVal = '-1';

    values.map(item => {
        selectedValObjTmp[item] = true;
    })

    let column = props.columns || 1;
    if (column < 1) {
        column = 1;
    }
    const [checkOptions, setCheckOptions] = useState<Option[]>(props.options);
    const [selectAll, setSelectAll] = useState<boolean>(values.length == props.options.length);
    const [selectedValObj, setSelectedValObj] = useState<LooseObject>(selectedValObjTmp);


    //checkbox item change callback
    function onMultiCheckOptionChange(e: CheckboxChangeArgType): void {
        let {checked, value, index} = e, obj: LooseObject = {}, resArr = [];
        if (index == allCheckVal) { // un/select all
            if (checked)
                checkOptions.forEach(item => {
                    obj[item.value] = checked;
                })
            else {
                obj = {};
            }
        } else {
            const tmp: LooseObject = {...selectedValObj};//, tmpArr = [...selectedArrVal]
            if (checked) {
                obj[value] = checked;                                                              //@Object
            } else {
                delete tmp[value];//                                                               //@Object
            }
            obj = Object.assign({}, tmp, obj)
        }
        let len: number = Object.keys(obj).length;
        if (len == checkOptions.length) {
            !selectAll && setSelectAll(!selectAll)
        } else {
            selectAll && setSelectAll(!selectAll)
        }
        setSelectedValObj(obj);                    //@Object
        props.onChange && props.onChange(checkOptions.filter(item => obj[item.value]));
    }

    let rows = new Array(Math.ceil(checkOptions.length / column)).fill(0);

    return <div className='MultiCheck'>
        <div className="title">{props.label || 'not provided label'}</div>
        <div className="content">
            <MultiCheckOption
                className='select-all-input'
                label="Select all"
                index={allCheckVal}
                value={allCheckVal}
                checked={selectAll}
                onChange={onMultiCheckOptionChange}
            ></MultiCheckOption>
            <div>
                {
                    rows.map((row, rIndex) => {
                        let subCheckOptions = checkOptions.slice(rIndex * column, (rIndex + 1) * column);
                        if (subCheckOptions.length != column) {
                            subCheckOptions = subCheckOptions.concat(new Array(column - subCheckOptions.length).fill({}))
                        }
                        return <div
                            className="flex-row "
                            key={rIndex}
                        >
                            {
                                subCheckOptions.map((opt, index) => {
                                    return <div
                                        key={opt.value || index}
                                        className="flex1 flex-row checkbox-item">
                                        {
                                            opt.label ? <MultiCheckOption
                                                index={index}
                                                value={opt.value}
                                                label={opt.label}
                                                checked={!!selectedValObj[opt.value]}
                                                // checked={selectedArrVal.indexOf(opt.value)>-1}
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
