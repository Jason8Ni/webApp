<template lang = "pug">
 html
    body
        link(href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,700" rel="stylesheet" type="text/css")
        .container
            .frame
                .nav
                    ul
                        li.signin-active
                            a.btn(@click.native="toggle()") Sign in
                        li.signup-inactive
                            a.btn(@click.native="toggle()") Sign up 
                div(ng-app="" ng-init="checked = false")
                    form.form-signin(action="" method="post" name="form")
                        label(for="username") Username
                        input.form-styling(type="text" name="username" placeholder="" )
                        label(for="password") Password
                        input.form-styling(type="text" name="password" placeholder="")
                        input#checkbox(type="checkbox")
                        label(for="checkbox")
                            span.ui
                            | Keep me signed in
                        .btn-animate
                            a.btn-signin(@click.native="submitAuthentication()") Sign in
                    form.form-signup(action="" method="post" name="form")
                        label(for="fullname") Full name
                        input.form-styling(type="text" name="name" placeholder="")
                        label(for="fullname") Username
                        input.form-styling(type="text" name="username" placeholder="")
                        label(for="email") Email
                        input.form-styling(type="text" name="email" placeholder="")
                        label(for="password") Password
                        input.form-styling(type="text" name="password" placeholder="")
                        label(for="confirmpassword") Confirm password
                        input.form-styling(type="text" name="confirmpassword" placeholder="")
                        a.btn-signup(@click.native="submitSignup()"
                                    ng-click="checked = !checked") Sign Up
                    .success
                        svg#check(width="270" height="270" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="0 0 60 60" ng-class="checked ? 'checked' : ''")
                            path(fill="#ffffff" d="M40.61,23.03L26.67,36.97L13.495,23.788c-1.146-1.147-1.359-2.936-0.504-4.314\
                            c3.894-6.28,11.169-10.243,19.283-9.348c9.258,1.021,16.694,8.542,17.622,17.81c1.232,12.295-8.683,22.607-20.849,22.042\
                            c-9.9-0.46-18.128-8.344-18.972-18.218c-0.292-3.416,0.276-6.673,1.51-9.578")
                            .successtext
                                p  Thanks for signing up! Check your email for confirmation.
                .forgot
                    a(href="#") Forgot your password?
                div
                    .cover-photo
                    .profile-photo
                    h1.welcome Welcome, Chris
                    a.btn-goback(value="Refresh" onclick="history.go()") Go back
            a#refresh(value="Refresh" onclick="history.go()")
                svg#Capa_1.refreshicon(version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewbox="0 0 322.447 322.447" style="enable-background:new 0 0 322.447 322.447;" xml:space="preserve")
                    path(d="M321.832,230.327c-2.133-6.565-9.184-10.154-15.75-8.025l-16.254,5.281C299.785,206.991,305,184.347,305,161.224\
                    c0-84.089-68.41-152.5-152.5-152.5C68.411,8.724,0,77.135,0,161.224s68.411,152.5,152.5,152.5c6.903,0,12.5-5.597,12.5-12.5\
                    c0-6.902-5.597-12.5-12.5-12.5c-70.304,0-127.5-57.195-127.5-127.5c0-70.304,57.196-127.5,127.5-127.5\
                    c70.305,0,127.5,57.196,127.5,127.5c0,19.372-4.371,38.337-12.723,55.568l-5.553-17.096c-2.133-6.564-9.186-10.156-15.75-8.025\
                    c-6.566,2.134-10.16,9.186-8.027,15.751l14.74,45.368c1.715,5.283,6.615,8.642,11.885,8.642c1.279,0,2.582-0.198,3.865-0.614\
                    l45.369-14.738C320.371,243.946,323.965,236.895,321.832,230.327z")


      v-snackbar(
        timeout ="6000"
        bottom="bottom"
        color = "red lighten-1"
        v-model = "snackbar"
      ) {{ message}}   
</template>
<script>
//^^^^^ Replace with vue elements? to be able to select them... Look at eve-app
//example to see how it was done there in the pug/jade templates...
/// USING JQUERY IN VUE... I set it up wrong, can't use a cdn:
//https://stackoverflow.com/questions/37928998/how-to-use-a-jquery-plugin-inside-vue
//https://vuejsdevelopers.com/2017/05/20/vue-js-safely-jquery-plugin/
//shouldn't have to ... they really aren't supposed to be used together.
//Instead: 
//https://laracasts.com/discuss/channels/vue/help-convert-jquery-to-vuejs-syntax
//https://stackoverflow.com/questions/42170449/how-to-convert-jquery-ajax-function-to-vue-js
//https://laravel-news.com/jquery-vue
import Authentication from "@components/pages/Authentication";
import Signup from "@components/pages/Signup";
src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js";
src = "//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular.min.js";
export default {
  data() {
    return {
      snackbar: false,
      rules: [value => !!value || "This field is required!"],
      auth: {
        username: "",
        password: ""
      },
      newUser: {
        name:"",
        username: "",
        email: "",
        password: "",
        passwordConf: ""
      },
      message: ""
    };
  },
  methods: {
    //from this: https://codepen.io/anon/pen/NYBYrO 
    //have to incorporate profile picture..
    //also option to keep me signed in
    //need signup email... not sure if i have that already
    submitAuthentication() {
      Authentication.authenticate(this, this.auth, `/`);
      $(".btn-animate").toggleClass("btn-animate-grow");
      $(".welcome").toggleClass("welcome-left");
      $(".cover-photo").toggleClass("cover-photo-down");
      $(".frame").toggleClass("frame-short");
      $(".profile-photo").toggleClass("profile-photo-down");
      $(".btn-goback").toggleClass("btn-goback-up");
      $(".forgot").toggleClass("forgot-fade");
    }
  },
  submitSignup() {
    Signup.signup(this, this.newUser, "/");
    $(".nav").toggleClass("nav-up");
    $(".form-signup-left").toggleClass("form-signup-down");
    $(".success").toggleClass("success-left");
    $(".frame").toggleClass("frame-short");
  },
  toggle() {
    $(".form-signin").toggleClass("form-signin-left");
    $(".form-signup").toggleClass("form-signup-left");
    $(".frame").toggleClass("frame-long");
    $(".signup-inactive").toggleClass("signup-active");
    $(".signin-active").toggleClass("signin-inactive");
    $(".forgot").toggleClass("forgot-left");
    $(this)
      .removeClass("idle")
      .addClass("active");
  }
};
</script>

<style>
html,
body * {
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

body {
  background: linear-gradient(
      rgba(246, 247, 249, 0.8),
      rgba(246, 247, 249, 0.8)
    ),
    url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/sky-clouds-cloudy-mountain.jpg)
      no-repeat center center fixed;
  background-size: cover;
}

.container {
  width: 100%;
  padding-top: 60px;
  padding-bottom: 100px;
}

.frame {
  height: 575px;
  width: 430px;
  background: linear-gradient(rgba(35, 43, 85, 0.75), rgba(35, 43, 85, 0.95)),
    url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/clouds-cloudy-forest-mountain.jpg)
      no-repeat center center;
  background-size: cover;
  margin-left: auto;
  margin-right: auto;
  border-top: solid 1px rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: all 0.5s ease;
}

