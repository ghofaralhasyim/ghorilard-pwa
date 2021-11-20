<script>
    import { Session } from 'svelte-session-manager';
    import { push, replace } from 'svelte-spa-router';

    let session = new Session(localStorage);
    if (!session.isValid) {
        push('/Login');
    }

    import Main from '../Dasboard-comp/Main.svelte';
    import Profile from '../Dasboard-comp/Profile.svelte';
    import Helpdesk from '../Dasboard-comp/Helpdesk.svelte';
    import AddDevice from '../Dasboard-comp/AddDevice.svelte';;
    import Device from '../Dasboard-comp/Device.svelte';
    import Test from '../Dasboard-comp/Test.svelte';
    import Analytics from '../Dasboard-comp/Analytics.svelte';
    import { apiData, activeTabs, id_device } from '../Dasboard-comp/data';

    let sidebarToggled = false;
    $activeTabs = 'Helpdesk';
    $id_device = 'Rt45rgy';

    const changeTabs = (e) => {
        $activeTabs = e;
    }
    let error = null;

    async function getData() {
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
                const res = await fetch('https://ghorilard.herokuapp.com/user', {
                    method: "GET",
                    headers: {
                        'Content-Type' : 'application/json',
                        'token': session.access_token,
                        '_id': session._id
                    },
                }).then(checkStatus)
                .then(parseJSON)
                .then(data => {
                    apiData.set(data);
                })
            } catch (e) {
                error = e
            }
        }
    };

    async function sysLogout(){
        session.invalidate()
    }


    console.log(session)
</script>

{#if session.isValid}
    {#if session.auth == 1}
        {replace('/Toor')}
    {/if}
<div class="bd-grid">
    <div class="sidebar" id="sidebar">
        <div class="sideNav">
            <div class="sideNav__brand">
                <img class="sideNav__brand--icon" src="./images/aceslabs1.png" alt="aceslab">
                <div class="sideNav__brand--text"> ACES Labs</div>
            </div>
            
            <div class="sideNav__menu">
                <div class="sideNav__link {$activeTabs === 'Dasboard' ? 'sidebarActive' : ''}" on:click={() => changeTabs('Dasboard')}>
                    <div class="sideNav__icon"><i class="ri-dashboard-3-line"></i><span> Dasboard</span></div>
                </div>
                <div class="sideNav__link {$activeTabs === 'Profile' ? 'sidebarActive' : ''}" on:click={() => changeTabs('Profile')}>
                    <div class="sideNav__icon"><i class="ri-user-3-line"></i><span> Profile</span></div>
                </div>
                <div class="sideNav__link {$activeTabs === 'Helpdesk' ? 'sidebarActive' : ''}" on:click={() => changeTabs('Helpdesk')}>
                    <div class="sideNav__icon"><i class="ri-customer-service-2-fill"></i><span> Helpdesk</span></div>
                </div>
            </div>
        </div>
    </div>

    <section class="bd-dasboard" id="bd-dasboard" class:sidebarToggled={sidebarToggled}>
        <nav class="topNav">
            <div class="topNav__toggler">
                <i class="ri-function-line" id="nav-toggler" on:click="{() => sidebarToggled = !sidebarToggled}"></i>
            </div>

            <div class="topNav__menu">
                <ul class="topNav__list">
                    <li class="topNav__item"><a href="/#/login" class="topNav__link" on:click={sysLogout}>Logout</a></li>
                </ul>
            </div>
        </nav>

        <div class="content">
            {#await getData()}
            <p>Loading...</p>
                {:then}
                {#if $activeTabs === 'Dasboard'}
                    <Main />
                {:else if $activeTabs === 'Profile'}
                    <Profile />
                {:else if $activeTabs === 'Helpdesk'}
                    <Helpdesk />
                {:else if $activeTabs == 'AddDevice'}
                    <AddDevice />
                {:else if $activeTabs == 'Device'}
                    <Device />
                {:else if $activeTabs == 'Analytics'}
                    <Analytics />
                {:else if $activeTabs == 'test'}
                    <Test />
                {:else}
                    :NotFound:
                {/if}
            {/await}
        </div>
    </section>
</div>

<style lang="scss">
    @import '../sass/Dasboard.scss';
</style>
{:else}
    {push('/login')};
{/if}
