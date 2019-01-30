<template>
  <div class="login">
		<div class="container">
			<div class="row">
			<div class="col-lg-8 offset-lg-2 col-md-12">

    <h1> {{ msg }} </h1>
    <div class="block">
        <div class="input-block">
          <input type="password" placeholder="Password">
        </div>
        <div class="input-block">
          <input type="password" placeholder="Confirm new password">
        </div>
       
        <button class="blue roundedd">Submit</button>
    </div>
      <span> If you need help contact <a href="mailto:help@mail.com">help@mail.com</a> </span>
			</div>

			</div>
			</div>
  </div>
</template>

<script>
export default {
  name: 'NewPassword',
  data () {
    return {
      msg: 'Set a new password '
    }
  }
}
</script>