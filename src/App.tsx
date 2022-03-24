import Chart from './components/chart';
import useGetAssets from './hooks/useGetAssets';

function App() {
    const [isLoading, assets] = useGetAssets();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            className="App">
            <header className="App-header"></header>
            {!isLoading && assets && (
                <>
                    <Chart assets={assets.arp} label="Asset ARP(y)" />
                    <Chart assets={assets.tvlInfo} label="Asset TVL" />
                </>
            )}
        </div>
    );
}

export default App;
