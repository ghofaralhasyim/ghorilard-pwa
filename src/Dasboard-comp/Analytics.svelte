<script>
    import { monitoring_data, activeTabs, nama_kolam } from './data';
    import { Session } from 'svelte-session-manager';
    import { push } from 'svelte-spa-router';

    import { chart } from "svelte-apexcharts"

    let session = new Session(localStorage);
    let week_data = [];
    let average_data;
    let graph_week_ph = [];
    let graph_week_temp = [];
    let morning_data = [];
    let miday_data = [];
    let interval_date = 20;
    let optionsChart;
    let graphautodata = [];

    if (!session.isValid) {
        push('/Login');
    }

    const changeTabs = (e) => {
        $activeTabs = e;
    }
    $nama_kolam = 'Rap1';

    function sys_analyst(int_date) {
        console.log(interval_date);
        week_data = []; morning_data = []; miday_data = []; average_data = null;
        var data = $monitoring_data;
        if (data != null) {
            data.forEach(element => {
                var eldate = new Date(element.timestamp);
                var week_date = new Date().setDate(new Date().getDate() - int_date);
                console.log("hours " +eldate.getHours());
                if (eldate.getTime() > week_date) {
                    week_data.push(element);
                    graph_week_ph.push([eldate.getTime(),element.ph_meter]);
                    graph_week_temp.push([eldate.getTime(),element.water_temp]);
                    if (eldate.getHours() >= 0 && eldate.getHours() < 10 ) {
                        morning_data = [...morning_data,element];
                    }
                    if (eldate.getHours() > 10 && eldate.getHours() < 23) {
                        miday_data = [...miday_data,element];
                    }
                }
            });

            graphautodata = week_data;
            let graphData_ph = [];
            let graphData_temperature = [];
            week_data.forEach(element => {
                var eldate = new Date(element.timestamp);
                console.log("hours 1 " +eldate.getHours());
                graphData_temperature = [...graphData_temperature,[eldate.getTime(),element.water_temp]];
                graphData_ph = [...graphData_ph,[eldate.getTime(),element.ph_meter]];
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
                    max: 35,
                    
                }
                ],
                xaxis:
                    {
                        type: 'datetime',
                        tickAmount: 6,
                        labels: {
                            datetimeUTC: false
                        },
                    },
                tooltip: {
                    x: {
                        format: 'dd MMM yyyy HH : mm'
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

            //overall
            var data_length = 0;
            var average_temp = 0;
            var average_ph = 0;
            week_data.forEach(element => {
                average_ph = average_ph + element.ph_meter;
                average_temp = average_temp + element.water_temp;
                data_length++;
            })
             
            average_temp = average_temp / data_length;
            average_temp = average_temp.toFixed(2);
            average_ph = average_ph / data_length;
            average_ph = average_ph.toFixed(2);
            
            //morning
            var x_average_temp = 0;
            var x_average_ph = 0;
            morning_data.forEach(element => {
                x_average_temp = x_average_temp + element.water_temp;
                x_average_ph = x_average_ph + element.ph_meter;
            });

            //miday
            var y_average_temp = 0;
            var y_average_ph = 0;
            miday_data.forEach(element => {
                y_average_temp = y_average_temp + element.water_temp;
                y_average_ph = y_average_ph + element.ph_meter;
            })

            x_average_ph = (x_average_ph / morning_data.length).toFixed(2);
            x_average_temp = (x_average_temp / morning_data.length).toFixed(2);
            y_average_temp = (y_average_temp / miday_data.length).toFixed(2);
            y_average_ph = (y_average_ph / miday_data.length).toFixed(2);
            
            average_data = {
                'average_temperature' :  average_temp,
                'average_ph' : average_ph,
                'mor_average_temp' : x_average_temp,
                'mor_average_ph': x_average_ph,
                'midday_average_temp': y_average_temp,
                'midday_average_ph': y_average_temp,
            };
            console.log(graphautodata);
        }
    }

    
    
    console.log(interval_date);
</script>

{#await sys_analyst(interval_date)}
    Loading ...
{:then}
<div class="row">

<div class="col-md-12 col-lg-8 col-xl-9">

    <div class="row">
        <div class="col " style="padding:5px;">
            <div class="bcard">
                <div class="bcard-icon bg-light-blue" >
                    <i class="ri-flask-line"></i>
                </div>
                <div class="bcard-content">
                    Analytics 
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding:5px;">
            <div class="card" style="padding-left: 1rem;">
                <h3>Devices {$nama_kolam}</h3>
                <div class="row">
                    <div class="col-4">
                        <input type="number" class="input" placeholder="{interval_date}" bind:value={interval_date} />
                    </div>
                    <div class="col-2" style="align-items: center; display:flex;">
                        &nbsp; days
                    </div>
                </div>
                <div class="col-12">
                    <div use:chart={optionsChart} />
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding:5px;">
                <div class="card">
                    <div class="row data" style="border-bottom: solid 1px #EBEBEB;">
                        <div class="col-8 col-sm-6" style="padding-left: 1rem; display:flex; align-items:center;">
                            Average / {interval_date} days
                        </div>
                        <div class="col-2 col-sm-3 text-center" style="display: flex;">
                            Temperature
                        </div>
                        <div class="col-2 col-sm-3 text-center" style="display: flex;">
                            pH
                        </div>
                    </div>
                    <div class="row data" style="background-color:#f5f5f5;">
                        <div class="col-8 col-sm-6" style="padding-left: 1rem;">
                            Overall
                        </div>
                        <div class="col-2 col-sm-3 text-center" style="display: flex;">
                            {average_data.average_temperature}&#176;C
                        </div>
                        <div class="col-2 col-sm-3 text-center" style="display: flex;">
                            {average_data.average_ph}
                        </div>
                    </div>
                    <div class="row data">
                        <div class="col-8 col-sm-6" style="padding-left: 1rem;">
                            Morning 07.00 - 10.00
                        </div>
                        <div class="col-2 col-sm-3 text-center" style="display: flex;">
                            {average_data.mor_average_temp}&#176;C
                        </div>
                        <div class="col-2 col-sm-3 text-center" style="display: flex;">
                            {average_data.mor_average_ph}
                        </div>
                    </div>
                    <div class="row data" style="background-color:#f5f5f5;">
                        <div class="col-8 col-sm-6" style="padding-left: 1rem;">
                            Noon 10.00 - 16.00
                        </div>
                        <div class="col-2 col-sm-3 text-center" style="display: flex;">
                            {average_data.midday_average_temp}&#176;C
                        </div>
                        <div class="col-2 col-sm-3 text-center" style="display: flex;">
                            {average_data.midday_average_ph}
                        </div>
                    </div>
                </div>
        </div>
    </div>

</div>

<div class="col col-md-12 col-lg-4 col-xl-3" style="padding:5px;">
    <div class="hover-light-blue cursor-pointer" on:click={() => changeTabs('Helpdesk')}>
        <div class="row card bg-light-blue pd-1 ">
             <div class="col-2 text-middle text-center">
                     <i class="ri-customer-service-2-fill" style="font-size: 1.25rem;"></i>
             </div>
             <div class="col" style="padding-left: 10px;">
                     Any problem with your device? <br>
                     <span style="font-size: .75rem;">Tell us!</span>
             </div>
         </div>
     </div>
 </div>


</div> <!-- END 1st ROW CLASS -->

<style lang="scss">
    @import '../sass/Dasboard.scss';
    .data {
        word-break: break-all;
        padding:10px;
    }

    .input {
        width: 100%;
        padding: 10px;
    }
</style>
{/await}