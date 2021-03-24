import IconApp from "../../../common/icons"
import CardLayout from "../../../common/layouts/CardLayout"
import GraphBar from "../../../components/GraphBar"
import MYearMonthPicker from "../../../components/MYearMonthPicker"
export default function EnergyTrend() {
    return (
        <CardLayout icon={IconApp.BOTH} title="Historical Energy Trend">
            <MYearMonthPicker
                types={[ "year"]}
            />
            <GraphBar />
        </CardLayout>
    )
}

