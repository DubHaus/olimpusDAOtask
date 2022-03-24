import {useEffect, useState} from 'react';
import {AssetsData, getAssets} from '../api';

const useGetAssets = (): [boolean, AssetsData | null] => {
    const [isLoading, setIsLoading] = useState(false);
    const [assets, setAssets] = useState<AssetsData | null>(null);

    useEffect(() => {
        setIsLoading(true);

        getAssets()
            .then(setAssets)
            .finally(() => setIsLoading(false));
    }, [setAssets, setIsLoading]);

    return [isLoading, assets];
};

export default useGetAssets;
