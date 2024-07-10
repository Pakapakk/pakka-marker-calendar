<template>
  <nav class="navbar">
    <div class="container-fluid">
      <router-link path = "/dashboard">
        <button class="btn" style="font-weight: 500;">Pakka-Marker</button>
      </router-link>
      <form class="d-flex">
        <button class="btn btn-danger" @click="signOut"><span><i class="fa fa-sign-out"></i></span></button>
      </form>
    </div>
  </nav>
  </template>

<script lang="js">
import { defineComponent } from 'vue';
import { getAuth, signOut } from "firebase/auth";
export default defineComponent({

    methods: {
        signOut(){
            const auth = getAuth()
            signOut(auth)
            .then(()=>{
                this.$router.replace("/signin")
            })
            .catch(error =>{
            alert(this.errorMessage)
            })
        }
    }

})

</script>


<style scoped>

.container-fluid > a:hover{
  color : green;
}

.navbar {
    height: 60px;
    width: 95vw;
    margin: 0 auto;
    margin-top: 35px;
    padding-left: 1em;
    padding-right: 1em;
    box-sizing: border-box;
    display: block;
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.15),
        0px 10px 10px rgba(0, 0, 0, 0.1);
    border-radius: 9px;
    position: relative;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
}
</style>