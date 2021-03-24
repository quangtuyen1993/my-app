import { Container, Box, Grid } from "@material-ui/core";
import Table from "../dashboards/components/PowerTrend";
export default function TreendScreen() {
    var list = [
        <Table/>,
        <Table/>,
        <Table/>,
        <Table/>,
    
    ]
    return (
        <>
            <Container
                disableGutters
                direction="row"
                maxWidth={false}>
                <Grid container
                    spacing={2}

                >
                    {
                        list.map((item, index) => (
                            <Grid item sm={12} key={index}>
                                <Box key={index}>
                                    {
                                       item
                                    }
                                </Box>
                            </Grid>
                        ))


                    }
                </Grid>

            </Container>
        </>
    )
}