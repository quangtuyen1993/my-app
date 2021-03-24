import { Box, Button, Card, CardContent, CardHeader, Container, Grid, List, ListItem, ListItemText, Paper, TextField, Typography, useTheme } from "@material-ui/core";
import React from "react";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import MDatePicker from "../../components/MDatePicker";
import TableApp from "../../components/TableApp";

export default function PRCalculationSreen() {


    const theme = useTheme()
    return (
        <>
            <Container
                disableGutters
                maxWidth={false}>
                <Grid container>
                    <Grid item xs={12} lg={12} md={12}>
                        <CardLayout title="PR Calculation">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={8} lg={8}>
                                    <MDatePicker
                                        isSignleDate={false}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <TextField
                                        label="Tref"
                                        fullWidth
                                        variant="outlined"
                                        placeholder="ref"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <TextField
                                        label="G_hor_sim"
                                        fullWidth
                                        variant="outlined"
                                        placeholder="G_hor_sim"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <TextField
                                        label="G_inc_sim"
                                        fullWidth
                                        variant="outlined"
                                        placeholder="G_inc_sim"
                                    />
                                </Grid>
                                {/* button group */}
                                <Grid item xs={12} lg={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} sm={6} lg={2} md={2}>
                                            <Button
                                                color="primary"
                                                fullWidth
                                                variant="contained">
                                                Calculate
                                    </Button>
                                        </Grid>
                                        <Grid item xs={6} sm={6} lg={2} md={2}>
                                            <Button
                                                color="primary"
                                                fullWidth
                                                variant="contained">
                                                Export
                                    </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>


                                {/* infor */}

                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <Card>
                                        <CardHeader component={() => {
                                            return <Typography variant="h5" style={{
                                                textAlign: "start",
                                                background: theme.palette.primary.main,
                                                padding:theme.spacing(2)
                                            }}>Result</Typography>
                                        }}>
                                        </CardHeader>

                                        <CardContent>


                                            {renderRowInfor(modelExample)}

                                        </CardContent>
                                    </Card>

                                </Grid>


                                <Grid item xs={12} sm={12} lg={8} md={8}>
                                    <TableApp
                                        data={MCCB_ABC}
                                        chipField={["Status"]}
                                        field={["Name", "Status"]}
                                        fieldTitle={["Name", "Status"]}
                                    >
                                    </TableApp>
                                </Grid>
                            </Grid>

                        </CardLayout>
                    </Grid>

                </Grid>

            </Container>
        </>
    )
}

const renderRowInfor = (model) => {
    // return (
    return Object.keys(modelExample).map((field) => (
        <Grid container>
            <Grid item xs={4} sm={4} md={4} lg={4}>
                {field.toLocaleUpperCase()}:
                </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8}>
                {model[field]}
            </Grid>

        </Grid>
    ))
    // )
}


const modelExample = {
    name: "tuyen",
    descrition: "handsome",
    gender: "male",
    major: "dev web"
}


const MCCB_ABC = [
    {
        "#": 1,
        "Name": "ACB 1",
        "Status": "Closed"
    },
    {
        "#": 2,
        "Name": "MCCB 1",
        "Status": "Closed"
    },
    {
        "#": 3,
        "Name": "MCCB 2",
        "Status": "Closed"
    },
    {
        "#": 4,
        "Name": "MCCB 3",
        "Status": "Closed"
    },
    {
        "#": 5,
        "Name": "MCCB 4",
        "Status": "Closed"
    },
    {
        "#": 6,
        "Name": "MCCB 5",
        "Status": "Closed"
    },
    {
        "#": 7,
        "Name": "MCCB 6",
        "Status": "Closed"
    },
    {
        "#": 8,
        "Name": "MCCB 7",
        "Status": "Closed"
    },
    {
        "#": 9,
        "Name": "MCCB 8",
        "Status": "Closed"
    }
]