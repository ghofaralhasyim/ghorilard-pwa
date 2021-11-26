<script>
    let show = false;
    import {link} from 'svelte-spa-router'
    import active from 'svelte-spa-router/active';

</script>


<div class="header">
    <nav class="nav bd-grid">
        <div>
            <a href="#home" class="nav__brand"><img alt="aceslabs" src="/images/aceslablg.png"/></a>
        </div>
        <div class="nav__toggle" id="nav-toggler">
            <i class="ri-function-line" on:click="{() => show = !show}"></i>
        </div>
        <div class="nav__menu" id="nav-menu" class:show={show}>
            <div class="nav__close" id="nav-close">
                <i class="ri-close-line nav__close" id="nav-close" on:click="{() => show = !show}"></i>
            </div>

            <ul class="nav__list">
                <li class="nav__item"><a href="/Register" class="nav__link" use:link use:active={{path: '/Register', className: 'active'}}>Create Account</a></li>
                <li class="nav__item"><a href="/" class="nav__link" use:link use:active>Home</a></li>
                <li class="nav__item"><a href="/Login" class="nav__link" use:link use:active>Sign In</a></li>
            </ul>
        </div>
    </nav>
</div>

<style lang="scss">
    @import '../sass/Navbar.scss';
</style>