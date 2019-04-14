<template lang="pug">
    h1 Hello index
</template>

<script lang="ts">
    import hello from '../components/hello';
    
    export default {
        name: 'app',
        created() {
            hello.say();
        }
    };
</script>

<style lang="stylus" scoped>
    @import '../components/standard'
    
    h1
        color blue
</style>
