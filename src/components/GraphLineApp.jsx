import { fade } from '@material-ui/core';
import { indigo, purple } from '@material-ui/core/colors';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { LISTCOLOR } from '../common/colors';


const initialState = {
    yAxisLabel: [],
    dataSet: []
}

const DatePickerApp=(props) =>{
    const [state, setState] = useState(initialState)
    useEffect(() => {
        let label = []
        let dataSet = []
        props.data.forEach((item, index) => {

            var value = []
            item.data.forEach((da, i) => {

                if (index === 0) {
                    label.push(da.date)
                }
                value.push(da.value)
            })

            dataSet.push({
                label: item.name,
                lineTension: 0.5,
                fill: true,
                borderColor: LISTCOLOR[index],
                backgroundColor: fade(LISTCOLOR[index], 0.1),
                borderWidth: 2,
                data: value,
            })
        })
        setState(pre => {
            return {
                yAxisLabel: label,
                dataSet: dataSet
            }

        })
    }, [props.data])
    return (
        <div style={{ minHeight: "30vh", position: "relative", margin: "auto", width: "75vw" }}>
            <Line
                data={{
                    labels: state.yAxisLabel,
                    datasets: state.dataSet
                }}
                options={
                    {
                        tooltips: {
                            enabled: true,
                            mode: 'index',
                            intersect: false
                        },

                        elements: {
                            point: {
                                radius: 0
                            }
                        },
                        hover: {
                            animationDuration: 0
                        },
                        responsiveAnimationDuration: 0,
                        maintainAspectRatio: false,
                        responsive: true,

                        legend: {
                            display: true,
                            position: 'top'
                        },
                        offset: true,
                        scales: {
                            xAxes: [{
                                type: "time",
                                time: {
                                    displayFormats: {
                                        hour: 'HH:mm'
                                    },
                                    min: moment(new Date(props.data[0].data[0].date)).startOf('day'),
                                    max: moment(new Date(props.data[0].data[0].date)).endOf('day'),

                                },
                                gridLines: {
                                    display: true,
                                },
                                distribution: 'series',
                                bounds: 'ticks',
                                tick: {
                                    scaleOverride: true,

                                }

                            }],
                            yAxes: [{

                                gridLines: {
                                    display: true,
                                },
                                bounds: 'ticks',
                                ticks: {
                                    beginAtZero: true,
                                    suggestedMax: 1500
                                },
                            }]
                        },
                    }
                }
            />
        </div>
    );
}

export default React.memo(DatePickerApp)