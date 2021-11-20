<script>
    import { user, activeTabs } from '../data';
    import { Session } from 'svelte-session-manager';

    let session = new Session(localStorage);

    const changeTabs = (e) => {
        $activeTabs = e;
    }
</script>

<div class="row">

<div class="col-md-8 col-lg-8 col-xl-9">

    <div class="row">
        <div class="col col-sm col-md-5 col-lg-4" style="padding:5px;">
            <div class="bcard">
                <div class="bcard-icon bg-light-blue" >
                    <i class="ri-user-3-line"></i>
                </div>
                <div class="bcard-content">
                    {$user.nama_user}
                </div>
            </div>
        </div>
        <div class="col col-sm col-md-5 col-lg-4" style="padding:5px;">
            <div class="bcard">
                <div class="bcard-icon bg-green">
                    <i class="ri-base-station-line"></i>
                </div>
                <div class="bcard-content">
                    {$user.length} Devices
                </div>
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
    @import '../../sass/Dasboard.scss';
</style>