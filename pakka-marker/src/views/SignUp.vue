<template>
    <div style="max-width: 1280px; width: 70rem;">
        <div class="sign-in-container">
            <form class="sign-in-form" @submit.prevent="SignUp">
            <h2>Sign Up</h2>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="formData.email" class="form-control" placeholder="email" required/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" v-model="formData.password" class="form-control" placeholder="password" required/>
            </div>
            <button type="submit" @click="SignUp">Sign Up</button>
            <p class="redirect-text">Already have account?<router-link to="/signin">Sign In</router-link></p>
            </form>
        </div>
    </div>
  </template>
  
  <script>
//   import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//   import md5 from "md5";
  export default{
      name: 'SignUp',
      data(){
          return{
              formData : {
              email: '',
              password : ''
          },
          errorMessage : '',
          xhrRequest: false
          }
      },
      methods: {
          SignIn(){
              this.errorMessage = ""
          }
      }
  }
  
  </script>
  
  <style scoped>
  
  body {
    /* display: grid; */
    justify-content: center;
    align-items: center;
  }
  
  .sign-in-container {
  
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* max-width: 400px; */
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
    align-content: flex-start;
    
  }
  
  .sign-in-form h2 {
  margin-bottom: 1rem;
  color: #333;
  }
  
  .form-group {
  margin-bottom: 1rem;
  }
  
  .form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  }
  
  .form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  }
  
  .form-group input:focus {
  border-color: #007bff;
  outline: none;
  }
  
  button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #29a2aa;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  }
  
  button:hover {
  background-color: #1a666b;
  }
  </style>