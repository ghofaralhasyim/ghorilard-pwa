<script>
    import { chart } from "svelte-apexcharts";
    import { graphautodata } from "../Dasboard-comp/data";

    let optionsChart;
    let graphData_ph = [];
    let graphData_temperature = [];
    
    let i = 0;
    $graphautodata.forEach(element => {
        var eldate = new Date(element.timestamp);
        graphData_temperature[i] = [eldate.getTime(),element.water_temp];
        graphData_ph[i] = [eldate.getTime(),element.ph_meter];
        i++;
    });


    optionsChart = {
        chart: {
            type: 'area',
            curve: 'smooth',
            height: 350,
            stacked: false,
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                speed: 500
                }
            },
            zoom: {
                enabled: true,
                type: 'x',
                resetIcon: {
                    offsetX: -10,
                    offsetY: 0,
                    fillColor: '#fff',
                    strokeColor: '#37474F'
                }
            },
            scrollbar: {
                enabled: true,
                type: 'y',
            }
        },
        series: [
            {
                data: graphData_temperature,
                name: 'Water temperature'
            },
            {
                data: graphData_ph,
                name: 'pH meter'
            }
        ],
        yaxis: [
        {
            max: 35
        }
        ],
        xaxis:
            {
                type: 'datetime',
                tickAmount: 6,
            },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            },
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    };

</script>

<div use:chart={optionsChart} />