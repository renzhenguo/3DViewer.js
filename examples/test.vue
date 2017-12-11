<template>
  <div>

    <div id="divdom" style="width:100%; height:100%;" v-loading="loading">
    </div>

  </div>
</template>

<script>
import * as Viewer from '3DViewer.js'

export default {
  data () {
    return {
      loading: true,
    }
  },
  mounted() {
    var draw = new Viewer.Draw('divdom');
    draw.load({
      'type' : 'glTF2',
      'file' : 'http://dev.imoxiu.cn/~renzhenguo/explore/WebGL/demo/model/HTC.gltf',
    }).then(r => {
      this.loading = false;
    }).catch(err => {
      this.loading = false;
      this.$notify.error({title: '失败', message: err.message});
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
