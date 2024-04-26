import React, { memo } from 'react';
import Button from '@material-ui/core/Button';

function CommonButton({
    type = 'button',
    children,
    className = '',
    onClick,
    disabled,
    icon = null,
    ...props
}) {
    let Icon = icon;
    // console.log(type, props)

    return (
        <Button
            type={type}
            disabled={disabled}
            className={`commonBtn btn-orange ${disabled?'btn-gray not-allowed':''} ${className}`}
            variant="contained"
            onClick={onClick}
            {...props}
        >
            {Icon && (
                <Icon className='mr-2' />
            )}
            {children}
        </Button>
    );
}

export default memo(CommonButton);