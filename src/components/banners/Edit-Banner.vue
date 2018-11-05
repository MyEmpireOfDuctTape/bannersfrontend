<template>
    <div class="fullpage container-fluid">
        <div class="row">
                <sidebar></sidebar>
                <div class="col-lg-10 col-md-12">
		        <div class="edit-banner main-view container-fluid">
                    <div class="row">
                        <div class="col-lg-9 col-sm-12">
                            <span class="before">Edit Banner </span>
                            <svg class="subset" version="1.1" id="Layer_1" fill="#acb2bc" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve"> <path id="Shape" d="M369.1,518.3L194.2,343.5c-8.5-8.5-12.8-19.7-12.8-30.9s4.3-22.4,12.8-30.9c17.1-17.1,44.8-17.1,61.8,0 L400,425.6l143.9-143.9c17.1-17.1,44.8-17.1,61.8,0c17.1,17.1,17.1,44.7,0,61.8L430.9,518.3C413.8,535.4,386.2,535.4,369.1,518.3z" /> </svg>
                            <span class="after">{{ $route.params.bannerid }}</span>
                        </div>
                        <div class="col-lg-3 col-sm-12 right">
                            <button class="right roundedd blue duplicate">Copy Banner</button>
                        </div>
                    </div> 
                    <div class="row contentrow">
                        <div class="col-lg-9">
                            <div class="big-dd">
                                <span> Template </span>
                                <div class="dropdown">
                                    <ul>
                                        <li>Template 1</li>
                                        <li>Template 2</li>
                                        <li>Template 3</li>
                                        <li>Template 4</li>
                                        <li>Template 5</li>
                                        <li>Template 6</li>
                                    </ul>
                                </div>   
                            </div>    
                        </div>
                        <div class="col-lg-3">
                            <div class="big-dd">
                                <span> Size </span>
                                <div class="dropdown">
                                    <ul>
                                        <li>Size 1</li>
                                        <li>Size 2</li>
                                        <li>Size 3</li>
                                        <li>Size 4</li>
                                        <li>Size 5</li>
                                        <li>Size 6</li>
                                    </ul>
                                </div>   
                            </div>    
                        </div>
                    </div>  
                    <div class="row contentrow bigger-wrapper">
                        <div class="col-12">
                        <div class="row nomarg">
                        <div class="col-lg-6 col-md-12 nopad">
                            <div class="form-wrapper">
                                <div class="input-block">
                                    <span class="fake-label">Banner name</span>
                                    <input type="text" placeholder="Skyscraper tempate">
                                </div>
                                <div class="input-block">
                                    <span class="fake-label">Banner Description</span>
                                    <textarea class="comment"></textarea>
                                </div>
                            </div> 
                        </div>  
                        <div class="col-lg-6 col-md-12 nopad">
                            <div class="form-wrapper">
                                <div class="input-block">
                                    <input type="text" placeholder="Background image">
                                </div>
                                <div class="input-block">
                                    <input type="text" placeholder="Button text">
                                </div>
                                <div class="select-row">
                                    <div class="input-block half-width select">
                                                        <span>Button color</span>
                                                        <div class="options">
                                                            <ul>
                                                                <li>red</li>
                                                                <li>black</li>
                                                                <li>pink</li>
                                                                <li>#f1f1f1</li>
                                                            </ul>
                                                        </div>
                                    </div>
                                    <div class="input-block half-width select">
                                                        <span>Button animation</span>
                                                        <div class="options">
                                                            <ul>
                                                                <li>fadein</li>
                                                                <li>bounce</li>
                                                                <li>slidein</li>
                                                                <li>wobble</li>
                                                            </ul>
                                                        </div>
                                    </div>
                                </div>    
                            </div> 
                        </div> 
                        <div class="col-lg-6 col-md-12 nopad">
                            <div class="slider-wrapper">
                                <div class="slidecontainer">
                                    <input type="range" min="1" max="100" value="1" class="styles slider" id="myRange" draggable="false">
                                    <span>Manual styles mode</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12 nopad">
                            <div class="slider-wrapper">
                                <div class="slidecontainer">
                                    <input type="range" min="1" max="100" value="1" class="slider html" id="myRange" draggable="false">
                                    <span>Template HTML overwrite</span>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>

                    </div>  
                    <div class="container-fluid manual-styles" style="display: none">
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="before">Add manual styles </span>
                        </div>
                    </div> 
                    <div class="row contentrow bigger-wrapper customcss">
                        <div class="col-12">
                            <div class="row nomarg manual">
                                <div class="container-fluid" id="cssInputs" data-numberofrows="1">
                                    <div class="row 1">
                                        <div class="col-lg-4 col-md-12">
                                            <div class="input-block select">
                                                    <span>Element</span>
                                                    <div class="options">
                                                        <ul>
                                                            <li>div</li>
                                                            <li>span</li>
                                                            <li>#element</li>
                                                            <li>.class</li>
                                                        </ul>
                                                    </div>
                                            </div>
                                        </div>  
                                        <div class="col-lg-4 col-md-12">
                                            <div class="input-block select">
                                                    <span>Rule</span>
                                                    <div class="options">
                                                        <ul>
                                                            <li>top</li>
                                                            <li>margin</li>
                                                            <li>left</li>
                                                            <li>right</li>
                                                            <li>bottom</li>
                                                        </ul>
                                                    </div>
                                            </div>
                                        </div> 
                                        <div class="col-lg-4 col-md-12">
                                        <div class="input-block">
                                            <input type="text" placeholder="Value">
                                            </div>
                                            <svg class="trash" version="1.1" id="Layer_1" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg>
                                        </div> 
                                    </div><!-- row -->   
                                </div>  <!-- container-fluid -->   
                                <div class="col-12">
                                    <button class="create blue roundedd"> Add style</button>
                                </div>    
                                <div class="col-12">
                                    <div class="editor-wrapper">
                                <pre id="editor">
&lt;!DOCTYPE html&gt;
                                </pre>
                            </div>   
                                </div>    
                            </div>
                        </div>

                    </div>
                    </div> 
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="before">Banner preview</span>
                        </div>
                    </div> 
                    <div class="row contentrow bigger-wrapper">
                        <div class="col-12">
                            <div class="row nomarg html-preview">
                                
                                <iframe class="template-preview" src="https://steven.punkdigital.ee/whiskas/et/html/"></iframe>
                            </div>
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
  name: 'EditBanner',
  components: {
      Sidebar
  },
  data () {
    return {
      msg: 'Dashboard yo'
    }
  }
}
</script>

