<template>
    <div class="fullpage container-fluid">
        <div class="row">
            <div class="col-lg-2">
                <sidebar></sidebar>
            </div>
            <div class="col-lg-10">
		        <div class="add-template main-view container-fluid">
                    <div class="header">
                                <h1>Add template</h1>
                    </div>
                    <div class="row template-form">
                        <div class="col-lg-6 col-md-12 ">
                            <div class="form-wrapper">
                                <div class="input-block">
                                    <span class="fake-label">Template name</span>
                                    <input type="text" placeholder="Skyscraper tempate">
                                </div>
                                <div class="input-block">
                                    <span class="fake-label">Description</span>
                                    <textarea></textarea>
                                </div>
                            </div>    
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <pre id="editor">
                                -- html code here --
                            </pre>
                        </div>
                    </div>  
                </div>
			</div>
		</div>
	</div>

</template>

<script>

import Sidebar from '../sidebar/Sidebar'
export default {
  name: 'AddTemplate',
  components: {
      Sidebar
  },
  data () {
    return {
      msg: 'Dashboard yo'
    }
  },
}

</script>