.frame-long {
  height: 615px;
}

.frame-short {
  height: 400px;
  margin-top: 50px;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.1);
}

.nav {
  width: 100%;
  height: 100px;
  padding-top: 40px;
  opacity: 1;
  transition: all 0.5s ease;
}

.nav-up {
  transform: translateY(-100px);
  opacity: 0;
}

li {
  padding-left: 10px;
  font-size: 18px;
  display: inline;
  text-align: left;
  text-transform: uppercase;
  padding-right: 10px;
  color: #ffffff;
}

.signin-active a {
  padding-bottom: 10px;
  color: #ffffff;
  text-decoration: none;
  border-bottom: solid 2px #1059ff;
  transition: all 0.25s ease;
  cursor: pointer;
}

.signin-inactive a {
  padding-bottom: 0;
  color: rgba(255, 255, 255, 0.3);
  text-decoration: none;
  border-bottom: none;
  cursor: pointer;
}

.signup-active a {
  cursor: pointer;
  color: #ffffff;
  text-decoration: none;
  border-bottom: solid 2px #1059ff;
  padding-bottom: 10px;
}

.signup-inactive a {
  cursor: pointer;
  color: rgba(255, 255, 255, 0.3);
  text-decoration: none;
  transition: all 0.25s ease;
}

.form-signin {
  width: 430px;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  padding-top: 55px;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.form-signin-left {
  transform: translateX(-400px);
  opacity: 0;
}

.form-signup {
  width: 430px;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  padding-top: 55px;
  position: relative;
  top: -375px;
  left: 400px;
  opacity: 0;
  transition: all 0.5s ease;
}

.form-signup-left {
  transform: translateX(-399px);
  opacity: 1;
}

.form-signup-down {
  top: 0px;
  opacity: 0;
}

.success {
  width: 80%;
  height: 150px;
  text-align: center;
  position: relative;
  top: -890px;
  left: 450px;
  opacity: 0;
  transition: all 0.8s 0.4s ease;
}

.success-left {
  transform: translateX(-406px);
  opacity: 1;
}

.successtext {
  color: #ffffff;
  font-size: 16px;
  font-weight: 300;
  margin-top: -35px;
  padding-left: 37px;
  padding-right: 37px;
}

#check path {
  stroke: #ffffff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 0.85px;
  stroke-dasharray: 60px 300px;
  stroke-dashoffset: -166px;
  fill: rgba(255, 255, 255, 0);
  transition: stroke-dashoffset 2s ease 0.5s, fill 1.5s ease 1s;
}

