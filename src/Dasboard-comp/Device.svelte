<script>
    import { id_device, nama_kolam, activeTabs, monitoring_data } from './data';
    import { Session } from 'svelte-session-manager';
    import { push } from 'svelte-spa-router';
    import { chart } from "svelte-apexcharts";

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
    let liveable = true;
    let lastUpdateData = [];
    let guide = [];
    let graph_date = [];

    let lastTime;
    let lastUpdateTime;

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
                        "kode_device": $id_device
                    },
                }).then(checkStatus)
                .then(parseJSON);
                data = res;
            } catch (e) {
                message = e
            }

            temp = data.data_hist;
            $monitoring_data = data.data_hist;

            if (data == 'No Data for Graphic' || temp == null) {
                message = data;
            }else{
                let i = 0;
                temp.forEach(element => {
                    var date = new Date();
                    var eldate = new Date(element.timestamp);
                    var ndate = date.getDate();
                    var nmonth = date.getMonth();
                    var nyear = date.getFullYear();
                    console.log("Hours : "+eldate.getHours());
                    graphData_temperature= [...graphData_temperature,[eldate.getTime(),element.water_temp]];
                    console.log("hours temp: " + new Date(graphData_temperature[i][0]));
                    graphData_ph = [...graphData_ph,[new Date(eldate.getTime()),element.ph_meter]];
                    lastUpdateTime = new Date(element.timestamp);
                    lastUpdateData = {"ph_meter":element.ph_meter,"temperature":element.water_temp};
                    graph_date = [...graph_date,element.timestamp];

                    if (ndate == eldate.getDate() && nmonth == eldate.getMonth() && nyear == eldate.getFullYear()) {
                        graphLiveData_temperature.push([eldate.getTime(),element.water_temp]);
                        graphLiveData_ph.push([eldate.getTime(),element.ph_meter]);   
                    }

                    if (i == 0) {
                        firstDate = eldate.getTime();
                    }
                    i++;
                });

                lastTime = '';
                lastUpdateTime.getHours() < 10 ? lastTime += "0"+lastUpdateTime.getHours(): lastTime += lastUpdateTime.getHours() + ":";
                lastUpdateTime.getMinutes() < 10? lastTime += "0"+lastUpdateTime.getMinutes(): lastTime += lastUpdateTime.getMinutes();
      
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
                            type: 'x',
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
                            labels: {
                                datetimeUTC: false
                            }
                        },
                    tooltip: {
                        x: {
                            format: 'dd MMM yyyy HH:mm'
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
            }  
        }
    }

    let activeFilter = 'Alldata';
    const changeFilter = (e) => {
        activeFilter = e;
    }

    const liveData = () => {
        if (graphLiveData_ph.length < 1) {
            liveable = false;
        }
        optionsChart1 = {
            chart: {
                zoom: {
                    autoScaleXaxis: true
                }
            },
            series: [
                {
                    data: graphLiveData_temperature,
                },
                {
                    data: graphLiveData_ph,
                }
            ],
            xaxis:
            {
                type: 'datetime',
                tickAmount: 6,
                labels: {
                    format: 'HH:mm'
                }
            },
            tooltip: {
                x: {
                    format: 'dd-MM-yyyy HH:mm'
                },
            },
        }
    }

    const allData = () => {
        liveable = true;
        optionsChart1 = {
            series: [
                {
                    data: graphData_temperature,
                },
                {
                    data: graphData_ph,
                }
            ],
            xaxis:
                {
                    type: 'datetime',
                    tickAmount: 6,
                    min: firstDate,
            },
        }
        console.log(firstDate);
    }

    const deviceRedirect = (tabs,kode_device,nama) => {
        $activeTabs = tabs;
        $id_device = kode_device;
        $nama_kolam = nama;
    }

    async function sys_guide() {
        guide = [];
        console.log("last ph "+graphData_ph);
        if (graphLiveData_ph.length != 0) { //if data today not found analytics cant be showed
            var x = graphData_ph.length - 1;
            lastUpdateData = {"ph_meter":graphData_ph[x][1],"temperature":graphData_temperature[x][1]};
            if (lastUpdateData.ph_meter < 7.5) {
                guide = [...guide,"pH air yang ideal berkisar 7.5 - 8.5 Tambahkan kapur seperti CaCo3, COH , atau CaMg untuk menaikan kadar pH air."];
            }else if(lastUpdateData.ph_meter > 8.5){
                guide = [...guide,"pH air yang ideal berkisar 7.5 - 8.5 Lakukan penambahan air atau beri saponin (tea sea mile) dosis 5-10 pada air untuk menurunkan kadar pH."];
            }
        }
        if(graphLiveData_temperature != 0) {
            if (lastUpdateData.temperature < 28) {
                guide = [...guide,"Suhu air terlalu rendah dapat mengganggu metabolisme udang. Turunkan level air, tambah pengoperasian kincir,atau aplikasi Ca(OH)2, dan kurangi pemberian pakan."];
            }else if(lastUpdateData.ph_meter > 30){
                guide = [...guide,"Suhu air terlalu tinggi metabolisme meningkat sehingga beban insang dan proses ekskresi meningkat. Tinggikan level air, kurangi operasional kincir. Jika hujan potong pemberian pakan"];
            }
        }
        console.log("last guide " + guide);
    }

    console.log("hours cek : "+ graphData_ph);
