<script>
    import { monitoring_data, activeTabs, nama_kolam, graphautodata } from './data';
    import { Session } from 'svelte-session-manager';
    import { push } from 'svelte-spa-router';
    import Autograph from '../components/Autograph.svelte';

    let session = new Session(localStorage);
    let week_data = [];
    let average_data;
    let graph_week_ph = [];
    let graph_week_temp = [];
    let morning_data = [];
    let miday_data = [];

    if (!session.isValid) {
        push('/Login');
    }

    const changeTabs = (e) => {
        $activeTabs = e;
    }
    $nama_kolam = 'Rap1';

    function sys_analyst() {
        var data = $monitoring_data;
        if (data != null) {
            data.forEach(element => {
                var interval_date = 10;
                var eldate = new Date(element.timestamp);
                var week_date = new Date().setDate(new Date().getDate() - interval_date);

                if (eldate.getTime() > week_date) {
                    week_data.push(element);
                    graph_week_ph.push([eldate.getTime(),element.ph_meter]);
                    graph_week_temp.push([eldate.getTime(),element.water_temp]);
                    if (eldate.getHours() >= 13 && eldate.getHours() < 23) {
                        morning_data = [...morning_data,element];
                    }
                }
            });

            $graphautodata = week_data;

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
            
            var x_average_temp = 0;
            var x_average_ph = 0;
            morning_data.forEach(element => {
                x_average_temp = x_average_temp + element.water_temp;
                x_average_ph = x_average_ph + element.ph_meter;
            });


            x_average_ph = (x_average_ph / morning_data.length).toFixed(2);
            x_average_temp = (x_average_temp / morning_data.length).toFixed(2);
            
            average_data = {
                'average_temperature' :  average_temp,
                'average_ph' : average_ph,
                'mor_average_temp' : x_average_temp,
                'mor_average_ph': x_average_ph,
                'midday_average_temp': NaN,
                'midday_average_ph': NaN,
            };
        }
    }
    
</script>

{#await sys_analyst()}
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
                <div class="col">
                    <Autograph />
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding:5px;">
                <div class="card">
                    <div class="row data" style="border-bottom: solid 1px #EBEBEB;">
                        <div class="col-8 col-sm-6" style="padding-left: 1rem; display:flex; align-items:center;">
                            Average / 7 days
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
</style>
{/await}