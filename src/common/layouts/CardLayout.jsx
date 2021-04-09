import {
  Card,
  CardHeader,
  Divider,
  Grid,
  CardContent,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import StringUtils from "../../utils/StringConvert";
import IconApp from "../icons";
import FileSaver from "file-saver";
const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2),
  },
  lineHeader: {
    backgroundColor: theme.palette.secondary.main,
    height: "5px",
  },
  form: {
    padding: "10px",
    borderRadius: "2px",
    backgroundColor: "white",
    boxShadow: " 1px 1px 0.5px #9E9E9E;",
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: 0,
    },
  },
}));
const CardLayout = (props) => {
  const classes = useStyles();
  const themes = useTheme();

  const onExport = () => {
    var arrayData = [];
    var check = Array.isArray(props.export);
    var name = props.title;

    if (!check) {
      arrayData.push(props.export);
    } else {
      arrayData = [...props.export];
    }

    downloadCSV(arrayData, name);
    return;
  };

  const downloadCSV = (data, name) => {
    const csv = StringUtils.convertArrayToCSV(data);
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(csvData, `${name}.csv`);
  };

  return (
    <>
      <Card
        variant="elevation"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: props.minHeight ? props.minHeight : "auto",
        }}
      >
        <CardHeader
          component={() => (
            <div>
              <div className={classes.lineHeader} />
              <Grid
                className={classes.header}
                direction="row"
                container
                alignItems="center"
                spacing={1}
              >
                <Grid item lg={3} md={4} sm={6} xs={6}>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    alignContent="center"
                  >
                    <Box mr={1}>
                      <FontAwesomeIcon
                        icon={props.icon ? props.icon : faTachometerAlt}
                        style={{ fontSize: "24px" }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {props.title &&
                          (props.isCap
                            ? props.title.replaceAll("_", " ")
                            : StringUtils.capitalize(
                                props.title.replaceAll("_", " ")
                              ))}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                {props.export && (
                  <Grid item lg={9} md={8} sm={6} xs={6}>
                    <Box
                      pr={1}
                      display="flex"
                      flex="3"
                      justifyContent="flex-end"
                    >
                      <Button
                        onClick={onExport}
                        variant="contained"
                        color="secondary"
                        startIcon={<FontAwesomeIcon icon={IconApp.CSV} />}
                      >
                        Export
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </div>
          )}
        />
        <Divider style={{ backgroundColor: themes.palette.primary.main }} />
        <CardContent
          style={{
            height: "100%",
            flexGrow: 1,
          }}
        >
          {props.children}
        </CardContent>
      </Card>
    </>
  );
};
export default CardLayout;
