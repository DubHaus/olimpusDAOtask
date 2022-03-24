export type AssetsData = {
    name?: string;
    tvlInfo?: Index[];
    arp?: Index[];
};

type ApiData = {
    data: Assets[];
};

type Assets = {
    asset: string;
    selected_farm: FarmInfo[];
};

type FarmInfo = {
    active: boolean;
    tvlStakedHistory: Index[];
};

export type Index = {
    date: string;
    value: number;
};

const generateArp = () => {
    const arp: Index[] = [{value: 1, date: '2022-02-23'}];

    for (let i = 1; i < 30; i++) {
        const last = arp[i - 1];
        const date: Date = new Date(last.date);
        date.setDate(date.getDate() + 1);

        arp.push({
            date: date.toISOString().split('T')[0],
            value: Math.random() / 20 + last.value,
        });
    }

    return arp;
};

const mapAssest = ({data}: ApiData) => {
    const lunaAssets = data.find(el => el.asset === 'LUNA');
    if (lunaAssets) {
        return {
            name: lunaAssets.asset,
            tvlInfo:
                lunaAssets.selected_farm
                    .find(el => el.active)
                    ?.tvlStakedHistory.map(el => ({
                        date: new Date(el.date).toISOString().split('T')[0],
                        value: el.value / 1000000,
                    }))
                    .reverse() || [],

            arp: generateArp(),
        };
    } else return {};
};

export const getAssets = () =>
    fetch(
        `https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000`
    )
        .then(resp => {
            return resp.json();
        })
        .then(mapAssest);
