/* @flow */

import React from 'react';
import {Input} from 'element-react'
type Props = {
    label?: string,
}
const AutoComplete: React.FunctionComponent<Props> = (props): JSX.Element => {
    return <div className='el-autocomplete'  >
            <Input
                placeholder='请输入搜索关键词'
                ref={node => this.inputNode = node}

            />
        </div>;
}

export default AutoComplete;
