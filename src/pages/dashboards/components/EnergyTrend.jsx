import IconApp from "../../../common/icons"
import CardLayout from "../../../common/layouts/CardLayout"
import GraphBar from "../../../components/GraphBar"
export default function EnergyTrend(){
    return(
        <CardLayout icon={IconApp.BOTH} title="Historical Energy Trend">
            <GraphBar />
        </CardLayout>
    )
}

