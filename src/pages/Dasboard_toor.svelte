<script>
import { onMount } from 'svelte';

    import { Session } from 'svelte-session-manager';
    import { push, replace } from 'svelte-spa-router';

    let session = new Session(localStorage);

    onMount(() => {
        if(!session.isValid){
            push('/Login');
        }
    })

    import {activeTabs} from '../Dasboard-comp/data';
    import Main_toor from '../Dasboard-comp/toor/Main_toor.svelte';

    let sidebarToggled = false;
    $activeTabs = 'Dasboard';

    const changeTabs = (e) => {
        $activeTabs = e;
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
                <div class="sideNav__link {$activeTabs === 'Dasboard' ? 'sidebarActive' : ''}" on:click={() => changeTabs('Dasboard')}>
                    <div class="sideNav__icon"><i class="ri-dashboard-3-line"></i><span> Dasboard</span></div>
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
                {#if $activeTabs === 'Dasboard'}
                    <Main_toor />
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