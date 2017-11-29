<template>
  <div>

    <div id="div" style="width:100%; height:100%;" v-loading="loading">
    </div>

  </div>
</template>

<script>
global.THREE  = require('three');
var ThreePlay = require('threeplay');

export default {
  data () {
    return {
      loading: true,
    }
  },
  mounted() {
    var _this = this;
    var draw = new ThreePlay.Draw({
      'dom'    : document.getElementById("div"),
      'type'   : 'glTF2',
      'file'   : 'http://dev.imoxiu.cn/~renzhenguo/explore/WebGL/demo/model/HTC.gltf',
      'onLoad' : function() {
        _this.loading = false;
      },
      'onError': function(err) {
        _this.loading = false;
        _this.$notify.error({title: '失败', message: err.message});
      },
    });
  },
  methods: {
  },
  components: {
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
