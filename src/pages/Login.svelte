<script>
    import { replace } from 'svelte-spa-router';
    import { Session, login } from 'svelte-session-manager';

    let session = new Session(localStorage);
    if(session.isValid){
        if (session.auth == "2") {
            replace('/Dasboard');
        }else if(session.auth == "1"){
            replace('/Toor');
        }
    }

    import Navbar from '../components/Navbar.svelte';
    import { derived } from 'svelte/store';
    
    let email;
    let passwd;
    let message = null;
    let error = null;
    let message1 = null;

    const sysLogin = async () => {
        
        if(!session.isValid) {
            let tryLog = await login(session, 'https://ghorilard.herokuapp.com/login', email, passwd);
            console.log("this: "+message);
            if (tryLog == 'Unauthorized') {
                message = 'Wrong Email or Password'
            }else if(tryLog === 'Bad Request'){
                message = 'Email not registered'
            }else{
                message = tryLog
            }
        }

        const values = derived(
        session,
        ($session, set) => {
            if (!session.isValid) {
            set([]);
            } else {
                try {
                    fetch('https://ghorilard.herokuapp.com/login', {
                        headers: {
                            'Content-Type' : 'application/json'
                        }
                    })
                    .then(async data => set(await data.json()))
                } catch (e) {
                    console.log(e)
                }
            }
            return () => {};
        }
        ,[]);
    };

    console.log(message)
</script>

<Navbar />

{#if !session.isValid}
<div class="bd-container">
    <div class="bd-box box-white">
        <div class="bd-box-title">Sign In</div>
        <p>Don't have an account ? <a href="/#/Register">Create here.</a></p>
        {#if message !== null && message != undefined}
            <p style="margin-top: 1rem; color: #ee5e5e;">{message}</p>
        {/if}
        {#if message1 !== null && message1 != undefined}
            <p style="margin-top: 1rem; color: #4db2ff;">{message1}</p>
        {/if}
        <form class="mt-2" on:submit|preventDefault={sysLogin}>
            <div class="input-group">
                <label for="email"><i class="ri-mail-line"></i></label>
                <input type="email" id="email" placeholder="email" bind:value={email} required>
            </div>
            <div class="input-group">
                <label for="passwd"><i class="ri-lock-line"></i></label>
                <input type="password" id="passwd" placeholder="password" bind:value={passwd} required >
            </div>
            <button aria-keyshortcuts="Enter" disabled={!email || !passwd} type="submit" class="ml-2 btn btn-blue">Sign In</button>
        </form>
    </div>
</div>

<style lang="scss">
    @import '../sass/Signpage.scss';
</style>
{:else}
    {#if session.auth == 2}
        {replace('/Dasboard')}
    {:else if session.auth == 1}
        {replace('/Toor')}
    {/if}
{/if}