<script>
    import { Session } from 'svelte-session-manager';
    import { push } from 'svelte-spa-router';
    import { activeTabs } from './data';

    let session = new Session(localStorage);
    if (!session.isValid) {
        push('/Login');
    }

    const changeTabs = (e) => {
        $activeTabs = e;
    }
    
    let id_device;
    let name;
    let message = null;
    let message1 = null;

    async function sendData() {
        if (session.isValid) {
            if (id_device == null || id_device == '') {
                message = "ID Device can't be empty";
            }else if(name == null || name == ''){
                message = "Please enter a valid name";
            }else{
                const parseJSON = (resp) => (resp.json ? resp.json() : resp);
                const checkStatus = (resp) => {
                    if(resp.status >= 200 && resp.status < 300){
                        message1 = "Succes registering new device. Check it in dasboard.";
                        return resp;
                    }
                    return parseJSON(resp).then((resp) => {
                        throw resp;
                    });
                }
                try {
                    const res = await fetch('https://ghorilard.herokuapp.com/kolam/', {
                        method: "POST",
                        headers: {
                            'Content-Type' : 'application/json',
                            'token': session.access_token,
                            '_id': session._id
                        },
                        body: {
                            "nama_kolam" : name,
                            "kode_device" : id_device,
                            "id_user": session._id
                        }
                    }).then(checkStatus)
                    .then(parseJSON)
                } catch (e) { 
                    message = e 
                }
            }            
        }
    }

</script>
{#if session.isValid}
<div class="row">

<div class="col-md-8 col-lg-8 col-xl-9">

    <div class="row">
        <div class="col " style="padding:5px;">
            <div class="bcard">
                <div class="bcard-icon bg-yellow">
                    <i class="ri-remote-control-line"></i>
                </div>
                <div class="bcard-content">
                    Add Device 
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding:5px;">
            <div class="card pd-1">
                <div class="bg-yellow-light color-dark-yellow font-size-sm" style="padding: .5rem;border-radius: 5px;">Din't know what ID Device is? Check on device cover, there you can found the ID device.</div>
                {#if message !== null && message != undefined}
                    <p style="margin-top: 1rem; color: #9ddb7d;">{message}</p>
                {/if}
                {#if message1 !== null && message1 != undefined}
                    <p style="margin-top: 1rem; color: #8efa57;">{message1}</p>
                {/if}
                <form class="mt-2" on:submit|preventDefault={sendData}>
                    <div class="input-group">
                        <div class="row">
                            <label for="id_device">ID Device</label>
                        </div>
                        <div class="row">
                            <input type="text" id="id_device" placeholder="ID Device" bind:value={id_device} required>
                        </div>  
                    </div>
                    <div class="input-group">
                        <label for="name">Device Label</label>
                        <input type="text" id="name" placeholder="Device Label" bind:value={name} required>
                    </div>
                <button type="submit" disabled={!name || !id_device} aria-keyshortcuts="Enter" class="btn btn-yellow" style="border-radius: 5px;">Add Device</button>
                </form>
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
    @import '../sass/Form.scss';
</style>

{:else}
    {push('/login')};
{/if}
