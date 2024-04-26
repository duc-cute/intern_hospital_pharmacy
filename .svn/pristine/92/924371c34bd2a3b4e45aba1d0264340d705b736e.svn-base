import React from 'react';
import { Grid } from '@material-ui/core'

const GlobitsFilterCollapse = ({openFilter, children, ...otherProps}) => {
    return (
        <>
            <div className={`dropdown-container ${openFilter ? '' : 'disappear'}`}>
                <Grid container spacing={2} className={`dropdown-children  ${openFilter ? '' : 'disappear'}`}>
                    {children}
                </Grid>
            </div>
        </>
    )
}
export default React.memo(GlobitsFilterCollapse)