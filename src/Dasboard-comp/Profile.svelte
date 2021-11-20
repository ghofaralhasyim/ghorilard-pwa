<script>
    import { user, activeTabs } from './data';
    import { Session } from 'svelte-session-manager';
    import { push } from 'svelte-spa-router';

    let session = new Session(localStorage);
    if (!session.isValid) {
        push('/Login');
    }

    const changeTabs = (e) => {
        $activeTabs = e;
    }
</script>

<div class="row">

<div class="col-md-8 col-lg-8 col-xl-9">

    <div class="row">
        <div class="col " style="padding:5px;">
            <div class="bcard">
                <div class="bcard-icon bg-light-blue" >
                    <i class="ri-user-3-line"></i>
                </div>
                <div class="bcard-content">
                    Profile 
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-8 col-xl-12" style="padding:5px;">
            <div class="card pd-1" style="padding-left: 1rem;">
                <div class="col">
                   <table style="border-spacing: 15px;">
                       <tr>
                           <td>Name</td>
                           <td>:</td>
                           <td>{$user.nama_user}</td>
                       </tr>
                       <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>{$user.email_user}</td>
                        </tr>
                   </table>
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
    @import '../sass/Dasboard.scss';
</style>