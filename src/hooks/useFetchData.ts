import {useState, useEffect} from 'react';
import {generateMockData} from '../utils/generateMockData';
import {Point, Track} from '../types/types';

const useFetchData = () => {
    const [data, setData] = useState<{ points: Point[], tracks: Track[] }>({points: [], tracks: []});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setData(generateMockData());
            setIsLoading(false);
        }, 1000);
    }, []);

    return {data, isLoading};
};

export default useFetchData;