</script>

{#await getData()}
Loading ...
{:then}
<div class="row">

<div class="col-md-12 col-lg-8 col-xl-9">

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
                    Today
                </button>
                    <div use:chart={optionsChart1} class:d-none={!liveable}/>
                    <p class="mt-1 mb-1 bg-yellow-light color-dark-yellow" class:d-none={liveable} style="border-radius: 5px; padding:15px;">
                        Sorry, i can't find any data today. Try to run your device.
                    </p>
                {/if}
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-12 col-xl-12" style="padding:5px;">
            <div class="card">
                {#await sys_guide()}
                    Loading Guide Analytics...
                {:then}
                {#if graphLiveData_temperature.length == 0}
                    <div class="row data" style="border-bottom: solid 1px #EBEBEB;">
                        <div class="col-6 col-sm-7" style="padding-right:5px; overflow-wrap: break-word; padding-left: 1rem; display:flex; align-items:center;">
                            Last update {lastUpdateTime.getDate() + "-" + (lastUpdateTime.getMonth()+1) + "-" + lastUpdateTime.getFullYear()}
                        </div>
                        <div class="col-3 col-sm-3 text-center" style="display: flex;">
                            Temperature
                        </div>
                        <div class="col-3 col-sm-2 text-center" style="display: flex;">
                            pH
                        </div>
                    </div>
                    <div class="row data" style="background-color:#f5f5f5;">
                        <div class="col-6 col-sm-7" style="padding-left: 1rem;">
                           {lastTime}
                        </div>
                        <div class="col-3 col-sm-3 text-center" style="display: flex;">
                            {lastUpdateData.temperature}&#176;C
                        </div>
                        <div class="col-3 col-sm-2 text-center" style="display: flex;">
                            {lastUpdateData.ph_meter}
                        </div>
                    </div>
                {:else}
                <div class="row data" style="border-bottom: solid 1px #EBEBEB;">
                    <div class="col-6 col-sm-7" style="padding-right:5px; overflow-wrap: break-word; padding-left: 1rem; display:flex; align-items:center;">
                        Last update {lastUpdateTime.getDate() + "-" + (lastUpdateTime.getMonth()+1) + "-" + lastUpdateTime.getFullYear()}
                    </div>
                    <div class="col-3 col-sm-3 text-center" style="display: flex;">
                        Temperature
                    </div>
                    <div class="col-3 col-sm-2 text-center" style="display: flex;">
                        pH
                    </div>
                </div>
                <div class="row data" style="background-color:#f5f5f5;">
                    <div class="col-6 col-sm-7" style="padding-left: 1rem;">
                        {lastTime}
                    </div>
                    <div class="col-3 col-sm-3 text-center" style="display: flex;">
                        {lastUpdateData.temperature}&#176;C
                    </div>
                    <div class="col-3 col-sm-2 text-center" style="display: flex;">
                        {lastUpdateData.ph_meter}
                    </div>
                </div>
                {/if}
                {/await}
            </div>
        </div>
    </div>

    {#if guide != '' && guide != null}
    <div class="row">
        <div class="col-sm-12 col-md-12 col-xl-12" style="padding:5px;">
            <div class="card">
                <div class="guide">
                    <h3>Auto Guides</h3>
                    {#each guide as guide}
                    <div class="row">
                        <div class="color-light-yellow" style="display:flex; padding-right:10px; width:fit-content; font-size:1.5rem;">
                            <i class="ri-error-warning-line"></i>
                        </div>
                        <div class="col">
                            {guide}
                        </div>
                    </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    {/if}

</div>

<div class="col col-md-12 col-lg-4 col-xl-3" style="padding:5px;">
    <div class="cursor-pointer" on:click={() => deviceRedirect('Analytics',$id_device,$nama_kolam)} style="margin-bottom: 10px;" >
        <div class="row card pd-1">
             <div class="col-2 text-middle text-center">
                     <i class="ri-flask-line" style="font-size: 1.25rem;"></i>
             </div>
             <div class="col" style="padding-left: 10px;">
                     Analytics<br>
             </div>
         </div>
    </div>
    <div class="hover-light-blue cursor-pointer" on:click={() => changeTabs('Helpdesk')}>
        <div class="row card bg-light-blue pd-1 ">
             <div class="col-2 text-middle text-center">
                     <i class="ri-customer-service-2-fill" style="font-size: 1.25rem;"></i>
             </div>
             <div class="col" style="padding-left: 10px;">
                     &#9;Any problem with your device? <br>
                     <span style="font-size: .75rem;">Tell us!</span>
             </div>
         </div>
     </div>
 </div>


</div> <!-- END 1st ROW CLASS -->

<style lang="scss">
    @import '../sass/Dasboard.scss';

    .data {
        padding:10px;
    }

    .guide {
        padding-left: 20px;
        padding-right: 20px;
        text-align: justify;
        margin-bottom: 1rem;
        h3 {
            margin-bottom: 15px;
        }
    }
</style>
{:catch error}
    <p>{error}</p>
{/await}