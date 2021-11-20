<script>
    import { t_activeTabs, t_chatDirect } from './Toor_data';
    import { Session } from 'svelte-session-manager';

    let session = new Session(localStorage);

    const changeTabs = (e) => {
        $t_activeTabs = e;
    }
    const chatDirect = (e) => {
        $t_chatDirect = e;
    }
</script>

<div class="row">

<div class="col-md-8 col-lg-8 col-xl-9">

    <div class="row">
        <div class="col col-sm col-md-5 col-lg-4" style="padding:5px;">
            <div class="bcard">
                <div class="bcard-icon bg-light-blue" >
                    <i class="ri-customer-service-2-fill" ></i>
                </div>
                <div class="bcard-content">
                    Helpdesk Service
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 " style="padding:5px;">
            <div class="card row">
                <h3>Users chat</h3>
                <div class="row bg-grey cursor-pointer" style="margin-bottom: 0.5rem;" 
                on:click={() => chatDirect('alvin')}
                on:click={() => changeTabs('chat')}>
                    <div class="bcard">
                        <div class="bcard-icon bg-green">
                            <i class="ri-user-line"></i>
                        </div>
                        <div class="bcard-content bg-grey">
                            Richard Alvin
                        </div>
                    </div>
                </div>
                <div class="row bg-grey cursor-pointer" style="margin-bottom: 0.5rem;" on:click={() => chatDirect('ecang')}>
                    <div class="bcard">
                        <div class="bcard-icon bg-green">
                            <i class="ri-user-line"></i>
                        </div>
                        <div class="bcard-content bg-grey">
                            Ecang
                        </div>
                    </div>
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