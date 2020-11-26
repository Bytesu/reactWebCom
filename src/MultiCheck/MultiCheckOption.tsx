import React from 'react';

export type MultiCheckOptionProps = {
    label: string,
    value: string,
    className?: string,
    index?: string|number,
    checked?: boolean,
    onChange?: (e: any) => void
}

/**
 * check box option component
 * @param props     MultiCheckOptionProps
 * @constructor
 */
export const MultiCheckOption: React.FunctionComponent<MultiCheckOptionProps> = (props): JSX.Element => {

    return <div>
        <input
            className={props.className || 'option-item'}
            type="checkbox"
            data-index={props.index || ''}
            value={props.value || ''}
            checked={props.checked}
            onChange={(e) => {
                props.onChange && props.onChange({
                    index: props.index,
                    value: props.value,
                    checked: e.currentTarget.checked,
                })
            }}/> {props.label}
    </div>
}
