<template>
    <h1>logout</h1>
</template>
<script>
export default {
    name: 'Logout',
    created(){
        console.log(this.$router)
        console.log(this.$store.getters.getToken)
        this.$store.dispatch('destroyToken', {
              bearer: this.$store.getters.getToken.accessToken,
        })
        .then(response => {
            this.$router.push({ path: `/login` })
            
        })
        .catch(error => {
             this.$router.push({ path: `/login` })
        })
        
    }
}
</script>
