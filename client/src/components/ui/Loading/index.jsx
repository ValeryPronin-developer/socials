import React from "react";
import ReactLoading from "react-loading";
import * as SC from "./styles";

export const Loading = () =>
    <SC.ContainerLoading>
        <ReactLoading type={'spinningBubbles'} color={'#535bf2'} width={'15%'}/>
    </SC.ContainerLoading>