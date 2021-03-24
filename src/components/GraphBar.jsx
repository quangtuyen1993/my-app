import { fade } from '@material-ui/core';
import {purple } from '@material-ui/core/colors';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ColorsApp from '../common/colors';



const initialState = {
    yAxisLabel: [],
    labelA: [],
    labelB: [],
}
const random = (min, max) => {
    return min + Math.random() * (max - min);
}

export default function GraphBar(props) {
    const [state, setState] = useState(initialState)

    

    useEffect(() => {
        let yLabels = []
        let aValues = []
        let bValues = []
        for (var i = 0; i < 24; i++) {
            var labelValue = `${i}:00`
            yLabels.push(labelValue)
            var aValue = random(0, 2000)
            aValues.push(aValue)
            var bValue = random(0, 2000)
            bValues.push(bValue)
        }
        setState(pre => {
            return {
                yAxisLabel: yLabels,
                labelA: aValues,
                labelB: bValues
            }

        })
    }, [props])
    return (
        <div style={{ minHeight: "30vh", position: "relative", margin: "auto", width: "75vw" }}>
            <Bar
                data={{
                    labels: state.yAxisLabel,
                    datasets: [
                        {
                            label: "A",
                            lineTension: 0.5,
                            fill: true,
                            borderColor: ColorsApp.ENEGRY,
                            backgroundColor: fade(ColorsApp.ENEGRY, 0.5),
                            borderWidth: 2,
                            data: state.labelA,
                        },
                        {

                            label: "B",
                            fill: true,
                            lineTension: 0.5,
                            borderColor: purple[500],
                            backgroundColor: fade(purple[500], 0.2),
                            borderWidth: 2,
                            data: state.labelB
                        },

                    ]
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

                                gridLines: {
                                    display: true,
                                },
                                distribution: 'linear',
                                bounds: 'ticks',
                            }],
                            yAxes: [{

                                gridLines: {
                                    display: true,
                                },
                                ticks: {
                                    beginAtZero: true,
                                },
                            }]
                        },
                    }
                }
            />
        </div>
    );
}
