import jwtAuthService from 'app/services/jwtAuthService'
import React, { memo, useEffect } from 'react'
import { Button } from "@material-ui/core";
import localStorageService from 'app/services/localStorageService';
import history from 'history.js';
import Config from "app/appConfig";

const NotAuthorized = () => {
    const user = localStorageService.getLoginUser();

    useEffect(() => {
        if(user?.userPermissionDto?.orgId) {
            history.push(Config.HOME_PAGE);
        }
    }, [user])

    return (
        <div className="flex flex-center flex-middle h-100vh bg-white" style={{ margin: '-8px -20px' }}>
            <div className="flex flex-column flex-center flex-middle" style={{ maxWidth: "370px" }}>
                <svg width="90px" height="90px" viewBox="0 0 16 16" fill="none" >
                    <g strokeWidth="0"></g>
                    <g strokeLinecap="round" strokeLinejoin="round"></g>
                    <g>
                        <path d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.548 1.653,10.198 1.848,10.840 2.160 C 11.538 2.500,12.020 2.846,12.587 3.413 C 13.154 3.980,13.500 4.462,13.840 5.160 C 14.285 6.075,14.486 6.958,14.486 8.000 C 14.486 9.054,14.284 9.932,13.826 10.867 C 13.654 11.218,13.307 11.781,13.145 11.972 L 13.090 12.037 8.527 7.473 L 3.963 2.910 4.028 2.855 C 4.219 2.693,4.782 2.346,5.133 2.174 C 6.305 1.600,7.555 1.395,8.853 1.563 M7.480 8.534 L 12.040 13.095 11.973 13.148 C 11.734 13.338,11.207 13.662,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.468 8.989,1.403 7.738,1.670 6.535 C 1.849 5.734,2.268 4.820,2.766 4.147 C 2.836 4.052,2.899 3.974,2.907 3.974 C 2.914 3.974,4.972 6.026,7.480 8.534 " stroke="none" fillRule="evenodd" fill="#FF0000"></path>
                    </g>
                </svg>

                <h3 className='mt-6 mb-0'>Bạn chưa được cấp quyền cập!</h3>
                <p>Vui lòng liên hệ Admin để được cấp quyền truy cập!</p>

                <Button className="btn-blue mt-2" onClick={() => jwtAuthService.logout()}>
                    Đăng xuất
                </Button>
            </div>
        </div>
    )
}

export default memo(NotAuthorized)