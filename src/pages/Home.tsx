import React from 'react';
import Layout from '../components/Layout';
import Chart from '../components/Chart';
import Loader from '../components/Loader';
import useFetchData from '../hooks/useFetchData';

const Home: React.FC = () => {
    const {data, isLoading} = useFetchData();

    return <Layout>
        {isLoading ? <Loader/> : <Chart data={data}/>}
    </Layout>;
};

export default Home;
