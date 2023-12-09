import React, { useState } from "react";
const SideBar = (props) => {

    const searchOnClick = () => props.getPlaceData();
    const routeOnClick = () => props.getPathPoint();
    const currentPositionOnClick = () => props.updateCurrentPosition();
    const placeData = props.placeData;

    return (
        <div style={{width: "30%", height: "90vh"}}>
            <div>
                <button onClick={() => searchOnClick()}>検索</button>
                <button onClick={() => routeOnClick()}>確定</button>
                <button onClick={() => currentPositionOnClick()}>現在地</button>
            </div>
            {placeData.length > 0
            ? placeData.map((item) => (
                <div>
                    {item.name}
                </div>
            ))
            : null}
        </div>
    )
};

export default SideBar