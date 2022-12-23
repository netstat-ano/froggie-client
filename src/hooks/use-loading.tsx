import { useState } from "react";
const useLoading = (): [boolean, () => void] => {
    const [isLoading, setIsLoading] = useState(true);
    const stopLoading = () => {
        setIsLoading(false);
    };
    return [isLoading, stopLoading];
};
export default useLoading;
