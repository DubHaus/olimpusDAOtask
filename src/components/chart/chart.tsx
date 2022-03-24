import {XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area} from 'recharts';
import {Index} from '../../api';
import {dateToStr} from '../../tools';

type Props = {
    assets?: Index[];
    label: string;
};

const Chart = ({assets = [], label}: Props) => {
    return (
        <div
            style={{
                background: '#2E3454',
                borderRadius: 10,
                width: 750,
                paddingBottom: 10,
                margin: 20,
            }}>
            <h3
                style={{
                    textAlign: 'center',
                    color: '#E8F0F3',
                    padding: 20,
                    margin: 0,
                }}>
                {label}
            </h3>
            <AreaChart
                width={750}
                height={350}
                data={assets?.map(el => ({
                    date: dateToStr(el.date),
                    uv: el.value,
                }))}
                margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#3B5F88"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis
                    tick={{fill: '#939ECF'}}
                    tickLine={{stroke: '#939ECF'}}
                    dataKey="date"
                />
                <YAxis
                    tick={{fill: '#939ECF'}}
                    tickLine={{stroke: '#939ECF'}}
                />
                <CartesianGrid stroke="#383C61" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#BC53E3"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
            </AreaChart>
        </div>
    );
};

export default Chart;
