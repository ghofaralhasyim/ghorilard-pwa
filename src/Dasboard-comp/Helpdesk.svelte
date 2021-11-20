<script>
    import io from 'socket.io-client';

    const socket = io("https://ghorilard.herokuapp.com/");
    socket.on('tests', data => {
        console.log("this :"+data);
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

    const sendChat = () => {
        socket.emit('text',value);
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
                        Help Desk 
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col" style="padding:5px;">
                <div class="card">
                    <div class="chat-section">
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
                                {value}
                            </div>
                        </div>
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


