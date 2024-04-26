import React, { memo } from 'react'

function Required({ label, requiredLabel }) {
    if(!label) {
        return null;
    }

    return (
        <>{label} {requiredLabel && <span> (<span className="text-required">*</span>)</span>}</>
    )
}

export default memo(Required)