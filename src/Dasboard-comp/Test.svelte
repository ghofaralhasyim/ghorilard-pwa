<script>
    import io from 'socket.io-client';

    const socket = io("https://ghorilard.herokuapp.com/");
    socket.on('tests', data => {
        console.log("this :"+data);
    });
    socket.emit('text','hallo');
</script>