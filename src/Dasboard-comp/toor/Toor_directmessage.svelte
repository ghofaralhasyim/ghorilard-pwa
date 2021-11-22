<script>
    import { onMount } from 'svelte';
    import { Session } from 'svelte-session-manager';
    import { comment } from '../data';
    import { id_socket } from '../toor/Toor_data'; 
    import io from 'socket.io-client';
    let session = new Session(localStorage);

    let client_id;
    let value='',
        name = 'textarea',
        textarea = null,
        height = 100;

    function grow(e) {
		textarea = e.target
		height = e.target.CR.height
	}
	
	$: rows = (value.match(/\n/g) || []).length + 1 || 1;

    const socket = io("https://ghorilard.herokuapp.com");

    onMount(() => {
        let chatSection = document.getElementById('chatSection');
        let x = chatSection.scrollHeight;
        chatSection.scrollTop = x;
        
        console.log(socket.id)
        socket.on("connect", () => {
            socket.emit('login', socket.id);
            socket.on('admin_id', data=>{
                console.log("SOCKET : "+data);
            });
        });
    });

    socket.on("helpdesk_rep", (id,msg,id_user)=> {
        client_id = id_user;
        console.log("SOCKET ID user :" + id_user);
        console.log("SOCKET HELPDESK : " + msg );
        $comment = [...$comment,{"auth":2,"text":msg}];
    });

    async function sendChat(){
        if(session.isValid) {
            console.log('SEND SOCKET :' + client_id);
            socket.emit("helpdesk",client_id,value,client_id);
            $comment = [...$comment,{"auth":1,"text":value}];
            console.log("socket sended");
            value = '';
        }
    }
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
                                <br>
                                {$id_socket}
                            </div>
                        </div>
                        {#each $comment as text}
                            {#if text.auth == 2}
                                <div class="chat-section-chat-reply">
                                    <div class="buble">
                                        {text.text}
                                    </div>
                                </div>
                            {:else}
                                <div class="chat-section-chat-send">
                                    <div class="buble-send">
                                        {text.text}
                                    </div>
                                </div>
                            {/if}
                        {/each}
                        <div id="xchat"></div>
                    </div>
                    <form on:submit|preventDefault={sendChat} class="form-chat mt-1">
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


