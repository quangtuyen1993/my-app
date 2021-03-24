
import { Chip, } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ColorsApp from '../common/colors';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((themes) => ({
  cell: {
    textAlign: "center"
  }
}));


export default function TableApp(props) {
  const classes = useStyles()
  const [state, setState] = useState({
    data: [],
    col: "col-3",
    field: [],
    chipField: [],
    fieldTitle: [],
    index: true
  })

  useEffect(() => {

    var col = 12 / props.field

    setState(pre => {
      return {
        ...pre,
        field: props.field,
        data: props.data,
        col: "col-" + col,
        chipField: props.chipField,
        fieldTitle: props.fieldTitle,
        index: props.index ? props.index : true,
      }
    })
  }, [props])


  const renderHeader = () => {
    var listHeader = []
    if (state.fieldTitle === undefined) {
      listHeader = state.field
    } else {
      listHeader = state.fieldTitle
    }

    return (
      <tr style={{ color: "white", background: themes.palette.primary.main }}>
        {
          (state.index) ? <th className={classes.cell}>#</th> : null

        }

        {
          listHeader.map((f, index) => (
            <th key={f} scope={state.col} className={classes.cell}>{f}</th>
          ))
        }
      </tr>
    )
  }

  const themes = useTheme()

  const getRow = (item, f) => {
    if (state.chipField === undefined || !state.chipField.includes(f)) {
      return item[f]
    } else {
      return <ChipTag name={item[f]} />
    }
  }

  return (
    <>
      <table className="table table-bordered table-hover ">
        <thead>
          {renderHeader()}
        </thead>
        <tbody>
          {
            state.data.map((item, index) => (
              <tr key={index}>
                {(state.index) ? <th className={classes.cell} >{index}</th> : null}
                {
                  state.field.map((f, index) =>
                    <th className={classes.cell} key={f}>{
                      getRow(item, f)
                    }
                    </th>
                  )
                }
                {
                  (props.link) ?
                    <th className={classes.cell}>
                      <Link key={item.id} to={props.path + "/" + item.id}>See Detail</Link>
                    </th>
                    : null
                }
              </tr>
            ))}
        </tbody>
      </table>

    </>
  );

  function ChipTag(props) {
    return (
      <Chip
        label={props.name}
        style={{ backgroundColor: ColorsApp.ENEGRY, color: "white" }} />
    )
  }
}
TableApp.propTypes = {
  field: PropTypes.array,
  data: PropTypes.array,
  chipField: PropTypes.array,
  fieldTitle: PropTypes.array,
  link: PropTypes.bool,

}
