import { StyledArrowDown, StyledArrowUp, StyledUnsorted } from './tableStyles';

export interface Column {
    disableSortBy: boolean;
    isSorted: boolean;
    isSortedDesc: boolean;
}

export const getSortBySVG = ({disableSortBy, isSorted, isSortedDesc}: Column) => {
    if(disableSortBy){
        return null
    }
    return (        
        (!disableSortBy && (isSorted ? 
            (isSortedDesc ? <StyledArrowDown aria-label='arrow-down' className='sort-icon' /> : <StyledArrowUp aria-label='arrow-up' className='sort-icon' />) 
        : 
        <StyledUnsorted aria-label='unsorted-icon' className='sort-icon' /> ))
    )
}
