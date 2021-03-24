import { Box, Container, CssBaseline, Grid, Paper, Typography } from "@material-ui/core";
import { PUBLIC_ICON, PUBLIC_ICON_ISOLAR } from "../common/icons";


export default function NotFound() {
    return (

        <>
        <CssBaseline/>

        <Container maxWidth={false} style={{ padding: 0, margin: 0 }}>
        
            <Grid container
                style={{ minHeight: "100vh" }}
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center">
                <Grid item sm={12} xs={12} md={12} lg={12} >
                    <Paper style={{padding:"10px"}}>
                        <Grid container direction="column"
                            alignItems="center"
                            spacing={2}
                            justify="center">
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <div style={{ margin: "auto" }}>
                                    <img width="150px" src={PUBLIC_ICON} alt="icom" />
                                    <img width="150px" src={PUBLIC_ICON_ISOLAR} alt="icom" />
                                </div>

                            </Grid>

                            <Grid item sm={12} xs={12} md={12} lg={12} style={{ color: "black" }}>
                                <Box textAlign="center">
                                    <Typography variant="h4">
                                        Page not found!
                            </Typography>
                                    <Typography variant="h5" style={{ color: "black" }}>
                                        Please check your website address
                            </Typography>
                                </Box>

                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>

            </Grid>


        </Container>
        </>
    )
}