#check.checked path {
  stroke-dashoffset: 33px;
  fill: rgba(255, 255, 255, 0.03);
}

.form-signin input,
.form-signup input {
  color: #ffffff;
  font-size: 13px;
}

.form-styling {
  width: 100%;
  height: 35px;
  padding-left: 15px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
}

label {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 13px;
  padding-left: 15px;
  padding-bottom: 10px;
  color: rgba(255, 255, 255, 0.7);
  display: block;
}

:focus {
  outline: none;
}

.form-signin input:focus,
textarea:focus,
.form-signup input:focus,
textarea:focus {
  background: rgba(255, 255, 255, 0.3);
  border: none;
  padding-right: 40px;
  transition: background 0.5s ease;
}

[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  display: none;
}

[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
  position: relative;
  padding-left: 85px;
  padding-top: 2px;
  cursor: pointer;
  margin-top: 8px;
}

[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before,
[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  content: "";
  position: absolute;
}

[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before {
  width: 65px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  left: 0;
  top: -3px;
  transition: all 0.2s ease;
}

[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  top: 7px;
  left: 10px;
  transition: all 0.2s ease;
}

/* on checked */
[type="checkbox"]:checked + label:before {
  background: #0f4fe6;
}

[type="checkbox"]:checked + label:after {
  background: #ffffff;
  top: 7px;
  left: 45px;
}

[type="checkbox"]:checked + label .ui,
[type="checkbox"]:not(:checked) + label .ui:before,
[type="checkbox"]:checked + label .ui:after {
  position: absolute;
  left: 6px;
  width: 65px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
  transition: all 0.2s ease;
}

[type="checkbox"]:not(:checked) + label .ui:before {
  content: "no";
  left: 32px;
  color: rgba(255, 255, 255, 0.7);
}

[type="checkbox"]:checked + label .ui:after {
  content: "yes";
  color: #ffffff;
}

[type="checkbox"]:focus + label:before {
  box-sizing: border-box;
  margin-top: -1px;
}

.btn-signup {
  float: left;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: #ffffff;
  padding-top: 8px;
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 20px;
  margin-top: 23px;
  background-color: #1059ff;
}

.btn-signin {
  float: left;
  padding-top: 8px;
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 20px;
  margin-top: -8px;
}

.btn-animate {
  float: left;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  padding-top: 8px;
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 20px;
  margin-top: 23px;
  background-color: rgba(16, 89, 255, 1);
  left: 0px;
  top: 0px;
  transition: all 0.5s ease, top 0.5s ease 0.5s, height 0.5s ease 0.5s,
    background-color 0.5s ease 0.75s;
}

.btn-animate-grow {
  width: 130%;
  height: 625px;
  position: relative;
  left: -55px;
  top: -420px;
  color: rgba(255, 255, 255, 0);
  background-color: rgba(255, 255, 255, 1);
}

a.btn-signup:hover,
a.btn-signin:hover {
  cursor: pointer;
  background-color: #0f4fe6;
  transition: background-color 0.5s;
}

.forgot {
  height: 100px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding-top: 24px;
  margin-top: -535px;
  border-top: solid 1px rgba(255, 255, 255, 0.3);
  transition: all 0.5s ease;
}

.forgot-left {
  transform: translateX(-400px);
  opacity: 0;
}

.forgot-fade {
  opacity: 0;
}

.forgot a {
  color: rgba(255, 255, 255, 0.3);
  font-weight: 400;
  font-size: 13px;
  text-decoration: none;
}

.welcome {
  width: 100%;
  height: 50px;
  position: relative;
  color: rgba(35, 43, 85, 0.75);
  opacity: 0;
  transition: transform 1.5s ease 0.25s, opacity 0.1s ease 1s;
}

.welcome-left {
  transform: translateY(-780px);
  opacity: 1;
}

.cover-photo {
  height: 150px;
  position: relative;
  left: 0px;
  top: -900px;
  background: linear-gradient(rgba(35, 43, 85, 0.75), rgba(35, 43, 85, 0.95)),
    url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/landscape-nature-man-person.jpeg);
  background-size: cover;
  opacity: 0;
  transition: all 1.5s ease 0.55s;
}

.cover-photo-down {
  top: -575px;
  opacity: 1;
}

.profile-photo {
  height: 125px;
  width: 125px;
  position: relative;
  border-radius: 70px;
  left: 155px;
  top: -1000px;
  background: url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/nature-water-rocks-hiking.jpg);
  background-size: 100% 135%;
  background-position: 100% 100%;
  opacity: 0;
  transition: top 1.5s ease 0.35s, opacity 0.75s ease 0.5s;
  border: solid 3px #ffffff;
}

.profile-photo-down {
  top: -636px;
  opacity: 1;
}

h1 {
  color: #ffffff;
  font-size: 35px;
  font-weight: 300;
  text-align: center;
}

.btn-goback {
  position: relative;
  margin-right: auto;
  top: -400px;
  float: left;
  padding: 8px;
  width: 83%;
  margin-left: 37px;
  margin-right: 37px;
  height: 35px;
  border-radius: 20px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: #1059ff;
  margin-top: -8px;
  border: solid 1px #1059ff;
  opacity: 0;
  transition: top 1.5s ease 0.35s, opacity 0.75s ease 0.5s;
}

.btn-goback-up {
  top: -1080px;
  opacity: 1;
}

a.btn-goback:hover {
  cursor: pointer;
  background-color: #0f4fe6;
  transition: all 0.5s;
  color: #ffffff;
}

/* refresh button styling */

#refresh {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ffffff;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.1);
  padding: 13px 0 0 13px;
}

.refreshicon {
  fill: #d3d3d3;
  transform: rotate(0deg);
  transition: fill 0.25s ease, transform 0.25s ease;
}

.refreshicon:hover {
  cursor: pointer;
  fill: #1059ff;
  transform: rotate(180deg);
}
</style>