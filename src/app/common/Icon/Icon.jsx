import React, { memo } from 'react'

export const IconRemove = memo(({ color = "#000000", ...props }) => (
    <svg viewBox="0 0 24 24" width="17" height="17" {...props}>
        <path d="M19 13H5v-2h14v2z" stroke={color}></path>
    </svg>
));

export const IconArrowLeft = memo(() => (
    <svg width="24" height="24" viewBox="0 0 24 24" >
        <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
    </svg>
))

export const IconArrowRight = memo(() => (
    <svg width="24" height="24" viewBox="0 0 24 24" >
        <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
    </svg>
))

export const IconPen = memo((props) => (
    <svg {...props} width="19" height="18" viewBox="0 0 19 18" fill="none">
        <path d="M12.25 2.5L1.5 13.25V17.25H5.5L16.25 6.5M12.25 2.5L13.1716 1.57843C13.702 1.04799 14.4214 0.75 15.1716 0.75C16.7337 0.75 18 2.01633 18 3.57843C18 4.32857 17.702 5.04799 17.1716 5.57843L16.25 6.5M12.25 2.5L16.25 6.5" stroke="#3699FF" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
));

export const IconAdd = memo(({ color = "#ffffff", ...props }) => (
    <svg {...props} width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4.74921 10.0006H15.2492M9.99921 4.75049V15.2505" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
));

export const IconDelete = memo((props) => (
    <svg {...props} width="17" height="18" viewBox="0 0 17 18" fill="none">
        <path d="M1 3.75H15.5M5 3.75V2.75C5 1.64543 5.89543 0.75 7 0.75H9.5C10.6046 0.75 11.5 1.64543 11.5 2.75V3.75M10.5 7.75V13.25M6 7.75V13.25M2 3.75H14.5L13.8549 15.3609C13.7961 16.4208 12.9195 17.25 11.858 17.25H4.64197C3.5805 17.25 2.70393 16.4208 2.64505 15.3609L2 3.75Z" stroke="#FF0303" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
));

export const IconReplay = memo(({ color = "#000000", ...props }) => (
    <svg  {...props} width="24" height="24" viewBox="0 0 24 24">
        <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" stroke={color}></path>
    </svg>
));
