<script>
    import io from 'socket.io-client';
    import { onMount } from 'svelte';

    let value='',
        name = 'textarea',
        textarea = null,
        height = 100;

    function grow(e) {
		textarea = e.target
		height = e.target.CR.height
	}
	
	$: rows = (value.match(/\n/g) || []).length + 1 || 1;

    onMount(() => {
        let chatSection = document.getElementById('chatSection');
        let x = chatSection.scrollHeight;
        chatSection.scrollTop = x;
    });
</script>

<div class="row">
    <div class="col-md-8 col-lg-8 col-xl-8">

        <div class="row">
            <div class="col " style="padding:5px;">
                <div class="bcard">
                    <div class="bcard-icon bg-light-blue">
                        <i class="ri-customer-service-2-fill" style="font-size: 1.25rem;"></i>
                    </div>
                    <div class="bcard-content">
                        Richard Alvin 
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col" style="padding:5px;">
                <div class="card">
                    <div class="chat-section" id="chatSection">
                        <div class="chat-section-chat-send">
                            <div class="chat-info">
                                14 Nov 2020
                            </div>
                            <div class="buble-send">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, perferendis! Eum eos tenetur voluptatem! Facere fugit eum aliquam laboriosam aut!
                            </div>
                        </div>
                        <div class="chat-section-chat-reply">
                            <div class="chat-info">
                                14 Nov 2020 : ghorilard admin
                            </div>
                            <div class="buble">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, at.
                            </div>
                        </div>
                        <div class="chat-section-chat-reply">
                            <div class="buble">
                                ..................................................swwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
                            </div>
                        </div>
                        <div class="chat-section-chat-send">
                            <div class="buble-send">
                                Oh!
                            </div>
                        </div>
                        <div class="chat-section-chat-send">
                            <div class="buble-send">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est fuga neque nemo similique soluta veniam facilis perspiciatis tempore commodi exercitationem maxime possimus blanditiis, nobis repudiandae alias perferendis mollitia iure aperiam in natus, provident, distinctio adipisci. Magni quaerat ipsa fuga minus natus veritatis, itaque maiores aut quidem autem esse dolorem. Iusto quaerat quas cupiditate nemo nobis eum magnam repellendus eaque, a error doloribus, et placeat amet vero nulla tempore blanditiis, at modi reiciendis praesentium est dolorum quae! Quae quibusdam harum quod quo mollitia dolorum asperiores distinctio voluptatum veniam autem, neque alias pariatur aliquid fuga corporis placeat id! Error tenetur consequatur est?
                            </div>
                        </div>
                        <div class="chat-section-chat-send">
                            <div class="buble-send">
                                {value}
                            </div>
                        </div>
                        <div id="xchat"></div>
                    </div>
                    <form  class="form-chat mt-1">
                        <textarea rows="{rows}" style="--height: auto" bind:this={textarea} bind:value on:resize={grow}></textarea>
                        <button class="btn btn-blue-light" disabled={!value} type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
    <div class="col col-lg-4 col-xl-3" style="padding:5px; height:50vh;">

        Hello world!

     </div>
</div>

<style lang="scss">
    @import '../../sass/Helpdesk.scss';
</style>


