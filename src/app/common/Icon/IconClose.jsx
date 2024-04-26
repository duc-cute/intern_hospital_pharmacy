import React, { memo } from 'react'

const IconClose = ({ color = "#FFFFFF", ...props }) => (
    <svg {...props} width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M9.25 0.75L0.75 9.25M0.75 0.75L9.25 9.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default memo(IconClose)