import React, { memo } from 'react'

const IconCalendar = ({ color = "black", ...props }) => (
    <svg {...props} width="20" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2.75H3C1.89543 2.75 1 3.64543 1 4.75V7.75M6 2.75H12.5M6 2.75V0.75M6 2.75V4.25M12.5 2.75H15.5C16.6046 2.75 17.5 3.64543 17.5 4.75V7.75H1M12.5 2.75V0.75M12.5 2.75V4.25M1 7.75V15.25C1 16.3546 1.89543 17.25 3 17.25H8M12 14.75L14.25 17.25L18.5 12.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default memo(IconCalendar);