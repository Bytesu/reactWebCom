// TODO more tests
import MultiCheck, {Option} from './MultiCheck';
import React from 'react';
import {render, unmountComponentAtNode} from "react-dom";

import {act} from "react-dom/test-utils";


let container: any = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('MultiCheck', () => {

    describe('initialize', () => {
        const options = [
            {label: 'aaa', value: '111',},
            {label: 'bbb', value: '222',},
            {label: 'ccc', value: '333',},
            {label: 'ddd', value: '444',},
            {label: 'eee', value: '555',},
            {label: 'fff', value: '666',},
            {label: 'ggg', value: '777',},
            {label: 'hhh', value: '888',},
            {label: 'iii', value: '999',},
        ];
        const defaultValues = [
            '333',
            '555'
        ];

        it('renders the label if label provided', () => {
            let label = 'my-multi-check'
            render(<MultiCheck
                label={label}
                options={options}
                values={defaultValues}
                onChange={(options: Option[]) => {
                }}
                columns={2}/>, container)
            expect(container.querySelector('.title').textContent).toBe(label)
        });

        it('checked all option if `Select All` option is checked', () => {
            render(<MultiCheck
                label='my-multi-check'
                options={options}
                values={defaultValues}
                onChange={(options: Option[]) => {
                }}
                columns={2}/>, container)

            const btnSelectAll = container.querySelector('[class=select-all-input]');
            act(() => {
                btnSelectAll.dispatchEvent(new MouseEvent("click", {bubbles: true}));
            });
            const inputAll: HTMLInputElement[] = container.querySelectorAll('input') as HTMLInputElement[]
            let checkedNum = 0;
            inputAll.forEach(e => {
                if (e.checked) checkedNum++;
            })
            expect(checkedNum).toBe(options.length + 1)
        });
        it('unchecked all option if `Select All` option is unchecked', () => {
            render(<MultiCheck
                label='my-multi-check'
                options={options}
                values={defaultValues}
                onChange={(options: Option[]) => {
                }}
                columns={2}/>, container)

            const btnSelectAll = container.querySelector('[class=select-all-input]');
            act(() => {
                btnSelectAll.dispatchEvent(new MouseEvent("click", {bubbles: true}));
                // btnSelectAll.dispatchEvent(new MouseEvent("click", {bubbles: true}));
            });
            act(() => {
                btnSelectAll.dispatchEvent(new MouseEvent("click", {bubbles: true}));
            });
            const inputAll: HTMLInputElement[] = container.querySelectorAll('input') as HTMLInputElement[]
            let checkedNum = 0;
            inputAll.forEach(e => {
                if (e.checked) checkedNum++;
            })
            expect(checkedNum).toBe(0)
        });
        it('if all other options are checked, `Select All` option should be checked', () => {
            render(<MultiCheck
                label='my-multi-check'
                options={options}
                values={defaultValues}
                onChange={(options: Option[]) => {
                }}
                columns={2}/>, container)

            const btnSelectAll = container.querySelector('[class=select-all-input]');
            act(() => { //checked all
                btnSelectAll.dispatchEvent(new MouseEvent("click", {bubbles: true}));
            });
            act(() => { //unchecked all
                btnSelectAll.dispatchEvent(new MouseEvent("click", {bubbles: true}));
            });
            //set all option checked except select all option
            let inputOptions: HTMLInputElement[] = container.querySelectorAll('input.option-item') as HTMLInputElement[];
            inputOptions.forEach(e => {
                act(() => {
                    e.dispatchEvent(new MouseEvent("click", {bubbles: true}));
                });
            })
            expect(btnSelectAll.checked).toBe(true)
        });
        it('if any other option are unchecked, `select All` should be unchecked', () => {
            render(<MultiCheck
                label='my-multi-check'
                options={options}
                values={defaultValues}
                onChange={(options: Option[]) => {
                }}
                columns={2}/>, container)

            const btnSelectAll = container.querySelector('[class=select-all-input]');
            act(() => { //checked all
                btnSelectAll.dispatchEvent(new MouseEvent("click", {bubbles: true}));
            });
            //set all option checked except select all option
            act(() => {
                let inputOption: HTMLInputElement = container.querySelector('input.option-item') as HTMLInputElement;
                inputOption.dispatchEvent(new MouseEvent("click", {bubbles: true}));
            });
            expect(btnSelectAll.checked).toBe(false)
        });
        it('options support multiple-columns', () => {
            const column = 10;
            render(<MultiCheck
                label='my-multi-check'
                options={options}
                values={defaultValues}
                onChange={(options: Option[]) => {
                }}
                columns={column}
            />, container)
            let fristRow = container.querySelector('.flex-row');
            let col = column < 1 ? 1 : column;
            expect(fristRow.querySelectorAll('.checkbox-item').length).toBe(col)
        });

    });
})
;

export default {}
