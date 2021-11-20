<script>
    import { deviceActive, nama_kolam, activeTabs } from './data';
    import { Session } from 'svelte-session-manager';
    import { push } from 'svelte-spa-router';
    import { chart } from "svelte-apexcharts";
    import io from 'socket.io-client';

    let session = new Session(localStorage);
    if (!session.isValid) {
        push('/Login');
    }

    const changeTabs = (e) => {
        $activeTabs = e;
    }

    let data = [];
    let temp = [];
    let message = null;
    let graphData_temperature = [];
    let graphData_ph = [];
    let optionsChart1;
    let graphLiveData_temperature = [];
    let graphLiveData_ph = [];
    let firstDate;

    async function getData(){
        if(session.isValid){
            const parseJSON = (resp) => (resp.json ? resp.json() : resp);
            const checkStatus = (resp) => {
                if(resp.status >= 200 && resp.status < 300){
                    return resp;
                }
                return parseJSON(resp).then((resp) => {
                    throw resp;
                });
            }

            try {
                const res = await fetch('https://ghorilard.herokuapp.com/hist/',{
                    method: "GET",
                    headers: {
                        'Content-Type':'Application/json',
                        'token': session.access_token,
                        '_id': session._id,
                        "kode_device": $deviceActive
                    },
                }).then(checkStatus)
                .then(parseJSON);
                data = res;
            } catch (e) {
                message = e
            }

            temp = data.data_hist;

            if (data == 'No Data for Graphic' || temp == null) {
                message = data;
            }else{
                let i = 0;
                temp.forEach(element => {
                    let date = new Date(element.timestamp);
                    
                    graphData_temperature[i] = [date.getTime(),element.water_temp];
                    graphData_ph[i] = [date.getTime(),element.ph_meter];
    
                    graphLiveData_temperature.push([date.getTime(),element.water_temp]);
                    graphLiveData_ph.push([date.getTime(),element.ph_meter]);
                    i++;
                });

                optionsChart1 = {
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
                        }
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
            }  
        }
    }

    let activeFilter = 'Alldata';
    const changeFilter = (e) => {
        activeFilter = e;
    }

    let interval;
    const stopInterval = () => {
        clearInterval(interval);        
    }

    const liveInterval = () => {
        interval = setInterval(() => {
            optionsChart1 = {
                series: [
                    {
                        data: graphLiveData_temperature,
                    },
                    {
                        data: graphLiveData_ph,
                    }
                ],
                xaxis : {
                    min: new Date().getTime(),
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }

    const liveData = () => {
        const socket = io("https://ghorilard.herokuapp.com/");
        socket.on('tests', data => {
            console.log("this :"+data);
        });
        socket.emit('text','hallo');
        liveInterval();
    }

    const allData = () => {
        stopInterval();
        optionsChart1 = {
            series: [
                {
                    data: graphData_temperature,
                },
                {
                    data: graphLiveData_ph,
                }
            ],
            xaxis:
                {
                    type: 'datetime',
                    tickAmount: 6,
                    min: firstDate,
                },
        }
    }

    console.log(data)
</script>

{#await getData()}
Loading ...
{:then}
<div class="row">

<div class="col-md-8 col-lg-8 col-xl-9">

    <div class="row">
        <div class="col " style="padding:5px;">
            <div class="bcard">
                <div class="bcard-icon bg-light-blue" >
                    <i class="ri-sensor-fill color-white" style="padding-left: 5px;"></i>
                </div>
                <div class="bcard-content">
                    Device {$nama_kolam}
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding:5px;">
            <div class="card" >
                {#if message != null}
                    <p class="mt-1 mb-1 bg-yellow-light color-dark-yellow" style="border-radius: 5px; padding:15px;">
                        Sorry, i can't find any data. Try to run your device.
                    </p>
                {:else}
                <button class="btn btn-blue-light {activeFilter === 'Alldata' ? 'btn-blue-light-active':''}" 
                on:click={() => changeFilter('Alldata')}
                on:click={() => allData()}>All Data</button>
                <button class="btn btn-blue-light {activeFilter === 'live' ? 'btn-blue-light-active':''}" 
                on:click={() => changeFilter('live')}
                on:click={() => liveData()}>
                    Live today
                </button>
                <div use:chart={optionsChart1}/>
                {/if}
            </div>
        </div>
    </div>

</div>

<div class="col col-lg-4 col-xl-3" style="padding:5px;">
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
</style>
{:catch error}
    <p>{error}</p>
{/await}