<script>
    import {onMount} from 'svelte'

    let show, navScroll = false;
    let transparent = true;
    let y;
    const scrollNavbar = 50;
    onMount(() => {
        window.onscroll = () => {
            if (window.scrollY > scrollNavbar) {
                navScroll = true;
                transparent = false;
            }else{
                navScroll = false;
                transparent = true;
            }
        }
    })
</script>

<svelte:window bind:scrollY={y}/>

<div class="header" class:bg-dark-navbar={navScroll} class:bg-transparent={transparent}>
    <!-- HEADER | NAVIGATION -->
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
                <li class="nav__item"><a href="/#/Register" class="nav__link">Create Account</a></li>
                <li class="nav__item"><a href="#about" class="nav__link">About us</a></li>
            </ul>
        </div>
    </nav>
</div>

<section class="home" id="home">
    <div class="home__container">
        <div class="home__text">
            <h1 class="home__title">More Than</h1>
            <h1 class="home__subtitle">As Assigment</h1>
            <p class="home__paragraph">We trying to be impactful as computer engineer.</p>
            <a href="/#/Login"><button class="home__button">Sign In</button></a>
        </div>
    </div>
</section>

<section class="architecture">
    <div class="architecture__container">
        <h1 class="architecture__title">General Architecture</h1>
        <img src="/images/General Architecture.jpg" alt="general-architecture"/>
    </div>
</section>

<section class="about" id="about">
    <div class="about__container">
        <h1 class="about__title">Amazing Four</h1>
        <div class="about__member">
            <span>Abdul Ghofar Alhasyim</span>
            <span>Larasati</span>
            <span>Richard Alvin Pratama</span>
            <span>Tezard Almafazan Mulia</span>
        </div>
    </div>
</section>

<footer class="footer">

</footer>

<style lang="scss">
    @import '../sass/Landing';
</style>