<script>
    import { onMount } from 'svelte';

    import { Session } from 'svelte-session-manager';
    import { push, replace } from 'svelte-spa-router';
    import { t_activeTabs } from '../Dasboard-comp/toor/Toor_data';

    let session = new Session(localStorage);

    onMount(() => {
        if(!session.isValid){
            push('/Login');
        }
        if (session.auth == 2) {
            replace('/Dasboard');
        }
    })

    import Main_toor from '../Dasboard-comp/toor/Main_toor.svelte';
    import Toor_helpdesk from '../Dasboard-comp/toor/Toor_helpdesk.svelte';
    import Toor_directmessage from '../Dasboard-comp/toor/Toor_directmessage.svelte';

    let sidebarToggled = false;
    $t_activeTabs = 'Helpdesk';

    const changeTabs = (e) => {
        $t_activeTabs = e;
    }
    async function sysLogout(){
        session.invalidate()
    }
</script>
{#if session.isValid}
<div class="bd-grid">
    <div class="sidebar" id="sidebar">
        <div class="sideNav">
            <div class="sideNav__brand">
                <img class="sideNav__brand--icon" src="./images/aceslabs1.png" alt="aceslab">
                <div class="sideNav__brand--text"> ACES Labs</div>
            </div>
            
            <div class="sideNav__menu">
                <div class="sideNav__link {$t_activeTabs === 'Dasboard' ? 'sidebarActive' : ''}" on:click={() => changeTabs('Dasboard')}>
                    <div class="sideNav__icon"><i class="ri-dashboard-3-line"></i><span> Dasboard</span></div>
                </div>
                <div class="sideNav__link {$t_activeTabs === 'Helpdesk' ? 'sidebarActive' : ''}" on:click={() => changeTabs('Helpdesk')}>
                    <div class="sideNav__icon"><i class="ri-customer-service-2-fill"></i><span> Helpdesk </span></div>
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
                {#if $t_activeTabs === 'Dasboard'}
                    <Main_toor />
                {:else if $t_activeTabs === 'Helpdesk'}
                    <Toor_helpdesk />
                {:else if $t_activeTabs === 'chat'}
                    <Toor_directmessage />
                {:else}
                    :NotFound:
                {/if}
        </div>
    </section>
</div>

<style lang="scss">
    @import '../sass/Dasboard.scss';
</style>
{:else}
    {push('/login')};
{/if}