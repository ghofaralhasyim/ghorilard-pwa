<script>
    import { monitoring_data, activeTabs, nama_kolam } from './data';
    import { Session } from 'svelte-session-manager';
    import { push } from 'svelte-spa-router';

    let session = new Session(localStorage);
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
                var interval_date = 7;
                var date = new Date();
                var eldate = new Date(element.timestamp);
                var week_date = new Date(date.getDate(date.getDate() - interval_date)).getDate();
                console.log("WEEEEEEEEK :" +week_date);
            });
        }
    }
</script>

{#await sys_analyst()}
    Loading ...
{:then}
<div class="row">

<div class="col-md-8 col-lg-8 col-xl-9">

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
        <div class="col-sm-12 col-md-12 col-lg-8 col-xl-12" style="padding:5px;">
            <div class="card" style="padding-left: 1rem;">
                <h3>Devices {$nama_kolam}</h3>

                <p style="margin-bottom: 1em;">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quibusdam sint ipsam delectus corporis beatae eos perferendis ut odio enim!
                </p>
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
{/await}