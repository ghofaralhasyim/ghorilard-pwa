<script>
    import { user, activeTabs, deviceActive, nama_kolam } from './data';

    const changeTabs = (e) => {
        $activeTabs = e;
    }
    const deviceRedirect = (device,nama,tabs) => {
        $activeTabs = tabs;
        $deviceActive = device;
        $nama_kolam = nama;
    }
    let devices = $user.data_kolam;
    console.log(devices);
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
                    {devices.length} Devices
                </div>
            </div>
        </div>
        <div class="col col-sm col-md-5 col-lg-4" style="padding:5px;" on:click={() => changeTabs('AddDevice')}>
                <div class="bcard cursor-pointer">
                    <div class="bcard-icon bg-yellow">
                        <i class="ri-add-line"></i>
                    </div>
                    <div class="bcard-content">
                        Add Device
                    </div>
                </div>
        </div>
    </div>     
    <div class="row mt-1">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 " style="padding:5px;">
            <div class="card row" style="padding-left: 1rem;">
                <h3>Devices</h3>
                {#each devices as device}
                    <div class="row bg-grey cursor-pointer" style="margin-bottom: 0.5rem;" on:click={() => deviceRedirect(device.kode_device,device.nama_kolam,'Device')}>
                        <div class="bcard">
                            <div class="bcard-icon bg-green">
                                <i class="ri-base-station-line"></i>
                            </div>
                            <div class="bcard-content bg-grey">
                                {device.nama_kolam} {device.kode_device}
                            </div>
                        </div>
                    </div>
                {/each}
                {#if devices.length < 1}
                    <div class="bcard">
                        <div class="bcard-content bg-grey pd-1">
                            No device registered
                        </div>
                    </div>
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