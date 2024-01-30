// pages/index.js
import dynamic from 'next/dynamic';

const DynamicGame = dynamic(() => import('../components/Game'), { ssr: false });

const Home = () => {
    return (
        <div>
            <DynamicGame />
        </div>
    );
};

export default Home;
