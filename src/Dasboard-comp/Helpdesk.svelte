<script>
    import io from 'socket.io-client';
    import { Session } from 'svelte-session-manager';
    import { comment } from './data';
    import { onMount } from 'svelte';

    let session = new Session(localStorage);

    let message;
    let admin = null;

    const socket = io("https://ghorilard.herokuapp.com");

    let xh;
     onMount(() => {
        let chatSection = document.getElementById('chatSection');
        let x = chatSection.scrollHeight;
        chatSection.scrollTop = xh;

        socket.on('connect', () => {
            socket.on("admin_id", data=>{
                console.log("SOCKET ID ADMIN :" +data);
                admin = data;   
            });
            console.log('SOCKET ID IS : '+socket.id);
        });
        console.log(admin);
    });
    console.log(socket.id)
    socket.on("helpdesk_rep", (id,msg,id_user)=> {
        console.log("SOCKET HELPDESK ADMIN : " + msg );
        $comment = [...$comment,{"auth":1,"text":msg}];
    });

    let value='',
        name = 'textarea',
        textarea = null,
        height = 100;

    function grow(e) {
		textarea = e.target
		height = e.target.CR.height
	}
	
	$: rows = (value.match(/\n/g) || []).length + 1 || 1;

    const parseJSON = (resp) => (resp.json ? resp.json() : resp);
    const checkStatus = (resp) => {
        if(resp.status >= 200 && resp.status < 300){
            value = '';
            return resp;
        }
        return parseJSON(resp).then((resp) => {
            throw resp;
        });
    }
    async function getChat(){
        if(session.isValid){
            try {
                const res = await fetch('https://ghorilard.herokuapp.com/comment',{
                    method: 'GET',
                    headers: {
                        'Content-type' : 'application/json',
                        'token' : session.access_token,
                        '_id': session._id
                    }
                }).then(checkStatus)
                .then(parseJSON)
                .then(data =>{
                    $comment = data;
                })
            } catch (error) {
                message = error;
            }
        }
    }

    async function cekAdmin(){
        await socket.on("admin", data =>{
            admin = data;
            console.log("VARIFY SOCKET: " + data);
        });
    }

    async function sendChat(){
        if(session.isValid) {
            await cekAdmin();
            console.log('SEND SOCKET :' + admin);
            socket.emit("helpdesk",admin,value,socket.id);
            $comment = [...$comment,{"auth":2,"text":value}];
            console.log("socket sended");
            value = '';
        }
    }
    console.log($comment);
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
                        Help Desk 
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col" style="padding:5px;">
                <div class="card">
                    <div class="chat-section" id="chatSection" bind:clientHeight={xh} scrollTop="{xh}">
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
                        <!-- {#if $comment.length != null} -->
                            {#each $comment as text}
                                {#if text.auth == 1}
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
                        <!-- {/if} -->
                    </div>
                    <form on:submit|preventDefault={sendChat} class="form-chat mt-1">
                        <textarea rows="{rows}" style="--height: auto" bind:this={textarea} bind:value on:resize={grow}></textarea>
                        <button class="btn btn-blue-light" disabled={!value} type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
    <div class="col col-lg-4 col-xl-3" style="padding:5px;">

        Hello world!

     </div>
</div>

<style lang="scss">
    @import '../sass/Helpdesk.scss';
</style>


