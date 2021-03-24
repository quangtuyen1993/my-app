
import { Chip, } from '@material-ui/core';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Link } from 'react-router-dom';
import ColorsApp from '../common/colors';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((themes) => ({
  cell: {
    textAlign: "center"
  }
}));


const TableApp = forwardRef((props, ref) => {
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

    if (listHeader !== undefined && listHeader.length !== 0)
      return (
        <tr style={{ color: "white", background: themes.palette.primary.main }}>
          {
            (state.index) ? (<th className={classes.cell}>#</th>) : (null)
          }
          {
            listHeader.map((f, index) => (
              <th key={f} scope={state.col} className={classes.cell}>{f}</th>
            ))
          }
        </tr>
      )
    return null
  }


  const renderBody = () => {
    if (state.data !== undefined && state.data.length !== 0)

      return state.data.map((item, index) => (
        <tr key={index}>
          {(state.index) ? (<th>{index+1}</th>):null}
          {
            state.field.map((f) =>
              <th className={classes.cell} key={f}>{
                renderRow(item, f)
              }
              </th>
            )
          }
          {/* redenr link */}
          {
            (props.link) ?
              <th className={classes.cell}>
                <Link key={item.id} to={props.path + "/" + item.id}>See Detail</Link>
              </th>
              : null
          }
        </tr>
      ))
    return null
  }
  const themes = useTheme()

  const renderRow = (item, f) => {
    if (state.chipField === undefined || !state.chipField.includes(f)) {
      return item[f]
    } else {
      return <ChipTag name={item[f]} onClick={(e) => props.onChipClick ? props.onChipClick(item, f) : console.log("chip click")} />
    }
  }

  return (
    <div id="">
      <table ref={ref} id="table_container" className="table table-bordered table-hover ">
        <thead>
          {renderHeader()}
        </thead>
        <tbody>
          {renderBody()}
        </tbody>
      </table>

    </div>
  );

  function ChipTag(props) {
    return (
      <Chip
        {...props}
        label={props.name}
        style={{ backgroundColor: ColorsApp.ENEGRY, color: "white" }} />
    )
  }
})
TableApp.propTypes = {
  field: PropTypes.array,
  data: PropTypes.array,
  chipField: PropTypes.array,
  fieldTitle: PropTypes.array,
  link: PropTypes.bool,
  onChipClick: PropTypes.func
}
export default TableApp