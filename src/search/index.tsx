import React, {useState} from 'react';
import AutoComplete from './auto-completex/AutoComplete.tsx';
/***
 * define loose object  type for dynamic obj
 */
interface LooseObject {
    [key: string]: string
}

type Props  = {
    label?: string,
    columns?: number,
    values?: string[]
    onChange?: () => void,
}
const Search: React.FunctionComponent<Props> = (props): JSX.Element => {
    const [keyword, setKeyword] = useState<string>('');
    return <AutoComplete
    ></AutoComplete>
};
export default Search;
