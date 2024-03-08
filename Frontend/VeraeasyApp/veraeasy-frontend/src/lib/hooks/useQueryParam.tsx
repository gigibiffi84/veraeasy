import {useLocation} from "react-router";
import React from "react";

function useQueryParam() {
    const {search} = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default useQueryParam;