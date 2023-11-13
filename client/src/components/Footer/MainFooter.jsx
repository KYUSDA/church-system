import React from 'react'

const MainFooter = () => {
    return (
        <div
            className="copyright"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                width: '100vw'
            }}
        >
            <p className="p-text">@2023 - 2024 KYUSDA CHURCH</p>
            <p className="p-text">All rights reserved</p>
        </div>
    )
}

export default MainFooter