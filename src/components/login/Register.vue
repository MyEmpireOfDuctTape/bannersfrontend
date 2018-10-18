<template>
  <div class="login">
		<div class="container">
			<div class="row">
			<div class="col-lg-8 offset-lg-2 col-md-12">

    <h1> {{ msg }} </h1>
    <div class="block">
        <!-- <div class="half-input-row">
            <div class="input-block half-width">
            <input type="text" placeholder="First Name">
            </div>
            <div class="input-block half-width">
            <input type="text" placeholder="Last Name">
            </div>
        </div>   -->  
        <div class="row">
            <div class="col-lg-6 col-sm-12">
                <div class="input-block half-width">
                    <input type="text" placeholder="First Name">
                </div>
            </div>
            <div class="col-lg-6 col-sm-12">
                <div class="input-block half-width">
                    <input type="text" placeholder="Last Name">
                </div>
            </div>    
        </div>  
        <div class="input-block">
          <input type="email" placeholder="Email">
        </div>
        <div class="input-block">
          <input type="password" placeholder="Password">
        </div>
        <div class="input-block">
          <input type="password" placeholder="Confirm Password">
        </div>
       <div class="checkbox-group normal">
                <span></span><label for="data_accept">I accept the <a href="" target="_blank">terms &amp; conditions</a></label>
                    <input type="checkbox" name="data_accept">
        </div>
        <button class="blue roundedd">Register</button>
    </div>
      <span> If you need help contact <a href="mailto:help@mail.com">help@mail.com</a> </span>
			</div>

			</div>
			</div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      msg: 'Register as user'
    }
  }
}
</script>

