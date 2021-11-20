<script>
    import Navbar from '../components/Navbar.svelte';
    import { push } from 'svelte-spa-router';

    let message = null;
    let email;
    let passwd;
    let name;
    let confpasswd;
    let disable = true;
    let success = false;

    const parseJSON = (resp) => (resp.json ? resp.json() : resp);

    const checkStatus = (resp) => {
        // console.log('this :'+resp.json());
        if (resp.status >= 200 && resp.status < 300) {
            message = "account succesfully created"
            success = true
            return resp;
        }
        return parseJSON(resp).then((resp) => {
            throw resp;
        });
    };

    const tryRegist = async () => {
        if (name === '' || name == null) {
            message = 'Sorry, the name can\'t be empty.'
        }else if(passwd !== confpasswd){
            message = 'Password not match.'
        }else{
            try {
                await fetch('https://ghorilard.herokuapp.com/register/', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "nama_user": name,
                        "password": passwd,
                        "email_user": email
                    })
                })
                .then(checkStatus)
            } catch (e) {
                message = e.message
            }
        }
    }
</script>

<Navbar />

<div class="bd-container">
    <div class="bd-box box-white">
        <div class="bd-box-title">Sign Up</div>
        <p>Already have an account ? <a href="/#/Login"> Login here. </a></p>
        {#if message != null}
            <p style="margin-top: 1rem; color: #ee5e5e;" class:text-green={success}>{message}</p>
        {/if}
        <form class="mt-2" on:submit|preventDefault={tryRegist}>
            <div class="input-group">
                <label for="email"><i class="ri-user-3-line"></i></label>
                <input type="text" id="name" placeholder="name" bind:value={name}/>
            </div>
            <div class="input-group">
                <label for="email"><i class="ri-mail-line"></i></label>
                <input type="text" id="email" placeholder="email" bind:value={email}/>
            </div>
            <div class="input-group">
                <label for="passwd"><i class="ri-lock-line"></i></label>
                <input type="password" id="passwd" placeholder="password" bind:value={passwd}/>
            </div>
            <div class="input-group">
                <label for="confpasswd"><i class="ri-lock-line"></i></label>
                <input type="password" id="confpasswd" placeholder="confirm password" bind:value={confpasswd}/>
            </div>
            <button type="submit" class="ml-2 btn btn-yellow" >Sign Up</button>
        </form>
    </div>
</div>

<style lang="scss">
    @import '../sass/Signpage.scss';

    .text-green {
        color: rgb(41, 241, 74);
    }
</style>